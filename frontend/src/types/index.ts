/**
 * Type Definitions Index
 * Central export for all TypeScript types
 */

// Artwork types
export type {
  Orientation,
  NarrativeVersion,
  LanguageCode,
  NarrativeContent,
  Artwork,
  ArtworkFrame,
  ArtworkInteraction,
  ArtworkResponse,
  SingleArtworkResponse,
} from './artwork';

// Trajectory types
export type {
  DifficultyLevel,
  TrajectoryStep,
  Trajectory,
  TrajectoriesResponse,
  SingleTrajectoryResponse,
  Waypoint,
  TourPlaybackState,
} from './trajectory';

// Conversation types
export type {
  MessageRole,
  ChatState,
  IntentType,
  ChatMessage,
  ConversationSession,
  ConversationStartRequest,
  ConversationStartResponse,
  TextQuestionRequest,
  VoiceQuestionRequest,
  QuestionResponse,
  ConversationHistoryResponse,
  AudioPlaybackState,
  VoiceRecordingState,
} from './conversation';

// Museum types
export type {
  ViewMode,
  NavigationMode,
  CameraMode,
  MuseumBounds,
  MuseumRoom,
  MuseumFloor,
  CameraConfig,
  CameraTransition,
  OrbitControlsConfig,
  LightingConfig,
  PerformanceConfig,
  MuseumState,
  UserPosition,
  MinimapConfig,
  MinimapMarker,
} from './museum';

// Three.js extensions
export type {
  MaterialUserData,
  AnimationState,
  RobotAnimationState,
  RobotState,
  TextureLoadProgress,
  ModelLoadProgress,
  RaycastHit,
  CollisionBounds,
  LODLevel,
  LODConfig,
  ArtworkMeshData,
  EnvironmentConfig,
  PostProcessingConfig,
  XRConfig,
  XRSession,
  XRController,
} from './three.d';
