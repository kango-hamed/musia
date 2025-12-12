import { Artwork, NarrativeContent } from "./artwork";

// Trajectory (Audio Tour) type matching backend API
export interface TrajectoryStep {
  id: string;
  stepOrder: number;
  stopDuration?: number;
  positionX?: number;
  positionY?: number;
  artwork: Pick<Artwork, "id" | "title" | "code" | "imageUrl">;
  narrativeContent?: Pick<
    NarrativeContent,
    "id" | "version" | "language" | "duration" | "audioUrl" | "textContent"
  >;
}

export interface Trajectory {
  id: string;
  name: string;
  description?: string;
  theme?: string;
  estimatedDuration?: number;
  difficultyLevel?: string;
  maxVisitors?: number;
  isActive?: boolean;
  isDefault?: boolean;
  steps?: TrajectoryStep[];
  createdAt?: string;
  updatedAt?: string;
}

// Preloaded trajectory for guided tour playback
export interface PreloadedTrajectory {
  trajectory: {
    id: string;
    name: string;
    description: string;
    totalSteps: number;
  };
  steps: {
    order: number;
    artwork: {
      id: string;
      title: string;
      imageUrl?: string;
    };
    narrative: {
      text: string;
      audioUrl: string;
      duration: number;
    };
  }[];
}
