/**
 * Trajectory Type Definitions
 * Types for guided tours and navigation paths
 */

import { Artwork, NarrativeContent } from './artwork';

export type DifficultyLevel = 'kids' | 'all' | 'expert';

export interface TrajectoryStep {
  id: string;
  trajectoryId: string;
  artworkId: string;
  narrativeContentId?: string;

  // Step configuration
  stepOrder: number; // Sequence in tour (0-indexed)
  stopDuration: number; // Duration in minutes

  // Optional position overrides
  positionX?: number;
  positionY?: number;
  positionZ?: number;

  notes?: string;

  // Populated relations
  artwork?: Artwork;
  narrative?: NarrativeContent;

  createdAt: string;
  updatedAt: string;
}

export interface Trajectory {
  id: string;
  name: string;
  description?: string;
  theme?: string; // e.g., "Renaissance Masters", "Modern Art"

  // Configuration
  estimatedDuration: number; // Total duration in minutes
  difficultyLevel: DifficultyLevel;
  maxVisitors: number;
  isActive: boolean;
  isDefault: boolean;

  // Steps
  steps: TrajectoryStep[];

  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface TrajectoriesResponse {
  data: Trajectory[];
}

export interface SingleTrajectoryResponse {
  data: Trajectory;
}

// Waypoint for 3D navigation
export interface Waypoint {
  position: [number, number, number]; // [x, y, z]
  lookAt: [number, number, number]; // Camera target
  artworkId?: string;
  duration: number; // ms to wait at this point
  isTransition?: boolean; // True if just a transition point
}

// Tour playback state
export interface TourPlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  currentStepIndex: number;
  totalSteps: number;
  elapsedTime: number; // seconds
  remainingTime: number; // seconds
  autoAdvance: boolean;
}
