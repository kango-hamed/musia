"""
MUSIA Arduino Bridge Node
─────────────────────────
Lit les trames JSON de l'Arduino (musia_bridge.ino) via port série USB
et publie sur les topics ROS 2 :

  /person_detected   → musia_msgs/PersonDetection  (visiteur + distance)
  /imu               → sensor_msgs/Imu             (MPU-6050 accél + gyro)
  /ultrasonic_distance → std_msgs/Float32           (distance cm, legacy)

Souscrit à :
  /cmd_vel           → geometry_msgs/Twist  → commande moteur M: vers Arduino
  /led_command       → std_msgs/String      → commande LED    L: vers Arduino

Protocole série Arduino (115200 baud) :
  Entrée  (ROS 2 → Arduino) : "M:<dg>,<pg>,<dd>,<pd>\\n"  |  "L:<cmd>\\n"
  Sortie  (Arduino → ROS 2) : {"dist_cm":42.5,"person":true,
                                "ax":0.01,"ay":-0.02,"az":9.81,
                                "gx":0.001,"gy":0.000,"gz":0.003}

Paramètres ROS 2 :
  serial_port         : '/dev/ttyUSB0'
  baud_rate           : 115200
  read_timeout_s      : 1.0
  reconnect_delay_s   : 3.0
  person_threshold_cm : 150.0
  confidence_default  : 1.0
  wheel_radius_m      : 0.033   rayon roue (m) — pour cmd_vel → PWM
  max_linear_speed    : 0.3     vitesse linéaire max (m/s)
  max_angular_speed   : 0.8     vitesse angulaire max (rad/s)
"""

import json
import math
import threading
import time

import rclpy
from rclpy.node import Node
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy

from std_msgs.msg import Float32, String
from sensor_msgs.msg import Imu
from geometry_msgs.msg import Twist
from musia_msgs.msg import PersonDetection

try:
    import serial
except ImportError as exc:
    raise SystemExit(
        "[musia_arduino_bridge] pyserial manquant — pip install pyserial"
    ) from exc


NODE_NAME      = "arduino_bridge_node"
TOPIC_DISTANCE = "/ultrasonic_distance"
TOPIC_PERSON   = "/person_detected"
TOPIC_IMU      = "/imu"
TOPIC_CMD_VEL  = "/cmd_vel"
TOPIC_LED      = "/led_command"

# Covariances diagonales pour le MPU-6050 (valeurs empiriques)
# Format ROS : matrice 3x3 à plat (9 valeurs)
ACCEL_COV = [0.04, 0, 0,  0, 0.04, 0,  0, 0, 0.04]
GYRO_COV  = [0.02, 0, 0,  0, 0.02, 0,  0, 0, 0.02]
# Orientation inconnue (IMU sans magnétomètre) → covariance -1
ORIENT_COV = [-1.0, 0, 0,  0, 0, 0,  0, 0, 0]

# PWM max envoyé aux moteurs (0-255)
PWM_MAX = 220


class ArduinoBridgeNode(Node):
    """Nœud ROS 2 : pont série Arduino ↔ topics ROS 2."""

    def __init__(self) -> None:
        super().__init__(NODE_NAME)

        # ── Paramètres ────────────────────────────────────────────────────────
        self.declare_parameter("serial_port",         "/dev/ttyUSB0")
        self.declare_parameter("baud_rate",           115200)
        self.declare_parameter("read_timeout_s",      1.0)
        self.declare_parameter("reconnect_delay_s",   3.0)
        self.declare_parameter("person_threshold_cm", 150.0)
        self.declare_parameter("confidence_default",  1.0)
        self.declare_parameter("max_linear_speed",    0.3)
        self.declare_parameter("max_angular_speed",   0.8)

        self._port            = self.get_parameter("serial_port").value
        self._baud            = self.get_parameter("baud_rate").value
        self._timeout         = self.get_parameter("read_timeout_s").value
        self._reconnect       = self.get_parameter("reconnect_delay_s").value
        self._threshold       = self.get_parameter("person_threshold_cm").value
        self._confidence      = self.get_parameter("confidence_default").value
        self._max_linear      = self.get_parameter("max_linear_speed").value
        self._max_angular     = self.get_parameter("max_angular_speed").value

        # ── QoS ───────────────────────────────────────────────────────────────
        qos_sensor = QoSProfile(
            reliability=ReliabilityPolicy.BEST_EFFORT,
            history=HistoryPolicy.KEEP_LAST,
            depth=1,
        )
        qos_reliable = QoSProfile(
            reliability=ReliabilityPolicy.RELIABLE,
            history=HistoryPolicy.KEEP_LAST,
            depth=10,
        )

        # ── Publishers ────────────────────────────────────────────────────────
        self._pub_dist   = self.create_publisher(Float32,         TOPIC_DISTANCE, qos_sensor)
        self._pub_person = self.create_publisher(PersonDetection, TOPIC_PERSON,   qos_sensor)
        self._pub_imu    = self.create_publisher(Imu,             TOPIC_IMU,      qos_sensor)

        # ── Subscribers ───────────────────────────────────────────────────────
        self.create_subscription(Twist,  TOPIC_CMD_VEL, self._cb_cmd_vel,  qos_reliable)
        self.create_subscription(String, TOPIC_LED,     self._cb_led,      qos_reliable)

        # ── Thread série ──────────────────────────────────────────────────────
        self._serial: serial.Serial | None = None
        self._serial_lock = threading.Lock()
        self._running = True
        self._thread  = threading.Thread(
            target=self._serial_loop, daemon=True, name="arduino_serial"
        )
        self._thread.start()

        self.get_logger().info(
            f"ArduinoBridgeNode démarré — port={self._baud} "
            f"seuil={self._threshold}cm"
        )

    # =========================================================================
    # SÉRIE — CONNEXION
    # =========================================================================

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
                f"Impossible d'ouvrir {self._port} : {exc} "
                f"— retry dans {self._reconnect}s"
            )
            return False

    def _close_serial(self) -> None:
        with self._serial_lock:
            if self._serial and self._serial.is_open:
                self._serial.close()
            self._serial = None

    def _send_serial(self, line: str) -> None:
        """Envoie une ligne à l'Arduino (thread-safe)."""
        with self._serial_lock:
            if self._serial and self._serial.is_open:
                try:
                    self._serial.write((line + "\n").encode("ascii"))
                except serial.SerialException as exc:
                    self.get_logger().warn(f"Erreur envoi série : {exc}")

    # =========================================================================
    # SÉRIE — BOUCLE PRINCIPALE
    # =========================================================================

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

    # =========================================================================
    # TRAITEMENT TRAME JSON ARDUINO → ROS 2
    # =========================================================================

    def _handle_line(self, raw: bytes) -> None:
        try:
            text = raw.decode("ascii", errors="ignore").strip()
            if not text:
                return

            data = json.loads(text)

            # Trame de démarrage
            if "event" in data:
                imu_flag = data.get("imu", False)
                self.get_logger().info(
                    f"Arduino ready — firmware={data.get('firmware','?')} "
                    f"imu={'✅' if imu_flag else '❌'}"
                )
                return

            if "dist_cm" not in data:
                return

            now = self.get_clock().now().to_msg()

            # ── /ultrasonic_distance (legacy) ─────────────────────────────
            dist_cm = float(data["dist_cm"])
            msg_dist      = Float32()
            msg_dist.data = dist_cm
            self._pub_dist.publish(msg_dist)

            # ── /person_detected ──────────────────────────────────────────
            dist_m   = dist_cm / 100.0
            detected = dist_cm < self._threshold

            msg_person                 = PersonDetection()
            msg_person.header.stamp    = now
            msg_person.header.frame_id = "base_link"
            msg_person.person_detected = detected
            msg_person.distance_m      = dist_m
            msg_person.confidence      = (
                self._confidence if 0.02 <= dist_m <= 4.0 else 0.0
            )
            if msg_person.confidence == 0.0:
                msg_person.person_detected = False
            self._pub_person.publish(msg_person)

            # ── /imu ──────────────────────────────────────────────────────
            # Publié seulement si les champs IMU sont présents dans la trame
            if "ax" in data:
                msg_imu                    = Imu()
                msg_imu.header.stamp       = now
                msg_imu.header.frame_id    = "imu_link"

                # Orientation inconnue (pas de magnétomètre)
                msg_imu.orientation_covariance = ORIENT_COV

                # Vitesse angulaire (rad/s)
                msg_imu.angular_velocity.x            = float(data.get("gx", 0.0))
                msg_imu.angular_velocity.y            = float(data.get("gy", 0.0))
                msg_imu.angular_velocity.z            = float(data.get("gz", 0.0))
                msg_imu.angular_velocity_covariance   = GYRO_COV

                # Accélération linéaire (m/s²)
                msg_imu.linear_acceleration.x         = float(data.get("ax", 0.0))
                msg_imu.linear_acceleration.y         = float(data.get("ay", 0.0))
                msg_imu.linear_acceleration.z         = float(data.get("az", 9.81))
                msg_imu.linear_acceleration_covariance = ACCEL_COV

                self._pub_imu.publish(msg_imu)

        except (json.JSONDecodeError, ValueError, KeyError) as exc:
            self.get_logger().debug(f"Trame ignorée ({exc}): {raw!r}")

    # =========================================================================
    # CALLBACKS ROS 2 → ARDUINO
    # =========================================================================

    def _cb_cmd_vel(self, msg: Twist) -> None:
        """
        Traduit geometry_msgs/Twist → commande moteur M: vers Arduino.

        Modèle différentiel :
          v_g = linear.x - angular.z * (entraxe / 2)
          v_d = linear.x + angular.z * (entraxe / 2)
        Normalisation → PWM 0-PWM_MAX.
        """
        v   = msg.linear.x
        w   = msg.angular.z

        # Normalisation sur [-1, 1]
        v_norm = max(-1.0, min(1.0, v   / self._max_linear))
        w_norm = max(-1.0, min(1.0, w   / self._max_angular))

        # Vitesses roues gauche / droite normalisées
        vg = max(-1.0, min(1.0, v_norm - w_norm))
        vd = max(-1.0, min(1.0, v_norm + w_norm))

        # Conversion en direction + PWM
        dir_g = 1 if vg >= 0 else 0
        pwm_g = int(abs(vg) * PWM_MAX)
        dir_d = 1 if vd >= 0 else 0
        pwm_d = int(abs(vd) * PWM_MAX)

        self._send_serial(f"M:{dir_g},{pwm_g},{dir_d},{pwm_d}")

    def _cb_led(self, msg: String) -> None:
        """Relaie la commande LED vers l'Arduino."""
        cmd = msg.data.strip()
        if cmd:
            self._send_serial(f"L:{cmd}")

    # =========================================================================
    # SHUTDOWN
    # =========================================================================

    def destroy_node(self) -> None:
        self._running = False
        # Stop moteurs avant de couper
        self._send_serial("S")
        time.sleep(0.1)
        self._close_serial()
        super().destroy_node()


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
