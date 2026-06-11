#!/usr/bin/env python3
"""
musia.launch.py — Lancement complet du système MUSIA
Démarre : Tour Manager + Arduino Bridge + Nav2 + AMCL + map_server

Usage :
  ros2 launch musia_bringup musia.launch.py
  ros2 launch musia_bringup musia.launch.py map:=/chemin/vers/famienkro.yaml
  ros2 launch musia_bringup musia.launch.py demo_mode:=false
"""

import os

from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import (
    DeclareLaunchArgument,
    GroupAction,
    IncludeLaunchDescription,
    LogInfo,
    TimerAction,
)
from launch.conditions import IfCondition
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch.substitutions import (
    LaunchConfiguration,
    PathJoinSubstitution,
    PythonExpression,
)
from launch_ros.actions import Node, PushRosNamespace
from launch_ros.substitutions import FindPackageShare


def generate_launch_description():

    # ------------------------------------------------------------------
    # Répertoires des packages
    # ------------------------------------------------------------------
    bringup_dir   = get_package_share_directory('musia_bringup')
    nav2_bringup  = get_package_share_directory('nav2_bringup')

    # ------------------------------------------------------------------
    # Arguments déclarés (surchargeables en ligne de commande)
    # ------------------------------------------------------------------
    declare_map = DeclareLaunchArgument(
        'map',
        default_value=os.path.join(bringup_dir, 'maps', 'famienkro.yaml'),
        description='Chemin vers la carte du musée (.yaml)'
    )

    declare_demo_mode = DeclareLaunchArgument(
        'demo_mode',
        default_value='true',
        description='Active le mode démo 9 minutes'
    )

    declare_params = DeclareLaunchArgument(
        'params_file',
        default_value=os.path.join(bringup_dir, 'config', 'musia_params.yaml'),
        description='Fichier de paramètres globaux MUSIA'
    )

    declare_nav2_params = DeclareLaunchArgument(
        'nav2_params_file',
        default_value=os.path.join(bringup_dir, 'config', 'nav2_params.yaml'),
        description='Fichier de paramètres Nav2'
    )

    declare_use_sim_time = DeclareLaunchArgument(
        'use_sim_time',
        default_value='false',
        description='Utiliser le temps simulé (Gazebo)'
    )

    declare_serial_port = DeclareLaunchArgument(
        'serial_port',
        default_value='/dev/ttyUSB0',
        description='Port série Arduino'
    )

    declare_autostart = DeclareLaunchArgument(
        'autostart',
        default_value='true',
        description='Démarrer Nav2 automatiquement'
    )

    # ------------------------------------------------------------------
    # Substitutions
    # ------------------------------------------------------------------
    map_yaml          = LaunchConfiguration('map')
    params_file       = LaunchConfiguration('params_file')
    nav2_params_file  = LaunchConfiguration('nav2_params_file')
    use_sim_time      = LaunchConfiguration('use_sim_time')
    serial_port       = LaunchConfiguration('serial_port')
    demo_mode         = LaunchConfiguration('demo_mode')
    autostart         = LaunchConfiguration('autostart')

    # ------------------------------------------------------------------
    # Nav2 — inclure le launch officiel nav2_bringup
    # ------------------------------------------------------------------
    nav2_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(
            os.path.join(nav2_bringup, 'launch', 'bringup_launch.py')
        ),
        launch_arguments={
            'map':          map_yaml,
            'use_sim_time': use_sim_time,
            'params_file':  nav2_params_file,
            'autostart':    autostart,
        }.items(),
    )

    # ------------------------------------------------------------------
    # Nœud : arduino_bridge_node
    # ------------------------------------------------------------------
    arduino_bridge_node = Node(
        package='musia_arduino_bridge',
        executable='arduino_bridge_node',
        name='arduino_bridge_node',
        output='screen',
        parameters=[
            params_file,
            {'port': serial_port},
        ],
    )

    # ------------------------------------------------------------------
    # Nœud : tour_manager_node
    # Démarre avec 3s de délai pour laisser Nav2 s'initialiser
    # ------------------------------------------------------------------
    navigation_node = TimerAction(
        period=3.0,
        actions=[
            Node(
                package='musia_navigation',
                executable='navigation_node',
                name='navigation_node',
                output='screen',
                parameters=[params_file],
            )
        ]
    )

    tour_manager_node = TimerAction(
        period=3.0,
        actions=[
            Node(
                package='musia_tour_manager',
                executable='tour_manager_node',
                name='tour_manager_node',
                output='screen',
                parameters=[
                    params_file,
                    {'demo_mode': demo_mode},
                ],

            )
        ]
    )

    # ------------------------------------------------------------------
    # Log de démarrage
    # ------------------------------------------------------------------
    log_start = LogInfo(
        msg='[musia.launch] Démarrage du système MUSIA — Musée Famienkro'
    )
    log_nav2 = LogInfo(
        msg='[musia.launch] Nav2 + AMCL + map_server démarrés'
    )
    log_bridge = LogInfo(
        msg='[musia.launch] Arduino bridge démarré'
    )
    log_tour = LogInfo(
        msg='[musia.launch] Tour Manager démarré — attente visiteurs'
    )

    return LaunchDescription([
        # Arguments
        declare_map,
        declare_demo_mode,
        declare_params,
        declare_nav2_params,
        declare_use_sim_time,
        declare_serial_port,
        declare_autostart,

        # Logs
        log_start,

        # Nav2 (map_server + AMCL + controller + planner + bt_navigator)
        nav2_launch,
        log_nav2,

        # Arduino Bridge (capteurs bas niveau)
        arduino_bridge_node,
        log_bridge,

        # Navigation node (relay NAV_TO:WPx → Nav2)
        navigation_node,

        # Tour Manager (orchestrateur, après 3s)
        tour_manager_node,
        log_tour,
    ])
