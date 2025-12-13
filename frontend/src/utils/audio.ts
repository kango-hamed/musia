/**
 * Audio Utilities
 * Helper functions for audio management and playback
 */

import { AUDIO_CONFIG } from '@/constants/museum';

/**
 * Create audio context
 */
export function createAudioContext(): AudioContext {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  return new AudioContextClass();
}

/**
 * Unlock audio on mobile devices (requires user gesture)
 */
export async function unlockAudio(audioContext: AudioContext): Promise<void> {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  // Play silent sound to unlock
  const buffer = audioContext.createBuffer(1, 1, 22050);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}

/**
 * Load audio buffer from URL
 */
export async function loadAudioBuffer(
  url: string,
  audioContext: AudioContext
): Promise<AudioBuffer> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}

/**
 * Create audio player with fade in/out
 */
export class AudioPlayer {
  private audio: HTMLAudioElement;
  private gainNode?: GainNode;
  private audioContext?: AudioContext;
  private source?: MediaElementAudioSourceNode;

  constructor(url?: string, audioContext?: AudioContext) {
    this.audio = new Audio(url);
    this.audioContext = audioContext;

    if (audioContext) {
      this.gainNode = audioContext.createGain();
      this.source = audioContext.createMediaElementSource(this.audio);
      this.source.connect(this.gainNode);
      this.gainNode.connect(audioContext.destination);
    }
  }

  async play(url?: string): Promise<void> {
    if (url) {
      this.audio.src = url;
    }

    this.audio.volume = AUDIO_CONFIG.defaultVolume;

    try {
      await this.audio.play();
    } catch (error) {
      console.error('Audio playback failed:', error);
      throw error;
    }
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  async fadeIn(duration: number = AUDIO_CONFIG.fadeInDuration): Promise<void> {
    if (!this.gainNode || !this.audioContext) {
      return;
    }

    const currentTime = this.audioContext.currentTime;
    this.gainNode.gain.setValueAtTime(0, currentTime);
    this.gainNode.gain.linearRampToValueAtTime(
      AUDIO_CONFIG.defaultVolume,
      currentTime + duration / 1000
    );
  }

  async fadeOut(duration: number = AUDIO_CONFIG.fadeOutDuration): Promise<void> {
    if (!this.gainNode || !this.audioContext) {
      return;
    }

    const currentTime = this.audioContext.currentTime;
    this.gainNode.gain.setValueAtTime(
      this.gainNode.gain.value,
      currentTime
    );
    this.gainNode.gain.linearRampToValueAtTime(
      0,
      currentTime + duration / 1000
    );

    // Stop after fade out
    setTimeout(() => {
      this.stop();
    }, duration);
  }

  setVolume(volume: number): void {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  setPlaybackRate(rate: number): void {
    this.audio.playbackRate = rate;
  }

  get currentTime(): number {
    return this.audio.currentTime;
  }

  set currentTime(time: number) {
    this.audio.currentTime = time;
  }

  get duration(): number {
    return this.audio.duration;
  }

  get paused(): boolean {
    return this.audio.paused;
  }

  get ended(): boolean {
    return this.audio.ended;
  }

  onEnded(callback: () => void): void {
    this.audio.onended = callback;
  }

  onTimeUpdate(callback: () => void): void {
    this.audio.ontimeupdate = callback;
  }

  onError(callback: (error: Error) => void): void {
    this.audio.onerror = () => {
      callback(new Error('Audio loading failed'));
    };
  }

  destroy(): void {
    this.stop();
    this.audio.src = '';
    if (this.source) {
      this.source.disconnect();
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
    }
  }
}

/**
 * Voice recorder using MediaRecorder API
 */
export class VoiceRecorder {
  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private stream?: MediaStream;

  async start(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }

  stop(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recorder initialized'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.cleanup();
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  cancel(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
    this.cleanup();
  }

  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = undefined;
    }
    this.audioChunks = [];
    this.mediaRecorder = undefined;
  }

  get isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
}

/**
 * Format duration in seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Check if browser supports Web Audio API
 */
export function supportsWebAudio(): boolean {
  return !!(window.AudioContext || (window as any).webkitAudioContext);
}

/**
 * Check if browser supports MediaRecorder
 */
export function supportsMediaRecorder(): boolean {
  return !!window.MediaRecorder;
}

/**
 * Check if browser supports Web Speech API
 */
export function supportsWebSpeech(): boolean {
  return !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition);
}

/**
 * Request microphone permission
 */
export async function requestMicrophonePermission(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch (error) {
    console.error('Microphone permission denied:', error);
    return false;
  }
}

/**
 * Convert blob to base64
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Calculate audio volume from frequency data
 */
export function calculateVolume(dataArray: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }
  return sum / dataArray.length / 255;
}

/**
 * Create audio visualizer
 */
export function createAudioVisualizer(
  audioContext: AudioContext,
  source: MediaElementAudioSourceNode
): AnalyserNode {
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  return analyser;
}

/**
 * Preload audio files
 */
export async function preloadAudio(urls: string[]): Promise<void> {
  const promises = urls.map(
    (url) =>
      new Promise<void>((resolve, reject) => {
        const audio = new Audio();
        audio.oncanplaythrough = () => resolve();
        audio.onerror = reject;
        audio.src = url;
      })
  );

  await Promise.all(promises);
}
