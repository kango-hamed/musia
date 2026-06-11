#!/usr/bin/env python3
"""
MUSIA Tour Manager Node
Machine à états 7 états — orchestrateur central du robot guide Famienkro
"""

import threading

import rclpy
from rclpy.node import Node
from rclpy.callback_groups import ReentrantCallbackGroup
from rclpy.executors import MultiThreadedExecutor
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy

from std_msgs.msg import Float32, String, Bool
from geometry_msgs.msg import PoseStamped

from musia_msgs.msg import PersonDetection
from musia_msgs.srv import SetTourMode, GetCurrentZone

from .states import TourState, is_valid_transition, state_label


PERSON_DISTANCE_THRESHOLD_M = 1.5
PERSON_CONFIDENCE_THRESHOLD = 0.5
VPS_TIMEOUT_S               = 2.0
TOUR_TICK_HZ                = 10.0
ACCUEIL_TTS_DURATION_S      = 6.0

TOUR_WAYPOINTS = [
    "WP0", "WP1", "WP2", "WP3", "WP4",
    "WP5", "WP6", "WP7", "WP8",
]

ZONE_MAP = {
    0: "entrée",
    1: "salle_baoule", 2: "salle_baoule", 3: "salle_baoule",
    4: "couloir",
    5: "salle_dan",    6: "salle_dan",
    7: "salle_senoufou", 8: "salle_senoufou",
}


class TourManagerNode(Node):

    def __init__(self):
        super().__init__('tour_manager_node')

        self.declare_parameter('person_distance_threshold_m', PERSON_DISTANCE_THRESHOLD_M)
        self.declare_parameter('person_confidence_threshold', PERSON_CONFIDENCE_THRESHOLD)
        self.declare_parameter('vps_timeout_s', VPS_TIMEOUT_S)
        self.declare_parameter('demo_mode', True)

        self._person_dist_threshold = self.get_parameter(
            'person_distance_threshold_m').get_parameter_value().double_value
        self._person_conf_threshold = self.get_parameter(
            'person_confidence_threshold').get_parameter_value().double_value
        self._vps_timeout = self.get_parameter(
            'vps_timeout_s').get_parameter_value().double_value
        self._demo_mode = self.get_parameter(
            'demo_mode').get_parameter_value().bool_value

        self._state: TourState       = TourState.VEILLE
        self._prev_state: TourState  = TourState.VEILLE
        self._state_lock             = threading.Lock()

        self._person_detected: bool   = False
        self._person_distance_m: float = 9999.0
        self._person_confidence: float = 0.0
        self._last_vps_response: str  = ""
        self._vps_request_time: float | None = None

        self._current_wp_index: int  = 0
        self._nav2_goal_reached: bool = False
        self._nav2_in_progress: bool  = False
        self._accueil_done: bool      = False
        self._accueil_timer           = None

        qos_be = QoSProfile(
            reliability=ReliabilityPolicy.BEST_EFFORT,
            history=HistoryPolicy.KEEP_LAST,
            depth=1,
        )

        cb = ReentrantCallbackGroup()

        self.create_subscription(
            PersonDetection, '/person_detected',
            self._cb_person_detected, qos_be, callback_group=cb)

        self.create_subscription(
            Float32, '/ultrasonic_distance',
            self._cb_ultrasonic_legacy, qos_be, callback_group=cb)

        self.create_subscription(
            String, '/vps_response',
            self._cb_vps_response, 10, callback_group=cb)

        self.create_subscription(
            String, '/nav2/feedback',
            self._cb_nav2_feedback, 10, callback_group=cb)

        self.create_subscription(
            String, '/visitor_question',
            self._cb_visitor_question, 10, callback_group=cb)

        self.create_subscription(
            Bool, '/tts_done',
            self._cb_tts_done, 10, callback_group=cb)

        self._pub_state   = self.create_publisher(String,      '/tour_state',  10)
        self._pub_tts     = self.create_publisher(String,      '/tts_request', 10)
        self._pub_led     = self.create_publisher(String,      '/led_command', 10)
        self._pub_goal_intent = self.create_publisher(String, '/nav_goal_request', 10)
        self._pub_vps_req = self.create_publisher(String,      '/vps_request', 10)

        self.create_service(
            SetTourMode,    '/set_tour_mode',    self._srv_set_tour_mode,    callback_group=cb)
        self.create_service(
            GetCurrentZone, '/get_current_zone', self._srv_get_current_zone, callback_group=cb)

        self._tick_timer = self.create_timer(
            1.0 / TOUR_TICK_HZ, self._tick, callback_group=cb)

        self.get_logger().info(
            f"[TourManager] Démarré — état initial : {state_label(self._state)} | "
            f"seuil distance={self._person_dist_threshold}m "
            f"confiance={self._person_conf_threshold}")
        self._announce_state_entry(TourState.VEILLE)

    def _tick(self):
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

    def _tick_veille(self):
        person_confirmed = (
            self._person_detected
            and self._person_distance_m < self._person_dist_threshold
            and self._person_confidence >= self._person_conf_threshold
        )
        if person_confirmed:
            self.get_logger().info(
                f"[TourManager] Visiteur confirmé — "
                f"dist={self._person_distance_m:.2f}m "
                f"conf={self._person_confidence:.2f} → ACCUEIL")
            self._transition_to(TourState.ACCUEIL)

    def _tick_accueil(self):
        if self._accueil_done:
            self._accueil_done = False
            self._current_wp_index = 1
            self._transition_to(TourState.GUIDAGE)

    def _tick_traitement(self):
        if self._last_vps_response:
            response_text = self._last_vps_response
            self._last_vps_response = ""
            self._vps_request_time  = None
            self._publish_tts(response_text)
            self._transition_to(self._prev_state)
            return

        if self._vps_request_time is not None:
            elapsed = self.get_clock().now().nanoseconds / 1e9 - self._vps_request_time
            if elapsed > self._vps_timeout:
                self.get_logger().warn(
                    f"[TourManager] VPS timeout ({elapsed:.1f}s) → DÉGRADÉ")
                self._transition_to(TourState.DEGRADE)

    def _tick_guidage(self):
        if self._nav2_goal_reached:
            self._nav2_goal_reached = False
            self._nav2_in_progress  = False
            self.get_logger().info(
                f"[TourManager] Arrivé {TOUR_WAYPOINTS[self._current_wp_index]} → PRÉSENTATION")
            self._transition_to(TourState.PRESENTATION)
        elif not self._nav2_in_progress:
            self._send_nav2_goal(self._current_wp_index)

    def _tick_presentation(self):
        pass

    def _tick_degrade(self):
        pass

    def _tick_retour(self):
        if self._nav2_goal_reached and self._current_wp_index == 0:
            self._nav2_goal_reached = False
            self.get_logger().info("[TourManager] WP0 atteint — retour VEILLE")
            self._transition_to(TourState.VEILLE)
        elif not self._nav2_in_progress:
            self._current_wp_index = 0
            self._send_nav2_goal(0)

    def _transition_to(self, new_state: TourState):
        with self._state_lock:
            current = self._state

        if not is_valid_transition(current, new_state):
            self.get_logger().error(
                f"[TourManager] Transition invalide : "
                f"{state_label(current)} → {state_label(new_state)} — IGNORÉE")
            return

        self.get_logger().info(
            f"[TourManager] {state_label(current)} → {state_label(new_state)}")

        with self._state_lock:
            self._prev_state = current
            self._state      = new_state

        self._announce_state_entry(new_state)

    def _announce_state_entry(self, state: TourState):
        if state == TourState.VEILLE:
            self._publish_led("idle_pulse")
            self._person_detected   = False
            self._current_wp_index  = 0
            self._nav2_in_progress  = False
            self._nav2_goal_reached = False
            self._last_vps_response = ""
            self._vps_request_time  = None

        elif state == TourState.ACCUEIL:
            self._publish_led("eyes_open")
            self._publish_tts(
                "Bonjour et bienvenue au Musée Famienkro. "
                "Je suis MUSIA, votre guide. "
                "Je vais vous présenter les chefs-d'oeuvre de l'art ivoirien. "
                "Etes-vous prêt à commencer la visite ?")
            self._accueil_timer = self.create_timer(
                ACCUEIL_TTS_DURATION_S, self._on_accueil_timer)

        elif state == TourState.TRAITEMENT:
            self._publish_led("thinking_spin")
            self._vps_request_time = self.get_clock().now().nanoseconds / 1e9

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
                "Je continue la visite avec mes informations locales.")

        elif state == TourState.RETOUR:
            self._publish_led("return_sweep")
            self._publish_tts(
                "Nous arrivons à la fin de cette visite. "
                "Merci de votre présence au Musée Famienkro. "
                "J'espère vous avoir permis de mieux connaitre "
                "les trésors artistiques de la Côte d'Ivoire.")

    def _cb_person_detected(self, msg: PersonDetection):
        self._person_detected   = msg.person_detected
        self._person_distance_m = msg.distance_m
        self._person_confidence = msg.confidence
        self.get_logger().debug(
            f"[PersonDetection] detected={msg.person_detected} "
            f"dist={msg.distance_m:.2f}m conf={msg.confidence:.2f}")

    def _cb_ultrasonic_legacy(self, msg: Float32):
        pass

    def _cb_vps_response(self, msg: String):
        data = msg.data.strip()
        if data == "RECONNECTED":
            if self._state == TourState.DEGRADE:
                self.get_logger().info("[TourManager] VPS reconnecté → reprise")
                self._transition_to(
                    self._prev_state if self._prev_state != TourState.DEGRADE
                    else TourState.PRESENTATION)
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

    def _cb_visitor_question(self, msg: String):
        with self._state_lock:
            current = self._state
        question = msg.data.strip()
        if not question:
            return
        if current == TourState.PRESENTATION:
            self.get_logger().info(
                f"[TourManager] Question visiteur : \"{question[:50]}\"")
            self._publish_vps_request(question)
            self._transition_to(TourState.TRAITEMENT)
        elif current == TourState.DEGRADE:
            self.get_logger().info("[TourManager] Question en mode dégradé — réponse locale")
            self._publish_tts(self._get_local_answer(question))

    def _cb_tts_done(self, msg: Bool):
        if msg.data:
            self.get_logger().debug("[TourManager] TTS terminé")

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
            response.message = f"Etat inconnu : {request.mode}"
            return response
        with self._state_lock:
            current = self._state
        if not is_valid_transition(current, target):
            response.success = False
            response.message = (
                f"Transition invalide : "
                f"{state_label(current)} → {state_label(target)}")
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
            else "WP_INCONNU")
        return response

    def _publish_tts(self, text: str):
        msg = String()
        msg.data = text
        self._pub_tts.publish(msg)

    def _publish_led(self, command: str):
        msg = String()
        msg.data = command
        self._pub_led.publish(msg)

    def _publish_vps_request(self, question: str):
        wp_name = TOUR_WAYPOINTS[self._current_wp_index]
        zone    = ZONE_MAP.get(self._current_wp_index, "inconnu")
        payload = f"ZONE:{zone}|WP:{wp_name}|Q:{question}"
        msg = String()
        msg.data = payload
        self._pub_vps_req.publish(msg)

    def _send_nav2_goal(self, wp_index: int):
        self._nav2_in_progress = True
        wp_name = TOUR_WAYPOINTS[wp_index] if wp_index < len(TOUR_WAYPOINTS) else "WP0"
        self.get_logger().info(f"[TourManager] Nav2 goal → {wp_name}")
        intent = String()
        intent.data = f"NAV_TO:{wp_name}"
        self._pub_goal_intent.publish(intent)

    def _on_accueil_timer(self):
        self._accueil_timer.cancel()
        self._accueil_timer = None
        self._accueil_done  = True

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
                "et incarne la puissance masculine de la société."),
            3: ("Voici un pagne Kita, tissu de prestige Baoulé "
                "tissé par les hommes pour les cérémonies de cour royale."),
            6: ("Je vous présente le Gunye Ge, masque de la beauté idéale chez les Dan. "
                "Il apparaît lors des cérémonies de réconciliation et de bienvenue."),
            8: ("Devant vous, le Masque Kpelié des Sénoufo. "
                "Ce masque appartient à la société secrète du Poro."),
        }
        return presentations.get(
            wp_index,
            f"Nous sommes au {TOUR_WAYPOINTS[wp_index] if wp_index < len(TOUR_WAYPOINTS) else 'waypoint ' + str(wp_index)}. "
            "Vous pouvez me poser vos questions sur les collections.")

    def _get_local_answer(self, question: str) -> str:
        q = question.lower()
        if any(w in q for w in ["baoulé", "baoule", "goli", "kita"]):
            return ("Les Baoulé sont un peuple Akan de Côte d'Ivoire, "
                    "réputés pour leur art du masque et du tissu.")
        if any(w in q for w in ["dan", "gunye"]):
            return ("Les Dan vivent à l'ouest de la Côte d'Ivoire. "
                    "Leurs masques sont parmi les plus connus d'Afrique de l'Ouest.")
        if any(w in q for w in ["sénoufo", "senoufou", "kpelié", "poro"]):
            return ("Les Sénoufo occupent le nord de la Côte d'Ivoire. "
                    "Le Poro est leur institution initiatique centrale.")
        return ("Je n'ai pas de connexion pour cette réponse. "
                "Je vous invite à consulter les panneaux explicatifs.")


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
