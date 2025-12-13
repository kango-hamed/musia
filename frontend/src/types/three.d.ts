/**
 * Three.js Type Extensions
 * Additional types and extensions for Three.js integration
 */

import { Object3D, Vector3, Euler, Quaternion } from 'three';

declare module 'three' {
  interface Object3D {
    userData: {
      artworkId?: string;
      type?: string;
      interactive?: boolean;
      clickable?: boolean;
      [key: string]: unknown;
    };
  }
}

// Custom materials user data
export interface MaterialUserData {
  originalColor?: string;
  highlightColor?: string;
  emissiveIntensity?: number;
}

// Animation mixer types
export interface AnimationState {
  name: string;
  weight: number;
  timeScale: number;
  loop: boolean;
}

// Robot animation states
export type RobotAnimationState =
  | 'idle'
  | 'talking'
  | 'walking'
  | 'pointing'
  | 'waving'
  | 'thinking';

export interface RobotState {
  position: Vector3;
  rotation: Euler;
  animation: RobotAnimationState;
  isSpeaking: boolean;
  isMoving: boolean;
  targetPosition?: Vector3;
  lookAtTarget?: Vector3;
}

// Texture loading
export interface TextureLoadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Model loading
export interface ModelLoadProgress {
  url: string;
  loaded: number;
  total: number;
  percentage: number;
}

// Raycasting
export interface RaycastHit {
  object: Object3D;
  distance: number;
  point: Vector3;
  face?: {
    normal: Vector3;
  };
  artworkId?: string;
}

// Collision detection
export interface CollisionBounds {
  min: Vector3;
  max: Vector3;
  center: Vector3;
  radius: number;
}

// LOD (Level of Detail) configuration
export interface LODLevel {
  distance: number;
  object: Object3D;
}

export interface LODConfig {
  levels: LODLevel[];
  hysteresis: number;
}

// Artwork 3D mesh data
export interface ArtworkMeshData {
  artworkId: string;
  mesh: Object3D;
  frame: Object3D;
  position: Vector3;
  rotation: Euler;
  isVisible: boolean;
  isHighlighted: boolean;
}

// Environment map
export interface EnvironmentConfig {
  useHDRI: boolean;
  hdriPath?: string;
  backgroundIntensity: number;
  environmentIntensity: number;
}

// Post-processing
export interface PostProcessingConfig {
  enabled: boolean;
  bloom: {
    enabled: boolean;
    intensity: number;
    threshold: number;
  };
  ssao: {
    enabled: boolean;
    radius: number;
    intensity: number;
  };
  antialiasing: boolean;
}

// VR/XR types
export interface XRConfig {
  enabled: boolean;
  teleportation: boolean;
  controllers: boolean;
  hands: boolean;
}

export interface XRSession {
  active: boolean;
  mode: 'immersive-vr' | 'immersive-ar' | 'inline';
  controllers: XRController[];
}

export interface XRController {
  id: number;
  handedness: 'left' | 'right';
  position: Vector3;
  rotation: Quaternion;
}
