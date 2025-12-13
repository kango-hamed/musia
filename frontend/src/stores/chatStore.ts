/**
 * Chat Store
 * Zustand store for conversation and chat state
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  ChatMessage,
  ChatState,
  ConversationSession,
  AudioPlaybackState,
  VoiceRecordingState,
} from '@/types';

interface ChatStore {
  // Session
  session: ConversationSession | null;
  sessionId: string | null;

  // Messages
  messages: ChatMessage[];
  maxMessages: number;

  // UI State
  isChatOpen: boolean;
  chatState: ChatState;

  // Audio Playback
  audioPlayback: AudioPlaybackState;

  // Voice Recording
  voiceRecording: VoiceRecordingState;

  // Actions - Session
  startSession: (artworkId?: string, trajectoryId?: string) => void;
  endSession: () => void;
  setSessionId: (id: string) => void;

  // Actions - Messages
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;

  // Actions - UI
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  setChatState: (state: ChatState) => void;

  // Actions - Audio Playback
  setAudioPlaying: (isPlaying: boolean) => void;
  setCurrentAudioUrl: (url: string | undefined) => void;
  setAudioTime: (currentTime: number, duration: number) => void;
  setAudioVolume: (volume: number) => void;

  // Actions - Voice Recording
  startRecording: () => void;
  stopRecording: (audioBlob: Blob) => void;
  cancelRecording: () => void;
  setRecordingError: (error: string | undefined) => void;

  // Helper methods
  getLastMessage: () => ChatMessage | undefined;
  getMessagesByRole: (role: ChatMessage['role']) => ChatMessage[];
  hasMessages: () => boolean;
}

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        session: null,
        sessionId: null,
        messages: [
          {
            id: 'welcome',
            role: 'assistant',
            content:
              'Bienvenue au Musée Virtuel ! Je suis votre guide IA. Posez-moi des questions sur les œuvres ou demandez une visite guidée.',
            timestamp: Date.now(),
          },
        ],
        maxMessages: 100,
        isChatOpen: false,
        chatState: 'idle',

        audioPlayback: {
          isPlaying: false,
          currentUrl: undefined,
          duration: 0,
          currentTime: 0,
          volume: 0.8,
        },

        voiceRecording: {
          isRecording: false,
          recordingDuration: 0,
          audioBlob: undefined,
          error: undefined,
        },

        // Session Actions
        startSession: (artworkId, trajectoryId) =>
          set(
            {
              session: {
                sessionId: `session-${Date.now()}`,
                artworkId,
                trajectoryId,
                startedAt: Date.now(),
                messages: get().messages,
              },
            },
            false,
            'startSession'
          ),

        endSession: () =>
          set({ session: null, sessionId: null }, false, 'endSession'),

        setSessionId: (id) =>
          set({ sessionId: id }, false, 'setSessionId'),

        // Message Actions
        addMessage: (message) =>
          set(
            (state) => {
              const newMessage: ChatMessage = {
                ...message,
                id: `msg-${Date.now()}-${Math.random()}`,
                timestamp: Date.now(),
              };

              // Limit messages to maxMessages
              const newMessages = [...state.messages, newMessage];
              if (newMessages.length > state.maxMessages) {
                newMessages.shift(); // Remove oldest
              }

              return { messages: newMessages };
            },
            false,
            'addMessage'
          ),

        clearMessages: () =>
          set({ messages: [] }, false, 'clearMessages'),

        removeMessage: (id) =>
          set(
            (state) => ({
              messages: state.messages.filter((m) => m.id !== id),
            }),
            false,
            'removeMessage'
          ),

        updateMessage: (id, updates) =>
          set(
            (state) => ({
              messages: state.messages.map((m) =>
                m.id === id ? { ...m, ...updates } : m
              ),
            }),
            false,
            'updateMessage'
          ),

        // UI Actions
        toggleChat: () =>
          set(
            (state) => ({ isChatOpen: !state.isChatOpen }),
            false,
            'toggleChat'
          ),

        openChat: () =>
          set({ isChatOpen: true }, false, 'openChat'),

        closeChat: () =>
          set({ isChatOpen: false }, false, 'closeChat'),

        setChatState: (chatState) =>
          set({ chatState }, false, 'setChatState'),

        // Audio Playback Actions
        setAudioPlaying: (isPlaying) =>
          set(
            (state) => ({
              audioPlayback: { ...state.audioPlayback, isPlaying },
            }),
            false,
            'setAudioPlaying'
          ),

        setCurrentAudioUrl: (currentUrl) =>
          set(
            (state) => ({
              audioPlayback: { ...state.audioPlayback, currentUrl },
            }),
            false,
            'setCurrentAudioUrl'
          ),

        setAudioTime: (currentTime, duration) =>
          set(
            (state) => ({
              audioPlayback: { ...state.audioPlayback, currentTime, duration },
            }),
            false,
            'setAudioTime'
          ),

        setAudioVolume: (volume) =>
          set(
            (state) => ({
              audioPlayback: { ...state.audioPlayback, volume },
            }),
            false,
            'setAudioVolume'
          ),

        // Voice Recording Actions
        startRecording: () =>
          set(
            {
              voiceRecording: {
                isRecording: true,
                recordingDuration: 0,
                audioBlob: undefined,
                error: undefined,
              },
              chatState: 'recording',
            },
            false,
            'startRecording'
          ),

        stopRecording: (audioBlob) =>
          set(
            (state) => ({
              voiceRecording: {
                ...state.voiceRecording,
                isRecording: false,
                audioBlob,
              },
              chatState: 'processing',
            }),
            false,
            'stopRecording'
          ),

        cancelRecording: () =>
          set(
            {
              voiceRecording: {
                isRecording: false,
                recordingDuration: 0,
                audioBlob: undefined,
                error: undefined,
              },
              chatState: 'idle',
            },
            false,
            'cancelRecording'
          ),

        setRecordingError: (error) =>
          set(
            (state) => ({
              voiceRecording: { ...state.voiceRecording, error },
              chatState: error ? 'error' : 'idle',
            }),
            false,
            'setRecordingError'
          ),

        // Helper Methods
        getLastMessage: () => {
          const messages = get().messages;
          return messages[messages.length - 1];
        },

        getMessagesByRole: (role) => {
          return get().messages.filter((m) => m.role === role);
        },

        hasMessages: () => {
          return get().messages.length > 0;
        },
      }),
      {
        name: 'chat-storage',
        partialize: (state) => ({
          messages: state.messages,
          sessionId: state.sessionId,
        }),
      }
    ),
    { name: 'ChatStore' }
  )
);

// Selectors
export const selectMessages = (state: ChatStore) => state.messages;
export const selectIsChatOpen = (state: ChatStore) => state.isChatOpen;
export const selectChatState = (state: ChatStore) => state.chatState;
export const selectSessionId = (state: ChatStore) => state.sessionId;
export const selectAudioPlayback = (state: ChatStore) => state.audioPlayback;
export const selectVoiceRecording = (state: ChatStore) => state.voiceRecording;
export const selectIsRecording = (state: ChatStore) => state.voiceRecording.isRecording;
export const selectIsProcessing = (state: ChatStore) => state.chatState === 'processing';
