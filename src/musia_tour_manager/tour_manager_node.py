#!/usr/bin/env python3
"""
MUSIA Tour Manager Node
Machine à états 7 états — orchestrateur central du robot guide Famienkro

Topics souscrits :
  /person_detected      (musia_msgs/PersonDetection) — bridge Arduino
  /ultrasonic_distance  (std_msgs/Float32)           — HC-SR04 legacy (cm)
  /vps_response         (std_msgs/String)            — réponse du VPS
  /nav2/feedback        (std_msgs/String)            — résultat navigation Nav2

Topics publiés :
  /tour_state           (std_msgs/String)            — état courant (debug/UI)
  /tts_request          (std_msgs/String)            — texte à lire (audio_node)
  /led_command          (std_msgs/String)            — commande matrice LED
  /goal_pose            (geometry_msgs/PoseStamped)  — waypoint Nav2

Services :
  /set_tour_mode        (musia_msgs/SetTourMode)
  /get_current_zone     (musia_msgs/GetCurrentZone)
"""

import threading
import time

import rclpy
from rclpy.node import Node
from rclpy.callback_groups import ReentrantCallbackGroup
from rclpy.executors import MultiThreadedExecutor

from std_msgs.msg import Float32, String
from geometry_msgs.msg import PoseStamped

from musia_msgs.msg import PersonDetection
from musia_msgs.srv import SetTourMode, GetCurrentZone

from .states import TourState, is_valid_transition, state_label


# ---------------------------------------------------------------------------
# Constantes
# ---------------------------------------------------------------------------
PERSON_DISTANCE_THRESHOLD_M = 1.5   # Distance max pour confirmer présence (mètres)
PERSON_CONFIDENCE_THRESHOLD = 0.5   # Confiance min pour valider la détection
VPS_TIMEOUT_S               = 2.0   # Délai avant basculement DÉGRADÉ
TOUR_TICK_HZ                = 10.0  # Fréquence boucle principale

TOUR_WAYPOINTS = [
    "WP0",   # Entrée — veille
    "WP1",   # Salle Baoulé — entrée
    "WP2",   # Salle Baoulé — Masque Goli
    "WP3",   # Salle Baoulé — Pagne Kita
    "WP4",   # Couloir
    "WP5",   # Salle Dan — entrée
    "WP6",   # Salle Dan — Masque Gunye Ge
    "WP7",   # Salle Sénoufo — entrée
    "WP8",   # Salle Sénoufo — Masque Kpelié
]

ZONE_MAP = {
    0: "entrée",
    1: "salle_baoule", 2: "salle_baoule", 3: "salle_baoule",
    4: "couloir",
    5: "salle_dan",    6: "salle_dan",
    7: "salle_senoufou", 8: "salle_senoufou",
}


class TourManagerNode(Node):
    """
    Nœud ROS 2 — Tour Manager de MUSIA.
    Orchestre les transitions entre les 7 états et coordonne
    tous les sous-systèmes via topics et services.
    """

    def __init__(self):
        super().__init__('tour_manager_node')

        # --- Paramètres déclarés (surchargeables depuis musia_params.yaml) ---
        self.declare_parameter('person_distance_threshold_m', PERSON_DISTANCE_THRESHOLD_M)
        self.declare_parameter('person_confidence_threshold', PERSON_CONFIDENCE_THRESHOLD)
        self.declare_parameter('vps_timeout_s',               VPS_TIMEOUT_S)
        self.declare_parameter('demo_mode',                   True)
        self.declare_parameter('current_waypoint_index',      0)

        self._person_dist_threshold = self.get_parameter(
            'person_distance_threshold_m').get_parameter_value().double_value
        self._person_conf_threshold = self.get_parameter(
            'person_confidence_threshold').get_parameter_value().double_value
        self._vps_timeout = self.get_parameter(
            'vps_timeout_s').get_parameter_value().double_value
        self._demo_mode = self.get_parameter(
            'demo_mode').get_parameter_value().bool_value

        # --- État courant ---
        self._state: TourState = TourState.VEILLE
        self._prev_state: TourState = TourState.VEILLE
        self._state_lock = threading.Lock()

        # --- Données capteurs ---
        # Données complètes du dernier message PersonDetection
        self._person_detected: bool  = False
        self._person_distance_m: float = 9999.0
        self._person_confidence: float = 0.0

        self._last_vps_response: str   = ""
        self._vps_request_time: float | None = None

        # --- Progression de la visite ---
        self._current_wp_index: int  = 0
        self._nav2_goal_reached: bool = False
        self._nav2_in_progress: bool  = False
        self._accueil_done: bool      = False

        # --- Callback group ---
        cb = ReentrantCallbackGroup()

        # --- Subscribers ---
        # ✅ Nouveau type : musia_msgs/PersonDetection
        self.create_subscription(
            PersonDetection, '/person_detected',
            self._cb_person_detected, 10, callback_group=cb)

        # Legacy : conservé pour compatibilité (valeurs en cm, non utilisées
        # pour les décisions — la distance vient de PersonDetection.distance_m)
        self.create_subscription(
            Float32, '/ultrasonic_distance',
            self._cb_ultrasonic_legacy, 10, callback_group=cb)

        self.create_subscription(
            String, '/vps_response',
            self._cb_vps_response, 10, callback_group=cb)

        self.create_subscription(
            String, '/nav2/feedback',
            self._cb_nav2_feedback, 10, callback_group=cb)

        # --- Publishers ---
        self._pub_state = self.create_publisher(String,      '/tour_state', 10)
        self._pub_tts   = self.create_publisher(String,      '/tts_request', 10)
        self._pub_led   = self.create_publisher(String,      '/led_command', 10)
        self._pub_goal  = self.create_publisher(PoseStamped, '/goal_pose',   10)

        # --- Services ---
        self.create_service(
            SetTourMode,    '/set_tour_mode',     self._srv_set_tour_mode,    callback_group=cb)
        self.create_service(
            GetCurrentZone, '/get_current_zone',  self._srv_get_current_zone, callback_group=cb)

        # --- Boucle principale ---
        self._tick_timer = self.create_timer(
            1.0 / TOUR_TICK_HZ, self._tick, callback_group=cb)

        self.get_logger().info(
            f"[TourManager] Démarré — état initial : {state_label(self._state)} | "
            f"seuil distance={self._person_dist_threshold}m "
            f"confiance={self._person_conf_threshold}"
        )
        self._announce_state_entry(TourState.VEILLE)

    # ==========================================================================
    # BOUCLE PRINCIPALE
    # ==========================================================================

    def _tick(self):
        """Boucle exécutée à TOUR_TICK_HZ Hz — évalue les transitions."""
        with self._state_lock:
            current = self._state

        msg = String()
        msg.data = state_label(current)
        self._pub_state.publish(msg)

        if current == TourState.VEILLE:
            self._tick_veille()
        elif current == TourState.ACCUEIL:
            self._tick_accueil()
        elif current == TourState.TRAITEMENT:
            self._tick_traitement()
        elif current == TourState.GUIDAGE:
            self._tick_guidage()
        elif current == TourState.PRESENTATION:
            self._tick_presentation()
        elif current == TourState.DEGRADE:
            self._tick_degrade()
        elif current == TourState.RETOUR:
            self._tick_retour()

    # ==========================================================================
    # LOGIQUE PAR ÉTAT
    # ==========================================================================

    def _tick_veille(self):
        """
        VEILLE → ACCUEIL : double condition
          1. PersonDetection.person_detected == True
          2. PersonDetection.distance_m < seuil
          3. PersonDetection.confidence > seuil
        """
        person_confirmed = (
            self._person_detected
            and self._person_distance_m < self._person_dist_threshold
            and self._person_confidence >= self._person_conf_threshold
        )
        if person_confirmed:
            self.get_logger().info(
                f"[TourManager] Visiteur confirmé — "
                f"dist={self._person_distance_m:.2f}m "
                f"conf={self._person_confidence:.2f} → ACCUEIL"
            )
            self._transition_to(TourState.ACCUEIL)

    def _tick_accueil(self):
        """ACCUEIL → GUIDAGE dès que le TTS d'accueil est terminé."""
        if self._accueil_done:
            self._accueil_done = False
            self._current_wp_index = 1
            self._transition_to(TourState.GUIDAGE)

    def _tick_traitement(self):
        """TRAITEMENT : attente réponse VPS, timeout → DÉGRADÉ."""
        if self._last_vps_response:
            self._publish_tts(self._last_vps_response)
            self._last_vps_response = ""
            self._vps_request_time = None
            target = (TourState.PRESENTATION
                      if self._current_wp_index > 0
                      else TourState.GUIDAGE)
            self._transition_to(target)
            return

        if self._vps_request_time is not None:
            elapsed = time.monotonic() - self._vps_request_time
            if elapsed > self._vps_timeout:
                self.get_logger().warn(
                    f"[TourManager] VPS timeout ({elapsed:.1f}s) → DÉGRADÉ")
                self._transition_to(TourState.DEGRADE)

    def _tick_guidage(self):
        """GUIDAGE : navigation en cours vers le prochain waypoint."""
        if self._nav2_goal_reached:
            self._nav2_goal_reached = False
            self._nav2_in_progress  = False
            self.get_logger().info(
                f"[TourManager] Arrivé WP{self._current_wp_index} → PRÉSENTATION")
            self._transition_to(TourState.PRESENTATION)
        elif not self._nav2_in_progress:
            self._send_nav2_goal(self._current_wp_index)

    def _tick_presentation(self):
        """PRÉSENTATION : boucle Q&R — géré via les callbacks VPS."""
        pass

    def _tick_degrade(self):
        """DÉGRADÉ : surveiller le retour réseau (signalé par /vps_response)."""
        pass

    def _tick_retour(self):
        """RETOUR : navigation vers WP0."""
        if self._nav2_goal_reached and self._current_wp_index == 0:
            self._nav2_goal_reached = False
            self.get_logger().info("[TourManager] WP0 atteint — retour VEILLE")
            self._transition_to(TourState.VEILLE)
        elif not self._nav2_in_progress:
            self._current_wp_index = 0
            self._send_nav2_goal(0)

    # ==========================================================================
    # TRANSITIONS
    # ==========================================================================

    def _transition_to(self, new_state: TourState):
        with self._state_lock:
            current = self._state

        if not is_valid_transition(current, new_state):
            self.get_logger().error(
                f"[TourManager] Transition invalide : "
                f"{state_label(current)} → {state_label(new_state)} — IGNORÉE")
            return

        self.get_logger().info(
            f"[TourManager] ✅ {state_label(current)} → {state_label(new_state)}")

        with self._state_lock:
            self._prev_state = current
            self._state      = new_state

        self._announce_state_entry(new_state)

    def _announce_state_entry(self, state: TourState):
        if state == TourState.VEILLE:
            self._publish_led("idle_pulse")
            self._person_detected   = False
            self._person_distance_m = 9999.0
            self._person_confidence = 0.0
            self._current_wp_index  = 0
            self._nav2_in_progress  = False

        elif state == TourState.ACCUEIL:
            self._publish_led("eyes_open")
            self._publish_tts(
                "Bonjour et bienvenue au Musée Famienkro. "
                "Je suis MUSIA, votre guide. "
                "Je vais vous présenter les chefs-d'œuvre de l'art ivoirien. "
                "Êtes-vous prêt à commencer la visite ?"
            )
            threading.Timer(6.0, self._set_accueil_done).start()

        elif state == TourState.TRAITEMENT:
            self._publish_led("thinking_spin")
            self._publish_tts("...")
            self._vps_request_time = time.monotonic()

        elif state == TourState.GUIDAGE:
            self._publish_led("moving_wave")
            zone = ZONE_MAP.get(self._current_wp_index, "zone inconnue")
            self._publish_tts(f"Suivez-moi, nous nous dirigeons vers {zone}.")

        elif state == TourState.PRESENTATION:
            self._publish_led("listening_glow")
            self._publish_tts(self._get_presentation_text(self._current_wp_index))

        elif state == TourState.DEGRADE:
            self._publish_led("degraded_blink")
            self._publish_tts(
                "Je rencontre une difficulté de connexion. "
                "Je continue la visite avec mes informations locales."
            )

        elif state == TourState.RETOUR:
            self._publish_led("return_sweep")
            self._publish_tts(
                "Nous arrivons à la fin de cette visite. "
                "Merci de votre présence au Musée Famienkro. "
                "J'espère vous avoir permis de mieux connaître "
                "les trésors artistiques de la Côte d'Ivoire."
            )

    # ==========================================================================
    # CALLBACKS
    # ==========================================================================

    def _cb_person_detected(self, msg: PersonDetection):
        """
        Callback /person_detected — musia_msgs/PersonDetection.
        Extrait person_detected, distance_m et confidence depuis le message enrichi.
        """
        self._person_detected   = msg.person_detected
        self._person_distance_m = msg.distance_m
        self._person_confidence = msg.confidence

        self.get_logger().debug(
            f"[PersonDetection] detected={msg.person_detected} "
            f"dist={msg.distance_m:.2f}m conf={msg.confidence:.2f}"
        )

    def _cb_ultrasonic_legacy(self, msg: Float32):
        """
        Topic legacy /ultrasonic_distance (Float32, cm).
        Conservé pour compatibilité debug — les décisions utilisent
        désormais PersonDetection.distance_m.
        """
        pass  # Données disponibles via _cb_person_detected

    def _cb_vps_response(self, msg: String):
        data = msg.data.strip()

        if data == "RECONNECTED":
            if self._state == TourState.DEGRADE:
                self.get_logger().info("[TourManager] VPS reconnecté → reprise")
                self._transition_to(TourState.PRESENTATION)
            return

        if data.startswith("NEXT_WP"):
            self._advance_waypoint()
            return

        if data.startswith("END_TOUR"):
            self._transition_to(TourState.RETOUR)
            return

        self._last_vps_response = data

    def _cb_nav2_feedback(self, msg: String):
        if msg.data == "GOAL_REACHED":
            self._nav2_goal_reached = True
            self._nav2_in_progress  = False

    # ==========================================================================
    # SERVICES
    # ==========================================================================

    def _srv_set_tour_mode(self, request, response):
        state_map = {
            "VEILLE":       TourState.VEILLE,
            "ACCUEIL":      TourState.ACCUEIL,
            "TRAITEMENT":   TourState.TRAITEMENT,
            "GUIDAGE":      TourState.GUIDAGE,
            "PRESENTATION": TourState.PRESENTATION,
            "DEGRADE":      TourState.DEGRADE,
            "RETOUR":       TourState.RETOUR,
        }
        target = state_map.get(request.mode.upper())
        if target is None:
            response.success = False
            response.message = f"État inconnu : {request.mode}"
            return response

        with self._state_lock:
            current = self._state

        if not is_valid_transition(current, target):
            response.success = False
            response.message = (
                f"Transition invalide : "
                f"{state_label(current)} → {state_label(target)}"
            )
            return response

        self._transition_to(target)
        response.success = True
        response.message = f"Transition vers {state_label(target)} effectuée"
        return response

    def _srv_get_current_zone(self, request, response):
        response.zone           = ZONE_MAP.get(self._current_wp_index, "inconnu")
        response.waypoint_index = self._current_wp_index
        response.waypoint_name  = (
            TOUR_WAYPOINTS[self._current_wp_index]
            if self._current_wp_index < len(TOUR_WAYPOINTS)
            else "WP_INCONNU"
        )
        return response

    # ==========================================================================
    # HELPERS
    # ==========================================================================

    def _publish_tts(self, text: str):
        msg = String()
        msg.data = text
        self._pub_tts.publish(msg)

    def _publish_led(self, command: str):
        msg = String()
        msg.data = command
        self._pub_led.publish(msg)

    def _send_nav2_goal(self, wp_index: int):
        self._nav2_in_progress = True
        wp_name = (TOUR_WAYPOINTS[wp_index]
                   if wp_index < len(TOUR_WAYPOINTS) else "WP0")
        self.get_logger().info(f"[TourManager] Nav2 goal → {wp_name}")
        goal = PoseStamped()
        goal.header.frame_id = "map"
        goal.header.stamp    = self.get_clock().now().to_msg()
        self._pub_goal.publish(goal)

    def _set_accueil_done(self):
        self._accueil_done = True

    def _advance_waypoint(self):
        if self._current_wp_index < len(TOUR_WAYPOINTS) - 1:
            self._current_wp_index += 1
            self._transition_to(TourState.GUIDAGE)
        else:
            self._transition_to(TourState.RETOUR)

    def _get_presentation_text(self, wp_index: int) -> str:
        presentations = {
            2: ("Devant vous, le Masque Goli — symbole solaire des Baoulé. "
                "Ce masque circulaire représente l'astre du jour "
                "et incarne la puissance masculine de la société. "
                "Il est dansé lors des funérailles des hommes importants."),
            3: ("Voici un pagne Kita, tissu de prestige Baoulé "
                "tissé par les hommes pour les cérémonies de cour royale. "
                "Chaque motif géométrique porte une signification précise."),
            6: ("Je vous présente le Gunye Ge, masque de la beauté idéale chez les Dan. "
                "Ses traits délicats représentent l'idéal féminin. "
                "Il apparaît lors des cérémonies de réconciliation et de bienvenue."),
            8: ("Devant vous, le Masque Kpelié des Sénoufo. "
                "Ce masque appartient à la société secrète du Poro. "
                "Il accompagne les défunts vers le monde des ancêtres."),
        }
        return presentations.get(
            wp_index,
            f"Nous sommes au waypoint {wp_index}. Vous pouvez me poser vos questions."
        )


# ==========================================================================
# MAIN
# ==========================================================================

def main(args=None):
    rclpy.init(args=args)
    node = TourManagerNode()
    executor = MultiThreadedExecutor(num_threads=4)
    executor.add_node(node)
    try:
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
