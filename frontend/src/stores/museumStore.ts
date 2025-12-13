/**
 * Museum Store
 * Main Zustand store for museum state management
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  Artwork,
  Trajectory,
  ViewMode,
  NavigationMode,
  MuseumState,
} from '@/types';

interface MuseumStore extends MuseumState {
  // Data
  artworks: Artwork[];
  trajectories: Trajectory[];
  selectedArtwork: Artwork | null;
  currentTrajectory: Trajectory | null;

  // UI State
  currentFloor: number;
  currentRoom: string | null;

  // Actions - Artworks
  setArtworks: (artworks: Artwork[]) => void;
  addArtwork: (artwork: Artwork) => void;
  updateArtwork: (id: string, updates: Partial<Artwork>) => void;
  removeArtwork: (id: string) => void;
  selectArtwork: (artwork: Artwork | null) => void;
  getArtworkById: (id: string) => Artwork | undefined;

  // Actions - Trajectories
  setTrajectories: (trajectories: Trajectory[]) => void;
  setCurrentTrajectory: (trajectory: Trajectory | null) => void;
  getTrajectoryById: (id: string) => Trajectory | undefined;

  // Actions - View Mode
  setViewMode: (mode: ViewMode) => void;
  setNavigationMode: (mode: NavigationMode) => void;

  // Actions - Location
  setCurrentFloor: (floor: number) => void;
  setCurrentRoom: (room: string | null) => void;

  // Actions - Loading/Error
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setError: (error: string | undefined) => void;

  // Computed/Helper methods
  getArtworksByRoom: (room: string) => Artwork[];
  getArtworksByFloor: (floor: number) => Artwork[];
  getVisibleArtworks: () => Artwork[];
}

export const useMuseumStore = create<MuseumStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      artworks: [],
      trajectories: [],
      selectedArtwork: null,
      currentTrajectory: null,
      isLoading: false,
      loadingProgress: 0,
      error: undefined,
      viewMode: 'exploration',
      navigationMode: 'orbit',
      currentFloor: 0,
      currentRoom: null,

      // Artwork Actions
      setArtworks: (artworks) =>
        set({ artworks }, false, 'setArtworks'),

      addArtwork: (artwork) =>
        set(
          (state) => ({ artworks: [...state.artworks, artwork] }),
          false,
          'addArtwork'
        ),

      updateArtwork: (id, updates) =>
        set(
          (state) => ({
            artworks: state.artworks.map((a) =>
              a.id === id ? { ...a, ...updates } : a
            ),
          }),
          false,
          'updateArtwork'
        ),

      removeArtwork: (id) =>
        set(
          (state) => ({
            artworks: state.artworks.filter((a) => a.id !== id),
          }),
          false,
          'removeArtwork'
        ),

      selectArtwork: (artwork) =>
        set({ selectedArtwork: artwork }, false, 'selectArtwork'),

      getArtworkById: (id) => {
        return get().artworks.find((a) => a.id === id);
      },

      // Trajectory Actions
      setTrajectories: (trajectories) =>
        set({ trajectories }, false, 'setTrajectories'),

      setCurrentTrajectory: (trajectory) =>
        set({ currentTrajectory: trajectory }, false, 'setCurrentTrajectory'),

      getTrajectoryById: (id) => {
        return get().trajectories.find((t) => t.id === id);
      },

      // View Mode Actions
      setViewMode: (mode) =>
        set({ viewMode: mode }, false, 'setViewMode'),

      setNavigationMode: (mode) =>
        set({ navigationMode: mode }, false, 'setNavigationMode'),

      // Location Actions
      setCurrentFloor: (floor) =>
        set({ currentFloor: floor }, false, 'setCurrentFloor'),

      setCurrentRoom: (room) =>
        set({ currentRoom: room }, false, 'setCurrentRoom'),

      // Loading/Error Actions
      setLoading: (loading) =>
        set({ isLoading: loading }, false, 'setLoading'),

      setLoadingProgress: (progress) =>
        set({ loadingProgress: progress }, false, 'setLoadingProgress'),

      setError: (error) =>
        set({ error }, false, 'setError'),

      // Helper Methods
      getArtworksByRoom: (room) => {
        return get().artworks.filter((a) => a.room === room);
      },

      getArtworksByFloor: (floor) => {
        return get().artworks.filter((a) => a.floor === floor);
      },

      getVisibleArtworks: () => {
        const { artworks, currentFloor, currentRoom } = get();

        return artworks.filter((artwork) => {
          const floorMatch = artwork.floor === currentFloor;
          const roomMatch = currentRoom ? artwork.room === currentRoom : true;
          return floorMatch && roomMatch;
        });
      },
    }),
    { name: 'MuseumStore' }
  )
);

// Selectors for performance optimization
export const selectArtworks = (state: MuseumStore) => state.artworks;
export const selectSelectedArtwork = (state: MuseumStore) => state.selectedArtwork;
export const selectTrajectories = (state: MuseumStore) => state.trajectories;
export const selectCurrentTrajectory = (state: MuseumStore) => state.currentTrajectory;
export const selectViewMode = (state: MuseumStore) => state.viewMode;
export const selectNavigationMode = (state: MuseumStore) => state.navigationMode;
export const selectIsLoading = (state: MuseumStore) => state.isLoading;
export const selectLoadingProgress = (state: MuseumStore) => state.loadingProgress;
