"use client";
import type { Message } from "@/types";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";

interface ChatAreaProps {
  messages: Message[];
  isThinking: boolean;
}

export function ChatArea({ messages, isThinking }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-6 space-y-5 scrollbar-thin"
      role="log"
      aria-label="Conversation"
      aria-live="polite"
    >
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-40">
          <div className="text-4xl">🎙️</div>
          <p className="text-sm text-[var(--text-secondary)] max-w-xs">
            Maintenez le bouton micro ou appuyez sur <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border)] font-mono text-xs">Espace</kbd> pour parler à Musia.
          </p>
        </div>
      )}

      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </AnimatePresence>

      {isThinking && (
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
            M
          </div>
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
            <Loader2 size={14} className="animate-spin text-[var(--primary)]" />
            <span className="text-xs text-[var(--text-secondary)]">Musia réfléchit...</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
