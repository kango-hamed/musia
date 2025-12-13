/**
 * Voice Button Component
 * Voice interaction using Web Speech API + NLP service
 */

import { useCallback } from "react";
import { useChatStore } from "@/stores";
import { useVoiceChat } from "@/hooks/useVoiceChat";

interface VoiceButtonProps {
  onTranscript?: (text: string) => void;
  onResponse?: (response: any) => void;
}

export function VoiceButton({ onTranscript, onResponse }: VoiceButtonProps) {
  const { sessionId } = useChatStore();
  const { isRecording, isProcessing, startRecording, stopRecording } =
    useVoiceChat({ sessionId });

  const handleClick = useCallback(async () => {
    if (isRecording) {
      // Stop recording and process
      const response = await stopRecording();
      if (response) {
        onResponse?.(response);
      }
    } else {
      // Start recording
      const started = await startRecording();
      if (started && onTranscript) {
        // Callback will be triggered when recording completes
      }
    }
  }, [isRecording, startRecording, stopRecording, onTranscript, onResponse]);

  const getButtonState = () => {
    if (isProcessing) return "processing";
    if (isRecording) return "recording";
    return "idle";
  };

  const buttonClasses = {
    idle: "bg-blue-500 hover:bg-blue-600 active:scale-95",
    recording: "bg-red-500 animate-pulse scale-110",
    processing: "bg-yellow-500 cursor-wait",
  };

  const icons = {
    idle: "🎤",
    recording: "⏹",
    processing: "⏳",
  };

  const labels = {
    idle: "Cliquez pour parler",
    recording: "Cliquez pour arrêter",
    processing: "Traitement en cours...",
  };

  const state = getButtonState();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={`
          w-16 h-16 rounded-full
          ${buttonClasses[state]}
          text-white text-2xl
          shadow-lg hover:shadow-xl
          transition-all duration-300
          flex items-center justify-center
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        aria-label={labels[state]}
        title={labels[state]}
      >
        {icons[state]}
      </button>

      {/* Status Label */}
      {(isRecording || isProcessing) && (
        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium animate-fade-in">
          {labels[state]}
        </div>
      )}
    </div>
  );
}
