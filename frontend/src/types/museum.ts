/**
 * Museum Type Definitions
 * Types for museum space, camera, and navigation
 */

import { Vector3 } from 'three';

export type ViewMode = 'exploration' | 'tour' | 'presentation';

export type NavigationMode = 'orbit' | 'first-person' | 'third-person' | 'follow' | 'cinematic';

export type CameraMode = 'free' | 'locked' | 'animated';

// Museum space configuration
export interface MuseumBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

export interface MuseumRoom {
  id: string;
  name: string;
  floor: number;
  bounds: MuseumBounds;
  theme?: string;
}

export interface MuseumFloor {
  level: number;
  name: string;
  rooms: MuseumRoom[];
  heightY: number;
}

// Camera configuration
export interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  near: number;
  far: number;
}

export interface CameraTransition {
  from: Vector3;
  to: Vector3;
  targetFrom: Vector3;
  targetTo: Vector3;
  duration: number; // ms
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  onComplete?: () => void;
}

export interface OrbitControlsConfig {
  enableDamping: boolean;
  dampingFactor: number;
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  enablePan: boolean;
  enableZoom: boolean;
  enableRotate: boolean;
}

// Lighting configuration
export interface LightingConfig {
  ambient: {
    intensity: number;
    color: string;
  };
  directional: {
    position: [number, number, number];
    intensity: number;
    color: string;
    castShadow: boolean;
  };
  spotlights: boolean; // Per-artwork spotlights
}

// Performance configuration
export interface PerformanceConfig {
  targetFPS: number;
  shadowMapSize: number;
  maxLights: number;
  useLOD: boolean;
  frustumCulling: boolean;
  maxDrawDistance: number;
}

// Museum state
export interface MuseumState {
  isLoading: boolean;
  loadingProgress: number;
  error?: string;
  viewMode: ViewMode;
  navigationMode: NavigationMode;
  currentFloor: number;
  currentRoom?: string;
}

// User position and orientation
export interface UserPosition {
  position: Vector3;
  rotation: number; // radians
  lookAt: Vector3;
}

// Minimap types
export interface MinimapConfig {
  visible: boolean;
  scale: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size: number;
}

export interface MinimapMarker {
  id: string;
  type: 'user' | 'robot' | 'artwork' | 'poi';
  position: [number, number];
  label?: string;
  color: string;
}
