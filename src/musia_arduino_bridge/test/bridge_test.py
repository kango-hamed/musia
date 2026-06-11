"""
Tests unitaires — MUSIA Arduino Bridge
Lance avec : pytest test/test_bridge.py -v

Ces tests couvrent la logique de parsing JSON sans matériel réel.
Le nœud ROS 2 complet est testé séparément (test d'intégration).
"""

import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


# ── Helpers — isoler _handle_line sans ROS 2 ─────────────────────────────────

class _FakePublisher:
    """Simule un publisher ROS 2 (capture les messages publiés)."""
    def __init__(self):
        self.messages = []

    def publish(self, msg):
        self.messages.append(msg)

    @property
    def last(self):
        return self.messages[-1] if self.messages else None


class _FakeLogger:
    """Simule rclpy logger (silencieux pendant les tests)."""
    def info(self, *a):  pass
    def warn(self, *a):  pass
    def error(self, *a): pass
    def debug(self, *a): pass


class _BridgeLogic:
    """
    Extrait la logique de parsing de ArduinoBridgeNode
    pour pouvoir la tester sans instancier ROS 2.
    """
    def __init__(self):
        from std_msgs.msg import Bool, Float32  # noqa: F401 — import optionnel

        self._pub_dist   = _FakePublisher()
        self._pub_person = _FakePublisher()
        self.log         = _FakeLogger()
        self._events     = []

    def _handle_line(self, raw: bytes) -> None:
        """Même logique que ArduinoBridgeNode._handle_line."""
        try:
            text = raw.decode("ascii", errors="ignore").strip()
            if not text:
                return
            data = json.loads(text)
            if "event" in data:
                self._events.append(data)
                return

            if "dist_cm" in data:
                from std_msgs.msg import Float32
                msg = Float32()
                msg.data = float(data["dist_cm"])
                self._pub_dist.publish(msg)

            if "person" in data:
                from std_msgs.msg import Bool
                msg = Bool()
                msg.data = bool(data["person"])
                self._pub_person.publish(msg)

        except (json.JSONDecodeError, ValueError, KeyError):
            pass  # trame ignorée


# ── Fixtures ──────────────────────────────────────────────────────────────────

def _make_bridge():
    return _BridgeLogic()


# ── Tests parsing ─────────────────────────────────────────────────────────────

class TestHandleLine:

    def test_normal_frame_distance(self):
        b = _make_bridge()
        b._handle_line(b'{"dist_cm": 42.3, "person": 0}\n')
        assert b._pub_dist.last is not None
        assert abs(b._pub_dist.last.data - 42.3) < 0.01

    def test_normal_frame_person_detected(self):
        b = _make_bridge()
        b._handle_line(b'{"dist_cm": 80.0, "person": 1}\n')
        assert b._pub_person.last.data is True

    def test_person_not_detected(self):
        b = _make_bridge()
        b._handle_line(b'{"dist_cm": 200.0, "person": 0}\n')
        assert b._pub_person.last.data is False

    def test_ready_event_not_published(self):
        b = _make_bridge()
        b._handle_line(b'{"event":"ready","version":"1.0"}\n')
        assert b._pub_dist.last is None
        assert b._pub_person.last is None
        assert len(b._events) == 1

    def test_empty_line_ignored(self):
        b = _make_bridge()
        b._handle_line(b"\n")
        assert b._pub_dist.last is None

    def test_invalid_json_ignored(self):
        b = _make_bridge()
        b._handle_line(b"garbage_not_json\n")
        assert b._pub_dist.last is None

    def test_partial_frame_distance_only(self):
        """Arduino qui n'envoie que dist_cm (sans person) → pas de crash."""
        b = _make_bridge()
        b._handle_line(b'{"dist_cm": 55.0}\n')
        assert b._pub_dist.last is not None
        assert b._pub_person.last is None

    def test_max_distance_sentinel(self):
        """Valeur sentinelle 400 cm (hors portée) doit être publiée telle quelle."""
        b = _make_bridge()
        b._handle_line(b'{"dist_cm": 400.0, "person": 0}\n')
        assert abs(b._pub_dist.last.data - 400.0) < 0.01

    def test_multiple_frames_accumulate(self):
        b = _make_bridge()
        frames = [
            b'{"dist_cm": 10.0, "person": 1}\n',
            b'{"dist_cm": 20.0, "person": 0}\n',
            b'{"dist_cm": 30.0, "person": 1}\n',
        ]
        for f in frames:
            b._handle_line(f)
        assert len(b._pub_dist.messages) == 3
        assert b._pub_dist.messages[2].data == 30.0

    def test_trailing_whitespace_handled(self):
        b = _make_bridge()
        b._handle_line(b'{"dist_cm": 15.5, "person": 0}   \r\n')
        assert b._pub_dist.last is not None

    def test_non_ascii_bytes_ignored_gracefully(self):
        b = _make_bridge()
        b._handle_line(b"\xff\xfe{broken}\n")
        assert b._pub_dist.last is None
