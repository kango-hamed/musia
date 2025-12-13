/**
 * Tour Store
 * Zustand store for guided tour state and playback
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Waypoint, TourPlaybackState } from '@/types';

interface TourStore extends TourPlaybackState {
  // Waypoints
  waypoints: Waypoint[];
  currentWaypoint: Waypoint | null;

  // Robot state
  robotPosition: [number, number, number];
  robotTarget: [number, number, number];
  isRobotMoving: boolean;
  isRobotSpeaking: boolean;

  // Actions - Playback Control
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;

  // Actions - Navigation
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (index: number) => void;

  // Actions - Waypoints
  setWaypoints: (waypoints: Waypoint[]) => void;
  addWaypoint: (waypoint: Waypoint) => void;
  removeWaypoint: (index: number) => void;

  // Actions - Robot
  setRobotPosition: (position: [number, number, number]) => void;
  setRobotTarget: (target: [number, number, number]) => void;
  setRobotMoving: (moving: boolean) => void;
  setRobotSpeaking: (speaking: boolean) => void;

  // Actions - Time
  updateElapsedTime: (time: number) => void;
  setAutoAdvance: (auto: boolean) => void;

  // Helper methods
  getCurrentArtworkId: () => string | undefined;
  hasNext: () => boolean;
  hasPrevious: () => boolean;
  getProgress: () => number;
}

export const useTourStore = create<TourStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      isPlaying: false,
      isPaused: false,
      currentStepIndex: 0,
      totalSteps: 0,
      elapsedTime: 0,
      remainingTime: 0,
      autoAdvance: true,
      waypoints: [],
      currentWaypoint: null,
      robotPosition: [0, 0.5, 0],
      robotTarget: [0, 0.5, 0],
      isRobotMoving: false,
      isRobotSpeaking: false,

      // Playback Control
      play: () =>
        set(
          (state) => ({
            isPlaying: true,
            isPaused: false,
            totalSteps: state.waypoints.length,
            currentWaypoint: state.waypoints[state.currentStepIndex] || null,
          }),
          false,
          'play'
        ),

      pause: () =>
        set({ isPaused: true }, false, 'pause'),

      resume: () =>
        set({ isPaused: false }, false, 'resume'),

      stop: () =>
        set(
          {
            isPlaying: false,
            isPaused: false,
            currentStepIndex: 0,
            elapsedTime: 0,
            currentWaypoint: null,
          },
          false,
          'stop'
        ),

      reset: () =>
        set(
          {
            isPlaying: false,
            isPaused: false,
            currentStepIndex: 0,
            elapsedTime: 0,
            remainingTime: 0,
            currentWaypoint: null,
          },
          false,
          'reset'
        ),

      // Navigation
      nextStep: () =>
        set(
          (state) => {
            if (state.currentStepIndex < state.waypoints.length - 1) {
              const newIndex = state.currentStepIndex + 1;
              return {
                currentStepIndex: newIndex,
                currentWaypoint: state.waypoints[newIndex],
              };
            } else {
              // End of tour
              return {
                isPlaying: false,
                currentStepIndex: 0,
                currentWaypoint: null,
              };
            }
          },
          false,
          'nextStep'
        ),

      previousStep: () =>
        set(
          (state) => {
            if (state.currentStepIndex > 0) {
              const newIndex = state.currentStepIndex - 1;
              return {
                currentStepIndex: newIndex,
                currentWaypoint: state.waypoints[newIndex],
              };
            }
            return state;
          },
          false,
          'previousStep'
        ),

      goToStep: (index) =>
        set(
          (state) => {
            if (index >= 0 && index < state.waypoints.length) {
              return {
                currentStepIndex: index,
                currentWaypoint: state.waypoints[index],
              };
            }
            return state;
          },
          false,
          'goToStep'
        ),

      // Waypoints
      setWaypoints: (waypoints) =>
        set(
          {
            waypoints,
            totalSteps: waypoints.length,
            currentWaypoint: waypoints[0] || null,
          },
          false,
          'setWaypoints'
        ),

      addWaypoint: (waypoint) =>
        set(
          (state) => {
            const newWaypoints = [...state.waypoints, waypoint];
            return {
              waypoints: newWaypoints,
              totalSteps: newWaypoints.length,
            };
          },
          false,
          'addWaypoint'
        ),

      removeWaypoint: (index) =>
        set(
          (state) => {
            const newWaypoints = state.waypoints.filter((_, i) => i !== index);
            return {
              waypoints: newWaypoints,
              totalSteps: newWaypoints.length,
            };
          },
          false,
          'removeWaypoint'
        ),

      // Robot Actions
      setRobotPosition: (position) =>
        set({ robotPosition: position }, false, 'setRobotPosition'),

      setRobotTarget: (target) =>
        set({ robotTarget: target }, false, 'setRobotTarget'),

      setRobotMoving: (moving) =>
        set({ isRobotMoving: moving }, false, 'setRobotMoving'),

      setRobotSpeaking: (speaking) =>
        set({ isRobotSpeaking: speaking }, false, 'setRobotSpeaking'),

      // Time
      updateElapsedTime: (time) =>
        set(
          (state) => {
            const totalDuration = state.waypoints.reduce(
              (sum, wp) => sum + wp.duration,
              0
            );
            return {
              elapsedTime: time,
              remainingTime: Math.max(0, totalDuration - time),
            };
          },
          false,
          'updateElapsedTime'
        ),

      setAutoAdvance: (auto) =>
        set({ autoAdvance: auto }, false, 'setAutoAdvance'),

      // Helper Methods
      getCurrentArtworkId: () => {
        const { currentWaypoint } = get();
        return currentWaypoint?.artworkId;
      },

      hasNext: () => {
        const { currentStepIndex, waypoints } = get();
        return currentStepIndex < waypoints.length - 1;
      },

      hasPrevious: () => {
        const { currentStepIndex } = get();
        return currentStepIndex > 0;
      },

      getProgress: () => {
        const { currentStepIndex, totalSteps } = get();
        return totalSteps > 0 ? (currentStepIndex + 1) / totalSteps : 0;
      },
    }),
    { name: 'TourStore' }
  )
);

// Selectors
export const selectIsPlaying = (state: TourStore) => state.isPlaying;
export const selectIsPaused = (state: TourStore) => state.isPaused;
export const selectCurrentStep = (state: TourStore) => state.currentStepIndex;
export const selectTotalSteps = (state: TourStore) => state.totalSteps;
export const selectCurrentWaypoint = (state: TourStore) => state.currentWaypoint;
export const selectWaypoints = (state: TourStore) => state.waypoints;
export const selectRobotPosition = (state: TourStore) => state.robotPosition;
export const selectIsRobotSpeaking = (state: TourStore) => state.isRobotSpeaking;
export const selectProgress = (state: TourStore) => state.getProgress();
