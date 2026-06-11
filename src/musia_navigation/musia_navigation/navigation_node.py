#!/usr/bin/env python3
"""
MUSIA Navigation Node
Traduit les intentions de navigation du tour_manager en goals Nav2 réels.

Flux :
  /nav_goal_request (String "NAV_TO:WP3")
        │
        ▼
  Résolution WPx → (x, y, yaw) depuis musia_params.yaml
        │
        ▼
  Action Nav2 : navigate_to_pose/NavigateToPose
        │
        ├── succès  → /nav2/feedback "GOAL_REACHED"
        ├── échec   → /nav2/feedback "GOAL_FAILED"
        └── timeout → annulation goal + /nav2/feedback "GOAL_FAILED"

Topics souscrits :
  /nav_goal_request   (std_msgs/String)   — depuis tour_manager_node

Topics publiés :
  /nav2/feedback      (std_msgs/String)   — résultat pour tour_manager_node
  /current_waypoint   (std_msgs/String)   — état courant (debug/UI)

Action client :
  navigate_to_pose    (nav2_msgs/action/NavigateToPose)
"""

import math

import rclpy
from rclpy.node import Node
from rclpy.action import ActionClient
from rclpy.callback_groups import ReentrantCallbackGroup
from rclpy.executors import MultiThreadedExecutor
from rclpy.duration import Duration

from std_msgs.msg import String
from geometry_msgs.msg import PoseStamped, Quaternion
from nav2_msgs.action import NavigateToPose
from action_msgs.msg import GoalStatus


# ---------------------------------------------------------------------------
# Constantes
# ---------------------------------------------------------------------------
NAV2_ACTION         = "navigate_to_pose"
GOAL_TIMEOUT_S      = 120.0     # Timeout max par waypoint (2 min)
ACTION_WAIT_TIMEOUT = 5.0       # Attente disponibilité action server (s)

# Table des waypoints — chargée depuis les paramètres ROS au démarrage.
# Valeurs par défaut issues de musia_params.yaml (Musée Famienkro).
# x, y en mètres (frame map), yaw en radians.
DEFAULT_WAYPOINTS: dict[str, dict] = {
    "WP0": {"x":  0.00, "y":  0.00, "yaw":  0.000},
    "WP1": {"x":  2.50, "y":  0.30, "yaw":  0.000},
    "WP2": {"x":  4.20, "y":  0.80, "yaw":  1.571},
    "WP3": {"x":  4.20, "y": -0.80, "yaw": -1.571},
    "WP4": {"x":  6.50, "y":  0.00, "yaw":  0.000},
    "WP5": {"x":  9.00, "y":  0.20, "yaw":  0.000},
    "WP6": {"x": 10.80, "y":  0.70, "yaw":  1.571},
    "WP7": {"x": 13.50, "y":  0.10, "yaw":  0.000},
    "WP8": {"x": 15.20, "y":  0.60, "yaw":  1.571},
}


def yaw_to_quaternion(yaw: float) -> Quaternion:
    """Convertit un angle yaw (rad) en quaternion ROS (rotation autour de Z)."""
    q = Quaternion()
    q.x = 0.0
    q.y = 0.0
    q.z = math.sin(yaw / 2.0)
    q.w = math.cos(yaw / 2.0)
    return q


class NavigationNode(Node):
    """
    Nœud ROS 2 — MUSIA Navigation.
    Pont entre le tour_manager (intentions WPx) et Nav2 (goals réels).
    """

    def __init__(self):
        super().__init__('navigation_node')

        # --- Paramètres ---
        self.declare_parameter('nav2_action_server', NAV2_ACTION)
        self.declare_parameter('goal_timeout_s', GOAL_TIMEOUT_S)
        self.declare_parameter('goal_tolerance_m', 0.25)

        # Déclarer les coordonnées de chaque waypoint comme paramètres
        # (surchargeables depuis musia_params.yaml via le launch)
        for wp_name, coords in DEFAULT_WAYPOINTS.items():
            self.declare_parameter(f'waypoints.{wp_name}.x',   coords['x'])
            self.declare_parameter(f'waypoints.{wp_name}.y',   coords['y'])
            self.declare_parameter(f'waypoints.{wp_name}.yaw', coords['yaw'])

        self._action_name   = self.get_parameter(
            'nav2_action_server').get_parameter_value().string_value
        self._goal_timeout  = self.get_parameter(
            'goal_timeout_s').get_parameter_value().double_value

        # Charger la table waypoints depuis les paramètres
        self._waypoints = self._load_waypoints()

        # --- État interne ---
        self._current_goal_handle = None
        self._goal_in_progress    = False
        self._pending_wp: str | None = None

        cb = ReentrantCallbackGroup()

        # --- Action client Nav2 ---
        self._nav2_client = ActionClient(
            self, NavigateToPose, self._action_name,
            callback_group=cb)

        # --- Subscribers ---
        self.create_subscription(
            String, '/nav_goal_request',
            self._cb_goal_request, 10, callback_group=cb)

        # --- Publishers ---
        self._pub_feedback   = self.create_publisher(String, '/nav2/feedback', 10)
        self._pub_current_wp = self.create_publisher(String, '/current_waypoint', 10)

        # --- Timer de surveillance timeout ---
        self._goal_start_time: float | None = None
        self._timeout_timer = self.create_timer(
            1.0, self._check_goal_timeout, callback_group=cb)

        self.get_logger().info(
            f"[Navigation] Démarré — action={self._action_name} "
            f"timeout={self._goal_timeout}s "
            f"waypoints chargés={list(self._waypoints.keys())}")

    # ==========================================================================
    # CHARGEMENT DES PARAMÈTRES
    # ==========================================================================

    def _load_waypoints(self) -> dict[str, dict]:
        """Charge les coordonnées waypoints depuis les paramètres ROS."""
        waypoints = {}
        for wp_name in DEFAULT_WAYPOINTS:
            x   = self.get_parameter(
                f'waypoints.{wp_name}.x').get_parameter_value().double_value
            y   = self.get_parameter(
                f'waypoints.{wp_name}.y').get_parameter_value().double_value
            yaw = self.get_parameter(
                f'waypoints.{wp_name}.yaw').get_parameter_value().double_value
            waypoints[wp_name] = {'x': x, 'y': y, 'yaw': yaw}
            self.get_logger().debug(
                f"[Navigation] {wp_name} → x={x:.2f} y={y:.2f} yaw={yaw:.3f}")
        return waypoints

    # ==========================================================================
    # CALLBACK REQUÊTE DE NAVIGATION
    # ==========================================================================

    def _cb_goal_request(self, msg: String):
        """
        Reçoit "NAV_TO:WP3" depuis tour_manager_node.
        Parse, résout les coordonnées, envoie le goal Nav2.
        """
        data = msg.data.strip()
        self.get_logger().info(f"[Navigation] Requête reçue : {data}")

        if not data.startswith("NAV_TO:"):
            self.get_logger().warn(
                f"[Navigation] Format invalide : '{data}' — attendu NAV_TO:WPx")
            return

        wp_name = data.split(":", 1)[1].strip()

        if wp_name not in self._waypoints:
            self.get_logger().error(
                f"[Navigation] Waypoint inconnu : '{wp_name}' "
                f"— disponibles : {list(self._waypoints.keys())}")
            self._publish_feedback("GOAL_FAILED")
            return

        if self._goal_in_progress:
            self.get_logger().warn(
                f"[Navigation] Goal déjà en cours — annulation avant nouveau goal")
            self._cancel_current_goal()

        self._send_goal(wp_name)

    # ==========================================================================
    # ENVOI DU GOAL NAV2
    # ==========================================================================

    def _send_goal(self, wp_name: str):
        """Construit et envoie un goal NavigateToPose à Nav2."""
        coords = self._waypoints[wp_name]

        # Vérifier que le serveur d'action est disponible
        if not self._nav2_client.wait_for_server(
                timeout_sec=ACTION_WAIT_TIMEOUT):
            self.get_logger().error(
                f"[Navigation] Action server '{self._action_name}' "
                f"non disponible après {ACTION_WAIT_TIMEOUT}s — Nav2 lancé ?")
            self._publish_feedback("GOAL_FAILED")
            return

        # Construire le PoseStamped
        goal_msg = NavigateToPose.Goal()
        goal_msg.pose = PoseStamped()
        goal_msg.pose.header.frame_id = "map"
        goal_msg.pose.header.stamp    = self.get_clock().now().to_msg()
        goal_msg.pose.pose.position.x = coords['x']
        goal_msg.pose.pose.position.y = coords['y']
        goal_msg.pose.pose.position.z = 0.0
        goal_msg.pose.pose.orientation = yaw_to_quaternion(coords['yaw'])

        self.get_logger().info(
            f"[Navigation] Envoi goal → {wp_name} "
            f"(x={coords['x']:.2f} y={coords['y']:.2f} yaw={coords['yaw']:.3f})")

        # Publier le waypoint courant
        wp_msg = String()
        wp_msg.data = wp_name
        self._pub_current_wp.publish(wp_msg)

        # Enregistrer le temps de départ pour le timeout
        self._goal_start_time = self.get_clock().now().nanoseconds / 1e9
        self._goal_in_progress = True
        self._pending_wp = wp_name

        # Envoyer le goal de façon asynchrone
        send_goal_future = self._nav2_client.send_goal_async(
            goal_msg,
            feedback_callback=self._cb_nav2_feedback)
        send_goal_future.add_done_callback(self._cb_goal_response)

    # ==========================================================================
    # CALLBACKS ACTION NAV2
    # ==========================================================================

    def _cb_goal_response(self, future):
        """Appelé quand Nav2 accepte ou rejette le goal."""
        goal_handle = future.result()

        if not goal_handle.accepted:
            self.get_logger().error(
                "[Navigation] Goal REJETÉ par Nav2")
            self._goal_in_progress = False
            self._goal_start_time  = None
            self._publish_feedback("GOAL_FAILED")
            return

        self.get_logger().info(
            f"[Navigation] Goal ACCEPTÉ par Nav2 → {self._pending_wp}")
        self._current_goal_handle = goal_handle

        # S'abonner au résultat final
        result_future = goal_handle.get_result_async()
        result_future.add_done_callback(self._cb_goal_result)

    def _cb_nav2_feedback(self, feedback_msg):
        """Feedback de progression Nav2 (distance restante)."""
        distance = feedback_msg.feedback.distance_remaining
        self.get_logger().debug(
            f"[Navigation] Distance restante → {self._pending_wp} : "
            f"{distance:.2f}m")

    def _cb_goal_result(self, future):
        """Appelé à la fin de la navigation (succès, échec, annulation)."""
        self._goal_in_progress    = False
        self._goal_start_time     = None
        self._current_goal_handle = None

        result = future.result()
        status = result.status

        if status == GoalStatus.STATUS_SUCCEEDED:
            self.get_logger().info(
                f"[Navigation] ✅ GOAL_REACHED — {self._pending_wp}")
            self._publish_feedback("GOAL_REACHED")

        elif status == GoalStatus.STATUS_CANCELED:
            self.get_logger().info(
                f"[Navigation] Goal annulé — {self._pending_wp}")
            # Pas de feedback GOAL_FAILED sur annulation volontaire
            # (c'est tour_manager qui a demandé l'annulation)

        else:
            self.get_logger().warn(
                f"[Navigation] ❌ GOAL_FAILED — {self._pending_wp} "
                f"(status={status})")
            self._publish_feedback("GOAL_FAILED")

        self._pending_wp = None

    # ==========================================================================
    # TIMEOUT ET ANNULATION
    # ==========================================================================

    def _check_goal_timeout(self):
        """Vérifie si le goal dépasse le timeout configuré."""
        if not self._goal_in_progress or self._goal_start_time is None:
            return

        elapsed = self.get_clock().now().nanoseconds / 1e9 - self._goal_start_time
        if elapsed > self._goal_timeout:
            self.get_logger().error(
                f"[Navigation] ⏱ Timeout ({elapsed:.0f}s) → {self._pending_wp} "
                f"— annulation du goal")
            self._cancel_current_goal()
            self._publish_feedback("GOAL_FAILED")

    def _cancel_current_goal(self):
        """Annule le goal Nav2 en cours."""
        if self._current_goal_handle is not None:
            self.get_logger().info("[Navigation] Annulation du goal en cours...")
            cancel_future = self._current_goal_handle.cancel_goal_async()
            cancel_future.add_done_callback(self._cb_cancel_done)
        self._goal_in_progress = False
        self._goal_start_time  = None

    def _cb_cancel_done(self, future):
        cancel_response = future.result()
        if len(cancel_response.goals_canceling) > 0:
            self.get_logger().info("[Navigation] Goal annulé avec succès")
        else:
            self.get_logger().warn("[Navigation] Échec de l'annulation du goal")

    # ==========================================================================
    # HELPERS
    # ==========================================================================

    def _publish_feedback(self, status: str):
        """Publie le résultat sur /nav2/feedback pour tour_manager_node."""
        msg = String()
        msg.data = status
        self._pub_feedback.publish(msg)
        self.get_logger().info(f"[Navigation] → /nav2/feedback : {status}")


# ==========================================================================
# MAIN
# ==========================================================================

def main(args=None):
    rclpy.init(args=args)
    node = NavigationNode()
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
