"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseAudioRecorderReturn {
  isRecording: boolean;
  volumeLevel: number;
  startRecording: () => Promise<boolean>;
  stopRecording: () => void;
  permissionDenied: boolean;
}

export function useAudioRecorder(
  onAudioReady: (blob: Blob) => void
): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // RAF loop — reads volume from AnalyserNode at 60fps
  const startVolumeTracking = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (const v of data) sum += Math.abs(v - 128);
      setVolumeLevel(Math.min(1, sum / (data.length * 128) * 6));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopVolumeTracking = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setVolumeLevel(0);
  }, []);

  const startRecording = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Web Audio API setup
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      // MediaRecorder
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        onAudioReady(blob);
        stream.getTracks().forEach((t) => t.stop());
        audioCtx.close();
        streamRef.current = null;
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setPermissionDenied(false);
      startVolumeTracking();
      return true;
    } catch {
      setPermissionDenied(true);
      return false;
    }
  }, [onAudioReady, startVolumeTracking]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    stopVolumeTracking();
    setIsRecording(false);
  }, [stopVolumeTracking]);

  useEffect(() => () => {
    stopVolumeTracking();
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }, [stopVolumeTracking]);

  return { isRecording, volumeLevel, startRecording, stopRecording, permissionDenied };
}
