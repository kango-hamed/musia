"""
Tests unitaires — musia_navigation
Lance avec : pytest test/test_navigation.py -v
"""

import sys, os, math
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

# Import du module pur (sans rclpy)
from musia_navigation.waypoints import yaw_to_quaternion, DEFAULT_WAYPOINTS


class TestYawToQuaternion:

    def test_yaw_zero(self):
        q = yaw_to_quaternion(0.0)
        assert abs(q.x) < 1e-9
        assert abs(q.y) < 1e-9
        assert abs(q.z) < 1e-9
        assert abs(q.w - 1.0) < 1e-9

    def test_yaw_90_degrees(self):
        q = yaw_to_quaternion(math.pi / 2)
        assert abs(q.z - math.sqrt(2) / 2) < 1e-6
        assert abs(q.w - math.sqrt(2) / 2) < 1e-6

    def test_yaw_180_degrees(self):
        q = yaw_to_quaternion(math.pi)
        assert abs(q.z - 1.0) < 1e-6
        assert abs(q.w) < 1e-6

    def test_yaw_minus_90(self):
        q = yaw_to_quaternion(-math.pi / 2)
        assert abs(q.z + math.sqrt(2) / 2) < 1e-6

    def test_unit_norm_for_all_waypoint_yaws(self):
        """Quaternion de norme 1 pour chaque yaw du parcours."""
        for wp_name, coords in DEFAULT_WAYPOINTS.items():
            q = yaw_to_quaternion(coords["yaw"])
            norm = math.sqrt(q.x**2 + q.y**2 + q.z**2 + q.w**2)
            assert abs(norm - 1.0) < 1e-9, \
                f"{wp_name} yaw={coords['yaw']} → norme={norm}"


class TestDefaultWaypoints:

    def test_tous_waypoints_presents(self):
        for i in range(9):
            assert f"WP{i}" in DEFAULT_WAYPOINTS

    def test_wp0_est_origine(self):
        wp0 = DEFAULT_WAYPOINTS["WP0"]
        assert wp0["x"] == 0.0 and wp0["y"] == 0.0 and wp0["yaw"] == 0.0

    def test_progression_x_croissante(self):
        x = [DEFAULT_WAYPOINTS[f"WP{i}"]["x"] for i in range(9)]
        assert x[0] < x[4] < x[8]

    def test_coords_sont_nombres_finis(self):
        for wp, coords in DEFAULT_WAYPOINTS.items():
            for field in ("x", "y", "yaw"):
                v = coords[field]
                assert isinstance(v, (int, float)) and math.isfinite(v), \
                    f"{wp}.{field} invalide : {v}"

    def test_yaw_dans_plage_valide(self):
        for wp, coords in DEFAULT_WAYPOINTS.items():
            assert -math.pi <= coords["yaw"] <= math.pi, \
                f"{wp}.yaw={coords['yaw']} hors [-π, π]"

    def test_oeuvres_ont_yaw_non_nul(self):
        for wp in ("WP2", "WP3", "WP6", "WP8"):
            assert DEFAULT_WAYPOINTS[wp]["yaw"] != 0.0, \
                f"{wp} devrait avoir yaw≠0 (face à l'œuvre)"
