/**
 * Hooks Index
 * Central export for all custom hooks
 */

export { useMuseumData } from './useMuseumData';
export { useCameraAnimation } from './useCameraAnimation';
export { useVoiceChat } from './useVoiceChat';
export { use3DInteraction } from './use3DInteraction';
export { useAudioManager } from './useAudioManager';

// Re-export types
export type { UseMuseumDataOptions, UseMuseumDataReturn } from './useMuseumData';
export type { CameraTransitionOptions, UseCameraAnimationReturn } from './useCameraAnimation';
export type { UseVoiceChatOptions, UseVoiceChatReturn } from './useVoiceChat';
export type { InteractionCallbacks, Use3DInteractionReturn } from './use3DInteraction';
export type { AudioTrack, UseAudioManagerOptions, UseAudioManagerReturn } from './useAudioManager';
