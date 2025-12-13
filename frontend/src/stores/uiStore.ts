/**
 * UI Store
 * Zustand store for UI state and preferences
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { MinimapConfig } from '@/types';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
  timestamp: number;
}

interface UIStore {
  // Panels
  isArtworkPanelOpen: boolean;
  isTourPanelOpen: boolean;
  isSettingsOpen: boolean;
  isHelpOpen: boolean;

  // Minimap
  minimapConfig: MinimapConfig;

  // Notifications
  notifications: Notification[];
  maxNotifications: number;

  // Performance
  showStats: boolean;
  showFPS: boolean;

  // Accessibility
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: number;

  // Debug
  debugMode: boolean;
  showBoundingBoxes: boolean;
  showWaypoints: boolean;

  // Actions - Panels
  toggleArtworkPanel: () => void;
  openArtworkPanel: () => void;
  closeArtworkPanel: () => void;
  toggleTourPanel: () => void;
  openTourPanel: () => void;
  closeTourPanel: () => void;
  toggleSettings: () => void;
  toggleHelp: () => void;

  // Actions - Minimap
  toggleMinimap: () => void;
  setMinimapPosition: (position: MinimapConfig['position']) => void;
  setMinimapScale: (scale: number) => void;

  // Actions - Notifications
  addNotification: (
    type: Notification['type'],
    message: string,
    duration?: number
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Actions - Performance
  toggleStats: () => void;
  toggleFPS: () => void;

  // Actions - Accessibility
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  setFontSize: (size: number) => void;

  // Actions - Debug
  toggleDebugMode: () => void;
  toggleBoundingBoxes: () => void;
  toggleWaypoints: () => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        isArtworkPanelOpen: false,
        isTourPanelOpen: false,
        isSettingsOpen: false,
        isHelpOpen: false,

        minimapConfig: {
          visible: true,
          scale: 1,
          position: 'bottom-right',
          size: 200,
        },

        notifications: [],
        maxNotifications: 3,

        showStats: false,
        showFPS: false,

        highContrast: false,
        reducedMotion: false,
        fontSize: 16,

        debugMode: false,
        showBoundingBoxes: false,
        showWaypoints: false,

        // Panel Actions
        toggleArtworkPanel: () =>
          set(
            (state) => ({ isArtworkPanelOpen: !state.isArtworkPanelOpen }),
            false,
            'toggleArtworkPanel'
          ),

        openArtworkPanel: () =>
          set({ isArtworkPanelOpen: true }, false, 'openArtworkPanel'),

        closeArtworkPanel: () =>
          set({ isArtworkPanelOpen: false }, false, 'closeArtworkPanel'),

        toggleTourPanel: () =>
          set(
            (state) => ({ isTourPanelOpen: !state.isTourPanelOpen }),
            false,
            'toggleTourPanel'
          ),

        openTourPanel: () =>
          set({ isTourPanelOpen: true }, false, 'openTourPanel'),

        closeTourPanel: () =>
          set({ isTourPanelOpen: false }, false, 'closeTourPanel'),

        toggleSettings: () =>
          set(
            (state) => ({ isSettingsOpen: !state.isSettingsOpen }),
            false,
            'toggleSettings'
          ),

        toggleHelp: () =>
          set(
            (state) => ({ isHelpOpen: !state.isHelpOpen }),
            false,
            'toggleHelp'
          ),

        // Minimap Actions
        toggleMinimap: () =>
          set(
            (state) => ({
              minimapConfig: {
                ...state.minimapConfig,
                visible: !state.minimapConfig.visible,
              },
            }),
            false,
            'toggleMinimap'
          ),

        setMinimapPosition: (position) =>
          set(
            (state) => ({
              minimapConfig: { ...state.minimapConfig, position },
            }),
            false,
            'setMinimapPosition'
          ),

        setMinimapScale: (scale) =>
          set(
            (state) => ({
              minimapConfig: { ...state.minimapConfig, scale },
            }),
            false,
            'setMinimapScale'
          ),

        // Notification Actions
        addNotification: (type, message, duration = 3000) =>
          set(
            (state) => {
              const notification: Notification = {
                id: `notif-${Date.now()}-${Math.random()}`,
                type,
                message,
                duration,
                timestamp: Date.now(),
              };

              const newNotifications = [...state.notifications, notification];

              // Limit notifications
              if (newNotifications.length > state.maxNotifications) {
                newNotifications.shift();
              }

              // Auto-remove after duration
              setTimeout(() => {
                get().removeNotification(notification.id);
              }, duration);

              return { notifications: newNotifications };
            },
            false,
            'addNotification'
          ),

        removeNotification: (id) =>
          set(
            (state) => ({
              notifications: state.notifications.filter((n) => n.id !== id),
            }),
            false,
            'removeNotification'
          ),

        clearNotifications: () =>
          set({ notifications: [] }, false, 'clearNotifications'),

        // Performance Actions
        toggleStats: () =>
          set(
            (state) => ({ showStats: !state.showStats }),
            false,
            'toggleStats'
          ),

        toggleFPS: () =>
          set(
            (state) => ({ showFPS: !state.showFPS }),
            false,
            'toggleFPS'
          ),

        // Accessibility Actions
        toggleHighContrast: () =>
          set(
            (state) => ({ highContrast: !state.highContrast }),
            false,
            'toggleHighContrast'
          ),

        toggleReducedMotion: () =>
          set(
            (state) => ({ reducedMotion: !state.reducedMotion }),
            false,
            'toggleReducedMotion'
          ),

        setFontSize: (fontSize) =>
          set({ fontSize }, false, 'setFontSize'),

        // Debug Actions
        toggleDebugMode: () =>
          set(
            (state) => ({ debugMode: !state.debugMode }),
            false,
            'toggleDebugMode'
          ),

        toggleBoundingBoxes: () =>
          set(
            (state) => ({ showBoundingBoxes: !state.showBoundingBoxes }),
            false,
            'toggleBoundingBoxes'
          ),

        toggleWaypoints: () =>
          set(
            (state) => ({ showWaypoints: !state.showWaypoints }),
            false,
            'toggleWaypoints'
          ),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({
          minimapConfig: state.minimapConfig,
          highContrast: state.highContrast,
          reducedMotion: state.reducedMotion,
          fontSize: state.fontSize,
        }),
      }
    ),
    { name: 'UIStore' }
  )
);

// Selectors
export const selectIsArtworkPanelOpen = (state: UIStore) => state.isArtworkPanelOpen;
export const selectIsTourPanelOpen = (state: UIStore) => state.isTourPanelOpen;
export const selectMinimapConfig = (state: UIStore) => state.minimapConfig;
export const selectNotifications = (state: UIStore) => state.notifications;
export const selectHighContrast = (state: UIStore) => state.highContrast;
export const selectReducedMotion = (state: UIStore) => state.reducedMotion;
export const selectDebugMode = (state: UIStore) => state.debugMode;
