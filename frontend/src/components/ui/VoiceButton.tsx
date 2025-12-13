import { useCallback, useState } from "react";

interface VoiceButtonProps {
  onTranscript?: (text: string) => void;
  onResponse?: (response: any) => void;
}

export function VoiceButton({ onTranscript, onResponse }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const NLP_BASE = import.meta.env.VITE_NLP_API_URL || "http://localhost:8000";

  const startListening = useCallback(() => {
    // Check for Web Speech API support
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "fr-FR";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setIsProcessing(true);

      onTranscript?.(transcript);

      try {
        // Send to NLP API
        const response = await fetch(`${NLP_BASE}/conversation/text`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionStorage.getItem("session_id") || "demo",
            message: transcript,
          }),
        });

        const data = await response.json();
        onResponse?.(data);

        // Play audio response if available
        if (data.audio_url) {
          const audio = new Audio(`${NLP_BASE}${data.audio_url}`);
          audio.play();
        }
      } catch (error) {
        console.error("NLP Error:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [NLP_BASE, onTranscript, onResponse]);

  const getButtonState = () => {
    if (isProcessing) return "processing";
    if (isListening) return "listening";
    return "idle";
  };

  const buttonClasses = {
    idle: "bg-blue-500 hover:bg-blue-600",
    listening: "bg-red-500 animate-pulse",
    processing: "bg-yellow-500",
  };

  const icons = {
    idle: "🎤",
    listening: "🔴",
    processing: "⏳",
  };

  const state = getButtonState();

  return (
    <button
      onClick={startListening}
      disabled={isProcessing}
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2
        w-16 h-16 rounded-full
        ${buttonClasses[state]}
        text-white text-2xl
        shadow-lg hover:shadow-xl
        transition-all duration-300
        flex items-center justify-center
        z-50
        disabled:opacity-50
      `}
      aria-label={isListening ? "Listening..." : "Click to speak"}
    >
      {icons[state]}
    </button>
  );
}
