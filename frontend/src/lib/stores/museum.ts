import { Vector3 } from "three";
import { create } from "zustand";
import { Artwork, PreloadedTrajectory } from "../types";

interface MuseumState {
  // Artworks
  artworks: Artwork[];
  currentArtwork: Artwork | null;
  setArtworks: (artworks: Artwork[]) => void;
  setCurrentArtwork: (artwork: Artwork | null) => void;

  // Robot
  robotPosition: Vector3;
  robotTarget: Vector3 | null;
  isRobotMoving: boolean;
  setRobotPosition: (position: Vector3) => void;
  setRobotTarget: (target: Vector3 | null) => void;
  setIsRobotMoving: (moving: boolean) => void;

  // Modal
  isArtworkModalOpen: boolean;
  setArtworkModalOpen: (open: boolean) => void;

  // Loading
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useMuseumStore = create<MuseumState>((set) => ({
  // Artworks
  artworks: [],
  currentArtwork: null,
  setArtworks: (artworks) => set({ artworks }),
  setCurrentArtwork: (artwork) => set({ currentArtwork: artwork }),

  // Robot
  robotPosition: new Vector3(0, 0, 0),
  robotTarget: null,
  isRobotMoving: false,
  setRobotPosition: (position) => set({ robotPosition: position }),
  setRobotTarget: (target) =>
    set({ robotTarget: target, isRobotMoving: target !== null }),
  setIsRobotMoving: (moving) => set({ isRobotMoving: moving }),

  // Modal
  isArtworkModalOpen: false,
  setArtworkModalOpen: (open) => set({ isArtworkModalOpen: open }),

  // Loading
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

// ============================================================================
// Tour State Store
// ============================================================================

interface TourState {
  currentTour: PreloadedTrajectory | null;
  currentStepIndex: number;
  isPlaying: boolean;
  isSpeaking: boolean;
  playbackSpeed: number;

  // Actions
  setTour: (tour: PreloadedTrajectory | null) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (index: number) => void;
  togglePlayPause: () => void;
  setIsSpeaking: (speaking: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  exitTour: () => void;
}

export const useTourStore = create<TourState>((set, get) => ({
  currentTour: null,
  currentStepIndex: 0,
  isPlaying: false,
  isSpeaking: false,
  playbackSpeed: 1,

  setTour: (tour) =>
    set({ currentTour: tour, currentStepIndex: 0, isPlaying: false }),

  nextStep: () => {
    const { currentTour, currentStepIndex } = get();
    if (currentTour && currentStepIndex < currentTour.steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    }
  },

  previousStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (index) => {
    const { currentTour } = get();
    if (currentTour && index >= 0 && index < currentTour.steps.length) {
      set({ currentStepIndex: index });
    }
  },

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),

  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  exitTour: () =>
    set({ currentTour: null, currentStepIndex: 0, isPlaying: false }),
}));
