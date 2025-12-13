/**
 * Museum Constants
 * Configuration values for the 3D museum environment
 */

import type {
  MuseumBounds,
  CameraConfig,
  OrbitControlsConfig,
  LightingConfig,
  PerformanceConfig,
} from '@/types';

// ===== MUSEUM DIMENSIONS =====

export const MUSEUM_BOUNDS: MuseumBounds = {
  minX: -30,
  maxX: 30,
  minY: 0,
  maxY: 10,
  minZ: -30,
  maxZ: 30,
};

export const ROOM_DIMENSIONS = {
  width: 60, // X axis
  length: 60, // Z axis
  height: 10, // Y axis
  wallThickness: 0.5,
};

export const FLOOR_CONFIG = {
  size: 100,
  segments: 100,
  receivesShadow: true,
};

// ===== ORIENTATION MAPPING =====

export const ORIENTATION_ANGLES = {
  NORTH: 0,
  EAST: -Math.PI / 2,
  SOUTH: Math.PI,
  WEST: Math.PI / 2,
} as const;

export const WALL_OFFSETS = {
  NORTH: { x: 0, z: -ROOM_DIMENSIONS.length / 2 + 0.5 },
  SOUTH: { x: 0, z: ROOM_DIMENSIONS.length / 2 - 0.5 },
  EAST: { x: ROOM_DIMENSIONS.width / 2 - 0.5, z: 0 },
  WEST: { x: -ROOM_DIMENSIONS.width / 2 + 0.5, z: 0 },
} as const;

// ===== ARTWORK CONFIGURATION =====

export const ARTWORK_CONFIG = {
  defaultWidth: 2,
  defaultHeight: 2.5,
  frameDepth: 0.1,
  frameColor: '#8B7355', // Wood brown
  defaultY: 2.5, // Default height on wall

  // Frame styles
  frameStyles: {
    wood: { color: '#8B7355', roughness: 0.8, metalness: 0.1 },
    metal: { color: '#C0C0C0', roughness: 0.3, metalness: 0.9 },
    ornate: { color: '#FFD700', roughness: 0.4, metalness: 0.7 },
  },

  // Interaction
  hoverColor: '#FFD700', // Gold
  selectedColor: '#FF6B6B', // Red
  emissiveIntensity: {
    normal: 0,
    hover: 0.3,
    selected: 0.5,
  },
};

// ===== CAMERA CONFIGURATION =====

export const DEFAULT_CAMERA_CONFIG: CameraConfig = {
  position: [0, 5, 15],
  target: [0, 2, 0],
  fov: 75,
  near: 0.1,
  far: 1000,
};

export const ORBIT_CONTROLS_CONFIG: OrbitControlsConfig = {
  enableDamping: true,
  dampingFactor: 0.05,
  minDistance: 5,
  maxDistance: 50,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2, // Don't go below floor
  enablePan: true,
  enableZoom: true,
  enableRotate: true,
};

export const CAMERA_TRANSITION_DURATION = 1500; // ms

export const CAMERA_DISTANCES = {
  artworkView: 3.5, // meters from artwork
  robotFollow: 5,
  overview: 20,
};

// ===== LIGHTING CONFIGURATION =====

export const LIGHTING_CONFIG: LightingConfig = {
  ambient: {
    intensity: 0.4,
    color: '#FFFFFF',
  },
  directional: {
    position: [10, 20, 5],
    intensity: 1.2,
    color: '#FFFFFF',
    castShadow: true,
  },
  spotlights: true, // Enable per-artwork spotlights
};

export const SHADOW_CONFIG = {
  mapSize: [2048, 2048] as [number, number],
  camera: {
    near: 0.5,
    far: 50,
    left: -20,
    right: 20,
    top: 20,
    bottom: -20,
  },
  bias: -0.0001,
};

export const SPOTLIGHT_CONFIG = {
  intensity: 2,
  angle: 0.5, // radians
  penumbra: 0.3,
  distance: 10,
  decay: 2,
  castShadow: true,
  offsetY: 2, // Above artwork
};

// ===== ROBOT CONFIGURATION =====

export const ROBOT_CONFIG = {
  // Movement
  movementSpeed: 2, // units per second
  rotationSpeed: 3, // radians per second

  // Position
  initialPosition: [0, 0.5, 0] as [number, number, number],
  height: 1.5,
  radius: 0.4,

  // Animation
  idleBobSpeed: 2,
  idleBobAmplitude: 0.05,
  talkingSpeed: 5,
  talkingAmplitude: 0.1,

  // Colors
  bodyColor: '#4a90e2',
  headColor: '#357abd',
  eyeColor: '#00ff00',
  antennaColor: '#ff0000',

  // Light
  lightIntensity: 0.5,
  lightDistance: 5,
  lightColor: '#4a90e2',
};

// ===== PERFORMANCE CONFIGURATION =====

export const PERFORMANCE_CONFIG: PerformanceConfig = {
  targetFPS: 60,
  shadowMapSize: 2048,
  maxLights: 20,
  useLOD: true,
  frustumCulling: true,
  maxDrawDistance: 100,
};

export const LOD_DISTANCES = {
  high: 10,
  medium: 25,
  low: 50,
};

// ===== AUDIO CONFIGURATION =====

export const AUDIO_CONFIG = {
  // Spatial audio
  refDistance: 1,
  maxDistance: 10,
  rolloffFactor: 1,

  // Volume
  defaultVolume: 0.8,
  ambientVolume: 0.3,
  narrativeVolume: 1.0,

  // Playback
  fadeInDuration: 500, // ms
  fadeOutDuration: 500, // ms
};

// ===== NAVIGATION CONFIGURATION =====

export const NAVIGATION_CONFIG = {
  // First-person
  walkSpeed: 5, // units per second
  runSpeed: 10,
  jumpHeight: 2,
  gravity: -9.8,

  // Collision
  playerHeight: 1.8,
  playerRadius: 0.5,
  stepHeight: 0.3,

  // Look sensitivity
  mouseSensitivity: 0.002,
  touchSensitivity: 0.001,
};

// ===== UI CONFIGURATION =====

export const UI_CONFIG = {
  // Chat
  chatWidth: 384, // 96 * 4 (Tailwind w-96)
  chatHeight: 500,
  maxMessages: 100,

  // HUD
  hudPadding: 20,
  minimapSize: 200,

  // Loading
  loadingTimeout: 30000, // 30 seconds

  // Notifications
  notificationDuration: 3000, // ms
  notificationMaxStack: 3,
};

// ===== API CONFIGURATION =====

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  nlpURL: import.meta.env.VITE_NLP_URL || 'http://localhost:8000',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
};

// ===== COLORS =====

export const COLORS = {
  // Museum theme
  museumPrimary: '#2c3e50',
  museumSecondary: '#34495e',
  museumAccent: '#e74c3c',
  museumLight: '#ecf0f1',
  museumDark: '#1a252f',

  // UI
  background: '#f5f5f5',
  surface: '#ffffff',
  border: '#e0e0e0',
  text: '#333333',
  textSecondary: '#666666',

  // Status
  success: '#27ae60',
  warning: '#f39c12',
  error: '#e74c3c',
  info: '#3498db',

  // 3D scene
  floor: '#e0e0e0',
  wall: '#f8f8f8',
  ceiling: '#ffffff',
  shadow: '#000000',
};

// ===== ANIMATION DURATIONS =====

export const ANIMATION_DURATIONS = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
  cameraTransition: 1500,
};

// ===== EASING FUNCTIONS =====

export const EASING = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
};

// ===== KEYBOARD BINDINGS =====

export const KEYBOARD_BINDINGS = {
  // Movement
  forward: ['KeyW', 'ArrowUp'],
  backward: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  jump: ['Space'],
  run: ['ShiftLeft', 'ShiftRight'],

  // Actions
  interact: ['KeyE'],
  escape: ['Escape'],
  chat: ['KeyT'],

  // Camera
  resetView: ['KeyR'],
  firstPerson: ['Key1'],
  thirdPerson: ['Key2'],
  orbit: ['Key3'],

  // Tour
  nextStep: ['ArrowRight'],
  previousStep: ['ArrowLeft'],
  pauseTour: ['Space'],
};

// ===== FEATURE FLAGS =====

export const FEATURE_FLAGS = {
  enableVR: false,
  enableMultiplayer: false,
  enableVoiceCommands: true,
  enableSpatialAudio: true,
  enablePostProcessing: false,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  debugMode: import.meta.env.DEV,
};
