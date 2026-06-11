#!/usr/bin/env python3
"""
demo.launch.py — Scénario démo 9 minutes MUSIA
Audition PNE — 15 juin 2026

Phases du scénario :
  1 (0:00) Veille & détection visiteur
  2 (1:00) Accueil et présentation
  3 (2:00) Navigation Salle Baoulé
  4 (3:00) Présentation Masque Goli + Q&R jury
  5 (5:00) Question hors sujet — redirection
  6 (6:00) Navigation Salle Dan
  7 (7:00) Présentation Œuvre Dan
  8 (8:00) Fin de visite + retour WP0

Usage :
  ros2 launch musia_bringup demo.launch.py
  ros2 launch musia_bringup demo.launch.py serial_port:=/dev/ttyUSB0
"""

import os

from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import (
    DeclareLaunchArgument,
    ExecuteProcess,
    IncludeLaunchDescription,
    LogInfo,
    TimerAction,
)
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():

    bringup_dir = get_package_share_directory('musia_bringup')

    # ------------------------------------------------------------------
    # Arguments
    # ------------------------------------------------------------------
    declare_serial_port = DeclareLaunchArgument(
        'serial_port',
        default_value='/dev/ttyUSB0',
        description='Port série Arduino'
    )

    declare_map = DeclareLaunchArgument(
        'map',
        default_value=os.path.join(bringup_dir, 'maps', 'famienkro.yaml'),
        description='Carte musée'
    )

    serial_port = LaunchConfiguration('serial_port')
    map_yaml    = LaunchConfiguration('map')
    params_file = os.path.join(bringup_dir, 'config', 'musia_params.yaml')

    # ------------------------------------------------------------------
    # Inclure le launch complet avec demo_mode=true
    # ------------------------------------------------------------------
    full_system = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(
            os.path.join(bringup_dir, 'launch', 'musia.launch.py')
        ),
        launch_arguments={
            'map':         map_yaml,
            'demo_mode':   'true',
            'serial_port': serial_port,
            'autostart':   'true',
        }.items(),
    )

    # ------------------------------------------------------------------
    # Watchdog démo — publie un reset à t=540s (9 min) pour sécurité jury
    # Force le retour à VEILLE si la démo n'est pas terminée
    # ------------------------------------------------------------------
    demo_watchdog = TimerAction(
        period=540.0,
        actions=[
            ExecuteProcess(
                cmd=[
                    'ros2', 'service', 'call',
                    '/set_tour_mode',
                    'musia_msgs/srv/SetTourMode',
                    '{mode: VEILLE}',
                ],
                output='screen',
            )
        ]
    )

    # ------------------------------------------------------------------
    # Logs temporisés — affichage console pour suivi jury
    # ------------------------------------------------------------------
    log_phase = lambda t, msg: TimerAction(period=float(t), actions=[LogInfo(msg=msg)])

    return LaunchDescription([
        declare_serial_port,
        declare_map,

        # Banner démo
        LogInfo(msg='╔══════════════════════════════════════╗'),
        LogInfo(msg='║   MUSIA — Démo Jury PNE — 9 minutes  ║'),
        LogInfo(msg='║   Musée Famienkro — ESATIC 2026       ║'),
        LogInfo(msg='╚══════════════════════════════════════╝'),

        # Système complet
        full_system,

        # Logs de phase (pour suivi en console)
        log_phase(0,   '[DÉMO] Phase 1 — Veille & détection'),
        log_phase(60,  '[DÉMO] Phase 2 — Accueil visiteur'),
        log_phase(120, '[DÉMO] Phase 3 — Navigation Salle Baoulé'),
        log_phase(180, '[DÉMO] Phase 4 — Présentation Masque Goli'),
        log_phase(300, '[DÉMO] Phase 5 — Question hors sujet'),
        log_phase(360, '[DÉMO] Phase 6 — Navigation Salle Dan'),
        log_phase(420, '[DÉMO] Phase 7 — Présentation œuvre Dan'),
        log_phase(480, '[DÉMO] Phase 8 — Fin de visite'),
        log_phase(530, '[DÉMO] ⚠️  10 secondes avant fin — watchdog actif'),

        # Watchdog fin de démo
        demo_watchdog,

        LogInfo(msg='[DÉMO] Système prêt. MUSIA attend un visiteur.'),
    ])
