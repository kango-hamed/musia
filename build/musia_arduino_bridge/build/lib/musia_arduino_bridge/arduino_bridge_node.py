"""
MUSIA Arduino Bridge Node
─────────────────────────
Lit les trames JSON de l'Arduino (HC-SR04) via port série USB
et publie sur deux topics ROS 2 :

  /ultrasonic_distance   → std_msgs/Float32          (distance en cm, legacy)
  /person_detected       → musia_msgs/PersonDetection (message enrichi)

Paramètres ROS 2 (déclarés, surchargeables via YAML ou CLI) :
  serial_port         : '/dev/ttyUSB0'
  baud_rate           : 115200
  read_timeout_s      : 1.0
  reconnect_delay_s   : 3.0
  person_threshold_cm : 150.0   seuil de détection en cm
  confidence_default  : 1.0     confiance par défaut (HC-SR04 sans caméra)

Usage :
  ros2 run musia_arduino_bridge arduino_bridge_node
  ros2 run musia_arduino_bridge arduino_bridge_node \
      --ros-args -p serial_port:=/dev/ttyACM0
"""

import json
import threading
import time

import rclpy
from rclpy.node import Node
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy
from std_msgs.msg import Float32
from builtin_interfaces.msg import Time

from musia_msgs.msg import PersonDetection

try:
    import serial
except ImportError as exc:
    raise SystemExit(
        "[musia_arduino_bridge] pyserial manquant — "
        "lance : pip install pyserial"
    ) from exc


# ── Constantes ────────────────────────────────────────────────────────────────
NODE_NAME      = "arduino_bridge_node"
TOPIC_DISTANCE = "/ultrasonic_distance"   # legacy Float32 (cm)
TOPIC_PERSON   = "/person_detected"       # musia_msgs/PersonDetection


class ArduinoBridgeNode(Node):
    """Nœud ROS 2 : pont série Arduino ↔ topics ROS 2."""

    def __init__(self) -> None:
        super().__init__(NODE_NAME)

        # ── Paramètres ────────────────────────────────────────────────────────
        self.declare_parameter("serial_port",          "/dev/ttyUSB0")
        self.declare_parameter("baud_rate",            115200)
        self.declare_parameter("read_timeout_s",       1.0)
        self.declare_parameter("reconnect_delay_s",    3.0)
        self.declare_parameter("person_threshold_cm",  150.0)
        self.declare_parameter("confidence_default",   1.0)

        self._port       = self.get_parameter("serial_port").value
        self._baud       = self.get_parameter("baud_rate").value
        self._timeout    = self.get_parameter("read_timeout_s").value
        self._reconnect  = self.get_parameter("reconnect_delay_s").value
        self._threshold  = self.get_parameter("person_threshold_cm").value
        self._confidence = self.get_parameter("confidence_default").value

        # ── QoS : best-effort, garde 1 message ────────────────────────────────
        qos = QoSProfile(
            reliability=ReliabilityPolicy.BEST_EFFORT,
            history=HistoryPolicy.KEEP_LAST,
            depth=1,
        )

        # ── Publishers ────────────────────────────────────────────────────────
        # Legacy : distance brute en cm (conservé pour compatibilité debug)
        self._pub_dist = self.create_publisher(Float32, TOPIC_DISTANCE, qos)

        # Nouveau : message enrichi musia_msgs/PersonDetection
        self._pub_person = self.create_publisher(
            PersonDetection, TOPIC_PERSON, qos
        )

        # ── Thread série (non-bloquant pour le spin ROS 2) ────────────────────
        self._serial: serial.Serial | None = None
        self._running = True
        self._thread  = threading.Thread(
            target=self._serial_loop, daemon=True, name="arduino_serial"
        )
        self._thread.start()

        self.get_logger().info(
            f"ArduinoBridgeNode démarré — port={self._port} baud={self._baud} "
            f"seuil={self._threshold}cm"
        )

    # ── Connexion / reconnexion ────────────────────────────────────────────────
    def _open_serial(self) -> bool:
        try:
            self._serial = serial.Serial(
                port=self._port,
                baudrate=self._baud,
                timeout=self._timeout,
            )
            time.sleep(2.0)
            self._serial.reset_input_buffer()
            self.get_logger().info(f"Port série ouvert : {self._port}")
            return True
        except serial.SerialException as exc:
            self.get_logger().error(
                f"Impossible d'ouvrir {self._port} : {exc} — "
                f"retry dans {self._reconnect}s"
            )
            return False

    # ── Boucle série principale ────────────────────────────────────────────────
    def _serial_loop(self) -> None:
        while self._running:
            if not self._open_serial():
                time.sleep(self._reconnect)
                continue
            try:
                while self._running:
                    raw = self._serial.readline()
                    if not raw:
                        continue
                    self._handle_line(raw)
            except serial.SerialException as exc:
                self.get_logger().warn(
                    f"Erreur série : {exc} — reconnexion dans {self._reconnect}s"
                )
                self._close_serial()
                time.sleep(self._reconnect)

    def _close_serial(self) -> None:
        if self._serial and self._serial.is_open:
            self._serial.close()
        self._serial = None

    # ── Traitement d'une ligne JSON ────────────────────────────────────────────
    def _handle_line(self, raw: bytes) -> None:
        try:
            text = raw.decode("ascii", errors="ignore").strip()
            if not text:
                return

            data = json.loads(text)

            if "event" in data:
                self.get_logger().info(f"Arduino ready: {data}")
                return

            if "dist_cm" not in data:
                return

            dist_cm  = float(data["dist_cm"])
            dist_m   = dist_cm / 100.0
            detected = dist_cm < self._threshold

            # ── Topic legacy Float32 (cm) ──────────────────────────────────
            msg_dist      = Float32()
            msg_dist.data = dist_cm
            self._pub_dist.publish(msg_dist)

            # ── Topic musia_msgs/PersonDetection ──────────────────────────
            msg_person                  = PersonDetection()
            msg_person.header.stamp     = self.get_clock().now().to_msg()
            msg_person.header.frame_id  = "base_link"
            msg_person.person_detected  = detected
            msg_person.distance_m       = dist_m

            # Confiance : 1.0 si mesure valide (HC-SR04 range 2cm–400cm)
            # 0.0 si hors plage (mesure invalide de l'Arduino)
            if 0.02 <= dist_m <= 4.0:
                msg_person.confidence = self._confidence
            else:
                msg_person.confidence = 0.0
                msg_person.person_detected = False  # mesure hors plage → ignorée

            self._pub_person.publish(msg_person)

        except (json.JSONDecodeError, ValueError, KeyError) as exc:
            self.get_logger().debug(f"Trame ignorée ({exc}): {raw!r}")

    # ── Shutdown propre ────────────────────────────────────────────────────────
    def destroy_node(self) -> None:
        self._running = False
        self._close_serial()
        super().destroy_node()


# ── Entry point ────────────────────────────────────────────────────────────────
def main(args=None) -> None:
    rclpy.init(args=args)
    node = ArduinoBridgeNode()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == "__main__":
    main()
