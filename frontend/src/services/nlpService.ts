/**
 * NLP Service
 * API client for NLP module endpoints (conversation, TTS, STT)
 */

import { nlpClient, retryRequest } from './api';
import type {
  ConversationStartRequest,
  ConversationStartResponse,
  TextQuestionRequest,
  QuestionResponse,
  ConversationHistoryResponse,
} from '@/types';

export const nlpService = {
  /**
   * Start a new conversation session
   */
  async startConversation(
    request: ConversationStartRequest = {}
  ): Promise<ConversationStartResponse> {
    const response = await nlpClient.post<ConversationStartResponse>(
      '/conversation/start',
      request
    );
    return response.data;
  },

  /**
   * Send voice question (audio file)
   */
  async sendVoiceQuestion(
    audioBlob: Blob,
    sessionId?: string
  ): Promise<QuestionResponse> {
    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'recording.webm');
    if (sessionId) {
      formData.append('session_id', sessionId);
    }

    const response = await nlpClient.post<QuestionResponse>(
      '/conversation/ask',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Send text question
   */
  async sendTextQuestion(request: TextQuestionRequest): Promise<QuestionResponse> {
    const response = await nlpClient.post<QuestionResponse>(
      '/conversation/text',
      request
    );
    return response.data;
  },

  /**
   * Get conversation history
   */
  async getConversationHistory(
    sessionId: string
  ): Promise<ConversationHistoryResponse> {
    const response = await retryRequest(() =>
      nlpClient.get<ConversationHistoryResponse>(`/conversation/${sessionId}/history`)
    );
    return response.data;
  },

  /**
   * Get artworks from NLP module
   */
  async getArtworks(): Promise<any[]> {
    const response = await retryRequest(() => nlpClient.get('/artworks'));
    return response.data.artworks || [];
  },

  /**
   * Get artwork narrative with TTS
   */
  async getArtworkNarrative(
    artworkId: string,
    version: string = 'standard',
    language: string = 'fr'
  ): Promise<{
    artwork: any;
    narrative: {
      text: string;
      audio_url: string;
      duration: number;
      version: string;
    };
  }> {
    const response = await retryRequest(() =>
      nlpClient.get(`/artworks/${artworkId}/narrative`, {
        params: { version, language },
      })
    );
    return response.data;
  },

  /**
   * Get trajectories from NLP module
   */
  async getTrajectories(): Promise<any[]> {
    const response = await retryRequest(() => nlpClient.get('/trajectories'));
    return response.data.trajectories || [];
  },

  /**
   * Get trajectory with details
   */
  async getTrajectory(trajectoryId: string): Promise<any> {
    const response = await retryRequest(() =>
      nlpClient.get(`/trajectories/${trajectoryId}`)
    );
    return response.data;
  },

  /**
   * Preload trajectory (generate all TTS audio)
   */
  async preloadTrajectory(trajectoryId: string): Promise<{
    trajectory_id: string;
    steps_preloaded: number;
    audio_files: string[];
  }> {
    const response = await nlpClient.get(`/trajectories/${trajectoryId}/preload`);
    return response.data;
  },

  /**
   * Start guided tour
   */
  async startGuidedTour(
    trajectoryId: string,
    sessionId?: string
  ): Promise<{
    session_id: string;
    trajectory_id: string;
    current_step: number;
    total_steps: number;
    message: string;
  }> {
    const response = await nlpClient.post(`/trajectories/${trajectoryId}/start`, {
      session_id: sessionId,
    });
    return response.data;
  },

  /**
   * Test TTS (text-to-speech)
   */
  async testTTS(
    text: string,
    voice: string = 'fr-FR-DeniseNeural'
  ): Promise<{
    text: string;
    audio_url: string;
    voice: string;
  }> {
    const response = await nlpClient.post('/test/tts', { text, voice });
    return response.data;
  },

  /**
   * Test STT (speech-to-text)
   */
  async testSTT(audioBlob: Blob): Promise<{
    text: string;
    confidence: number;
    language: string;
  }> {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await nlpClient.post('/test/stt', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Get available TTS voices
   */
  async getVoices(): Promise<
    Array<{
      name: string;
      locale: string;
      gender: string;
    }>
  > {
    const response = await retryRequest(() => nlpClient.get('/voices'));
    return response.data.voices || [];
  },

  /**
   * Get audio file URL
   */
  getAudioUrl(filename: string): string {
    if (filename.startsWith('http')) {
      return filename;
    }
    const nlpURL = nlpClient.defaults.baseURL || 'http://localhost:8000';
    return `${nlpURL}${filename.startsWith('/') ? '' : '/'}${filename}`;
  },
};
