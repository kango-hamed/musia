"""
musia_navigation.waypoints
Coordonnées des waypoints et utilitaires géométriques.
Module sans dépendance ROS — testable en pur Python.
"""

import math
from dataclasses import dataclass

try:
    from geometry_msgs.msg import Quaternion as _RosQuaternion
    _USE_ROS = True
except ImportError:
    _USE_ROS = False


@dataclass
class Quaternion:
    """Quaternion minimal — compatible geometry_msgs/Quaternion en duck typing."""
    x: float = 0.0
    y: float = 0.0
    z: float = 0.0
    w: float = 1.0


# Table des waypoints — Musée Famienkro
# x, y en mètres (frame map, origine = entrée principale)
# yaw en radians (rotation autour de Z)
DEFAULT_WAYPOINTS: dict[str, dict] = {
    "WP0": {"x":  0.00, "y":  0.00, "yaw":  0.000},   # Entrée / veille
    "WP1": {"x":  2.50, "y":  0.30, "yaw":  0.000},   # Salle Baoulé — seuil
    "WP2": {"x":  4.20, "y":  0.80, "yaw":  1.571},   # Masque Goli — face œuvre
    "WP3": {"x":  4.20, "y": -0.80, "yaw": -1.571},   # Pagne Kita — face œuvre
    "WP4": {"x":  6.50, "y":  0.00, "yaw":  0.000},   # Couloir central
    "WP5": {"x":  9.00, "y":  0.20, "yaw":  0.000},   # Salle Dan — seuil
    "WP6": {"x": 10.80, "y":  0.70, "yaw":  1.571},   # Masque Gunye Ge — face œuvre
    "WP7": {"x": 13.50, "y":  0.10, "yaw":  0.000},   # Salle Sénoufo — seuil
    "WP8": {"x": 15.20, "y":  0.60, "yaw":  1.571},   # Masque Kpelié — face œuvre
}


def yaw_to_quaternion(yaw: float):
    """
    Convertit un angle yaw (radians) en quaternion ROS (rotation autour de Z).
    Retourne un geometry_msgs/Quaternion (ou duck-type équivalent) de norme 1.
    """
    z = math.sin(yaw / 2.0)
    w = math.cos(yaw / 2.0)
    if _USE_ROS:
        q = _RosQuaternion()
        q.x, q.y, q.z, q.w = 0.0, 0.0, z, w
        return q
    return Quaternion(x=0.0, y=0.0, z=z, w=w)
