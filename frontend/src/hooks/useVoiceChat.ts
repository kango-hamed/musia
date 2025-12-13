/**
 * useVoiceChat Hook
 * Hook for voice recording and NLP conversation
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useChatStore } from '@/stores';
import { VoiceRecorder, AudioPlayer } from '@/utils';
import type { QuestionResponse } from '@/types';

interface UseVoiceChatOptions {
  autoPlayResponse?: boolean;
  onResponseReceived?: (response: QuestionResponse) => void;
  onError?: (error: Error) => void;
}

interface UseVoiceChatReturn {
  isRecording: boolean;
  isProcessing: boolean;
  isPlaying: boolean;
  recordingDuration: number;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  cancelRecording: () => void;
  sendTextMessage: (text: string) => Promise<void>;
  stopPlayback: () => void;
  error: string | undefined;
}

export function useVoiceChat(
  options: UseVoiceChatOptions = {}
): UseVoiceChatReturn {
  const { autoPlayResponse = true, onResponseReceived, onError } = options;

  const {
    sessionId,
    setSessionId,
    addMessage,
    setChatState,
    setAudioPlaying,
    startRecording: startRecordingState,
    stopRecording: stopRecordingState,
    cancelRecording: cancelRecordingState,
    setRecordingError,
  } = useChatStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);

  const voiceRecorder = useRef<VoiceRecorder | null>(null);
  const audioPlayer = useRef<AudioPlayer | null>(null);
  const recordingTimer = useRef<NodeJS.Timeout | null>(null);

  const nlpURL = import.meta.env.VITE_NLP_URL || 'http://localhost:8000';

  // Initialize audio player
  useEffect(() => {
    audioPlayer.current = new AudioPlayer();

    return () => {
      audioPlayer.current?.destroy();
    };
  }, []);

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      setError(undefined);
      voiceRecorder.current = new VoiceRecorder();
      await voiceRecorder.current.start();

      startRecordingState();
      setRecordingDuration(0);

      // Update duration every 100ms
      recordingTimer.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 100);
      }, 100);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start recording';
      setError(message);
      setRecordingError(message);
      if (onError) {
        onError(err instanceof Error ? err : new Error(message));
      }
    }
  }, [startRecordingState, setRecordingError, onError]);

  // Stop recording and send to NLP
  const stopRecording = useCallback(async () => {
    if (!voiceRecorder.current) return;

    try {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
        recordingTimer.current = null;
      }

      const audioBlob = await voiceRecorder.current.stop();
      stopRecordingState(audioBlob);
      setIsProcessing(true);

      // Create FormData
      const formData = new FormData();
      formData.append('audio_file', audioBlob, 'recording.webm');
      if (sessionId) {
        formData.append('session_id', sessionId);
      }

      // Send to NLP API
      const response = await fetch(`${nlpURL}/conversation/ask`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process voice message');
      }

      const data: QuestionResponse = await response.json();

      // Update session ID if new
      if (!sessionId && data.session_id) {
        setSessionId(data.session_id);
      }

      // Add messages
      addMessage({
        role: 'user',
        content: data.question,
        intent: data.intent,
        artworkId: data.artwork_id,
      });

      addMessage({
        role: 'assistant',
        content: data.answer,
        audioUrl: data.audio_url,
        intent: data.intent,
        artworkId: data.artwork_id,
      });

      // Play audio response
      if (autoPlayResponse && data.audio_url && audioPlayer.current) {
        const fullAudioUrl = data.audio_url.startsWith('http')
          ? data.audio_url
          : `${nlpURL}${data.audio_url}`;

        await audioPlayer.current.play(fullAudioUrl);
        setAudioPlaying(true);

        audioPlayer.current.onEnded(() => {
          setAudioPlaying(false);
        });
      }

      if (onResponseReceived) {
        onResponseReceived(data);
      }

      setChatState('idle');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process recording';
      setError(message);
      setChatState('error');
      if (onError) {
        onError(err instanceof Error ? err : new Error(message));
      }
    } finally {
      setIsProcessing(false);
      voiceRecorder.current = null;
    }
  }, [
    sessionId,
    setSessionId,
    addMessage,
    setChatState,
    setAudioPlaying,
    stopRecordingState,
    nlpURL,
    autoPlayResponse,
    onResponseReceived,
    onError,
  ]);

  // Cancel recording
  const cancelRecording = useCallback(() => {
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
      recordingTimer.current = null;
    }

    if (voiceRecorder.current) {
      voiceRecorder.current.cancel();
      voiceRecorder.current = null;
    }

    cancelRecordingState();
    setRecordingDuration(0);
  }, [cancelRecordingState]);

  // Send text message
  const sendTextMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      try {
        setError(undefined);
        setIsProcessing(true);
        setChatState('processing');

        // Add user message
        addMessage({
          role: 'user',
          content: text,
        });

        // Send to NLP API
        const response = await fetch(`${nlpURL}/conversation/text`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionId,
            question: text,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data: QuestionResponse = await response.json();

        // Update session ID if new
        if (!sessionId && data.session_id) {
          setSessionId(data.session_id);
        }

        // Add assistant message
        addMessage({
          role: 'assistant',
          content: data.answer,
          audioUrl: data.audio_url,
          intent: data.intent,
          artworkId: data.artwork_id,
        });

        // Play audio response
        if (autoPlayResponse && data.audio_url && audioPlayer.current) {
          const fullAudioUrl = data.audio_url.startsWith('http')
            ? data.audio_url
            : `${nlpURL}${data.audio_url}`;

          await audioPlayer.current.play(fullAudioUrl);
          setAudioPlaying(true);

          audioPlayer.current.onEnded(() => {
            setAudioPlaying(false);
          });
        }

        if (onResponseReceived) {
          onResponseReceived(data);
        }

        setChatState('idle');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to send message';
        setError(message);
        setChatState('error');
        if (onError) {
          onError(err instanceof Error ? err : new Error(message));
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [
      sessionId,
      setSessionId,
      addMessage,
      setChatState,
      setAudioPlaying,
      nlpURL,
      autoPlayResponse,
      onResponseReceived,
      onError,
    ]
  );

  // Stop playback
  const stopPlayback = useCallback(() => {
    if (audioPlayer.current) {
      audioPlayer.current.stop();
      setAudioPlaying(false);
    }
  }, [setAudioPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelRecording();
      stopPlayback();
    };
  }, [cancelRecording, stopPlayback]);

  return {
    isRecording: voiceRecorder.current?.isRecording ?? false,
    isProcessing,
    isPlaying: audioPlayer.current?.paused === false,
    recordingDuration,
    startRecording,
    stopRecording,
    cancelRecording,
    sendTextMessage,
    stopPlayback,
    error,
  };
}
