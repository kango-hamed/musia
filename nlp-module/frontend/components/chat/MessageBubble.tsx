"use client";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";
import { motion } from "framer-motion";
import { Check, Copy, Mic } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const copyText = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("flex gap-3 group", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mt-1",
          isUser
            ? "bg-[var(--primary)] text-white"
            : "bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--primary)]"
        )}
      >
        {isUser ? "V" : "M"}
      </div>

      {/* Bubble */}
      <div className={cn("max-w-[75%] flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-[var(--primary)] text-white rounded-tr-sm"
              : "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-sm"
          )}
        >
          {isUser ? (
            <span className="flex items-center gap-2">
              {message.type === "audio" && <Mic size={12} className="opacity-60" />}
              {message.content}
            </span>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ children }) => (
                  <code className="bg-black/30 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                ),
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noreferrer" className="underline opacity-80">{children}</a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Meta + copy */}
        <div className={cn("flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity", isUser ? "flex-row-reverse" : "flex-row")}>
          <span className="text-[10px] text-[var(--text-secondary)]">
            {message.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </span>
          {!isUser && (
            <button onClick={copyText} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          )}
          {message.intent && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] font-medium">
              {message.intent}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
