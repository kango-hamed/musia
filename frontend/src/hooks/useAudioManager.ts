/**
 * useAudioManager Hook
 * Hook for managing audio playback with spatial audio support
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { AudioPlayer, createAudioContext, unlockAudio } from '@/utils';
import { AUDIO_CONFIG } from '@/constants/museum';

interface AudioTrack {
  id: string;
  url: string;
  volume?: number;
  loop?: boolean;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

interface UseAudioManagerOptions {
  autoUnlock?: boolean;
  maxConcurrent?: number;
}

interface UseAudioManagerReturn {
  isPlaying: (id: string) => boolean;
  isAnyPlaying: boolean;
  play: (track: AudioTrack) => Promise<void>;
  pause: (id: string) => void;
  stop: (id: string) => void;
  stopAll: () => void;
  setVolume: (id: string, volume: number) => void;
  setMasterVolume: (volume: number) => void;
  getCurrentTime: (id: string) => number | undefined;
  getDuration: (id: string) => number | undefined;
  isUnlocked: boolean;
  unlock: () => Promise<void>;
}

export function useAudioManager(
  options: UseAudioManagerOptions = {}
): UseAudioManagerReturn {
  const { autoUnlock = true, maxConcurrent = 3 } = options;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterVolume, setMasterVolumeState] = useState(AUDIO_CONFIG.defaultVolume);

  const audioContext = useRef<AudioContext | null>(null);
  const players = useRef<Map<string, AudioPlayer>>(new Map());
  const playingTracks = useRef<Set<string>>(new Set());

  // Initialize audio context
  useEffect(() => {
    audioContext.current = createAudioContext();

    return () => {
      // Cleanup all players
      players.current.forEach((player) => player.destroy());
      players.current.clear();
    };
  }, []);

  // Auto-unlock on first user interaction
  useEffect(() => {
    if (autoUnlock && !isUnlocked) {
      const handleInteraction = async () => {
        await unlock();
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
      };

      document.addEventListener('click', handleInteraction);
      document.addEventListener('touchstart', handleInteraction);
      document.addEventListener('keydown', handleInteraction);

      return () => {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
      };
    }
  }, [autoUnlock, isUnlocked]);

  // Unlock audio
  const unlock = useCallback(async () => {
    if (audioContext.current && !isUnlocked) {
      try {
        await unlockAudio(audioContext.current);
        setIsUnlocked(true);
      } catch (err) {
        console.error('Failed to unlock audio:', err);
      }
    }
  }, [isUnlocked]);

  // Check if track is playing
  const isPlaying = useCallback((id: string): boolean => {
    return playingTracks.current.has(id);
  }, []);

  // Check if any track is playing
  const isAnyPlaying = playingTracks.current.size > 0;

  // Play track
  const play = useCallback(
    async (track: AudioTrack) => {
      try {
        // Check max concurrent
        if (playingTracks.current.size >= maxConcurrent) {
          console.warn('Max concurrent audio tracks reached');
          return;
        }

        // Get or create player
        let player = players.current.get(track.id);
        if (!player) {
          player = new AudioPlayer(undefined, audioContext.current || undefined);
          players.current.set(track.id, player);

          // Handle playback end
          player.onEnded(() => {
            playingTracks.current.delete(track.id);
          });
        }

        // Set volume
        const volume = (track.volume ?? 1) * masterVolume;
        player.setVolume(volume);

        // Play
        await player.play(track.url);
        playingTracks.current.add(track.id);

        // Fade in
        if (track.fadeIn && audioContext.current) {
          await player.fadeIn(AUDIO_CONFIG.fadeInDuration);
        }
      } catch (err) {
        console.error('Failed to play audio:', err);
        throw err;
      }
    },
    [masterVolume, maxConcurrent]
  );

  // Pause track
  const pause = useCallback((id: string) => {
    const player = players.current.get(id);
    if (player) {
      player.pause();
      playingTracks.current.delete(id);
    }
  }, []);

  // Stop track
  const stop = useCallback((id: string) => {
    const player = players.current.get(id);
    if (player) {
      player.stop();
      playingTracks.current.delete(id);
    }
  }, []);

  // Stop all tracks
  const stopAll = useCallback(() => {
    players.current.forEach((player, id) => {
      player.stop();
      playingTracks.current.delete(id);
    });
  }, []);

  // Set track volume
  const setVolume = useCallback((id: string, volume: number) => {
    const player = players.current.get(id);
    if (player) {
      player.setVolume(volume * masterVolume);
    }
  }, [masterVolume]);

  // Set master volume
  const setMasterVolume = useCallback((volume: number) => {
    setMasterVolumeState(volume);

    // Update all playing tracks
    players.current.forEach((player) => {
      const currentVolume = player.paused ? 0 : 1;
      player.setVolume(currentVolume * volume);
    });
  }, []);

  // Get current time
  const getCurrentTime = useCallback((id: string): number | undefined => {
    const player = players.current.get(id);
    return player?.currentTime;
  }, []);

  // Get duration
  const getDuration = useCallback((id: string): number | undefined => {
    const player = players.current.get(id);
    return player?.duration;
  }, []);

  return {
    isPlaying,
    isAnyPlaying,
    play,
    pause,
    stop,
    stopAll,
    setVolume,
    setMasterVolume,
    getCurrentTime,
    getDuration,
    isUnlocked,
    unlock,
  };
}
