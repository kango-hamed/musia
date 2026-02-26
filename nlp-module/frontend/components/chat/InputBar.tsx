"use client";
import { cn } from "@/lib/utils";
import type { AgentState } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, MicOff, Send, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface InputBarProps {
  appState: AgentState;
  isReady: boolean;
  permissionDenied: boolean;
  isRecording: boolean;
  volumeLevel: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSendText: (text: string) => void;
}

export function InputBar({
  appState,
  isReady,
  permissionDenied,
  isRecording,
  volumeLevel,
  onStartRecording,
  onStopRecording,
  onSendText,
}: InputBarProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isBusy = appState === "thinking" || appState === "speaking";

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [text]);

  // Spacebar shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body && !isBusy && isReady) {
        e.preventDefault();
        onStartRecording();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && isRecording) {
        e.preventDefault();
        onStopRecording();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => { window.removeEventListener("keydown", handleKeyDown); window.removeEventListener("keyup", handleKeyUp); };
  }, [isBusy, isReady, isRecording, onStartRecording, onStopRecording]);

  const handleSend = () => {
    if (!text.trim() || isBusy || !isReady) return;
    onSendText(text.trim());
    setText("");
  };

  return (
    <div className="border-t border-[var(--border)] bg-[var(--bg-base)] p-4">
      {permissionDenied && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <MicOff size={14} />
          Microphone refusé — utilisez le mode texte ci-dessous.
        </div>
      )}

      <div className="flex items-end gap-3 max-w-3xl mx-auto">
        {/* Hold-to-talk mic button */}
        <motion.button
          onPointerDown={onStartRecording}
          onPointerUp={onStopRecording}
          onPointerLeave={() => { if (isRecording) onStopRecording(); }}
          disabled={isBusy || !isReady}
          whileTap={{ scale: 0.93 }}
          aria-label={isRecording ? "Arrêter l'enregistrement" : "Maintenir pour parler"}
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 border",
            isRecording
              ? "bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/40"
              : "bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]",
            (isBusy || !isReady) && "opacity-40 cursor-not-allowed"
          )}
        >
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div key="stop" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Square size={16} fill="currentColor" />
              </motion.div>
            ) : (
              <motion.div key="mic" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Mic size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            disabled={isBusy || !isReady}
            placeholder={
              isRecording
                ? "Enregistrement en cours..."
                : isReady
                ? "Écrivez votre question... (ou maintenez le micro)"
                : "Initialisation de Musia..."
            }
            rows={1}
            className={cn(
              "w-full resize-none rounded-2xl px-4 py-3 pr-12 text-sm",
              "bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)]",
              "placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)]",
              "transition-all duration-150 leading-relaxed",
              (isBusy || !isReady) && "opacity-60 cursor-not-allowed"
            )}
          />
          <button
            onClick={handleSend}
            disabled={!text.trim() || isBusy || !isReady}
            className={cn(
              "absolute right-3 bottom-3 w-7 h-7 rounded-full flex items-center justify-center transition-all",
              text.trim() && !isBusy && isReady
                ? "bg-[var(--primary)] text-white hover:brightness-110"
                : "text-[var(--text-secondary)] opacity-40 cursor-not-allowed"
            )}
          >
            <Send size={13} />
          </button>
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-[10px] text-[var(--text-secondary)] mt-2 opacity-50">
        Maintenez <kbd className="px-1 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border)] font-mono">Espace</kbd> pour parler
      </p>
    </div>
  );
}
