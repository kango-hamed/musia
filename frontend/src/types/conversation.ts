/**
 * Conversation Type Definitions
 * Types for AI chat and voice interactions
 */

export type MessageRole = 'user' | 'assistant' | 'system';

export type ChatState = 'idle' | 'recording' | 'processing' | 'playing' | 'error';

export type IntentType =
  | 'factual'      // Questions about facts
  | 'temporal'     // Questions about time/date
  | 'technical'    // Questions about technique
  | 'contextual'   // Questions about context/history
  | 'comparative'  // Comparisons
  | 'personal'     // Personal opinions
  | 'navigation'   // Museum navigation
  | 'general';     // Other

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  audioUrl?: string;
  intent?: IntentType;
  artworkId?: string;
}

export interface ConversationSession {
  sessionId: string;
  artworkId?: string;
  trajectoryId?: string;
  startedAt: number;
  messages: ChatMessage[];
}

// NLP API Request/Response types
export interface ConversationStartRequest {
  artworkId?: string;
  trajectoryId?: string;
}

export interface ConversationStartResponse {
  session_id: string;
  message: string;
}

export interface TextQuestionRequest {
  session_id: string;
  question: string;
  artwork_id?: string;
}

export interface VoiceQuestionRequest {
  audio_file: Blob;
  session_id: string;
}

export interface QuestionResponse {
  question: string;
  answer: string;
  audio_url: string;
  confidence?: number;
  intent: IntentType;
  artwork_id?: string;
  entities?: Record<string, unknown>;
}

export interface ConversationHistoryResponse {
  session_id: string;
  messages: Array<{
    role: MessageRole;
    content: string;
    timestamp: string;
  }>;
}

// Audio state
export interface AudioPlaybackState {
  isPlaying: boolean;
  currentUrl?: string;
  duration: number;
  currentTime: number;
  volume: number;
}

// Voice recording state
export interface VoiceRecordingState {
  isRecording: boolean;
  recordingDuration: number;
  audioBlob?: Blob;
  error?: string;
}
