/**
 * Stores Index
 * Central export for all Zustand stores
 */

// Museum Store
export {
  useMuseumStore,
  selectArtworks,
  selectSelectedArtwork,
  selectTrajectories,
  selectCurrentTrajectory,
  selectViewMode,
  selectNavigationMode,
  selectIsLoading,
  selectLoadingProgress,
} from './museumStore';

// Tour Store
export {
  useTourStore,
  selectIsPlaying,
  selectIsPaused,
  selectCurrentStep,
  selectTotalSteps,
  selectCurrentWaypoint,
  selectWaypoints,
  selectRobotPosition,
  selectIsRobotSpeaking,
  selectProgress,
} from './tourStore';

// Chat Store
export {
  useChatStore,
  selectMessages,
  selectIsChatOpen,
  selectChatState,
  selectSessionId,
  selectAudioPlayback,
  selectVoiceRecording,
  selectIsRecording,
  selectIsProcessing,
} from './chatStore';

// UI Store
export {
  useUIStore,
  selectIsArtworkPanelOpen,
  selectIsTourPanelOpen,
  selectMinimapConfig,
  selectNotifications,
  selectHighContrast,
  selectReducedMotion,
  selectDebugMode,
} from './uiStore';
