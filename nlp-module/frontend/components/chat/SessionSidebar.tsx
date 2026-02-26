"use client";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/stores/sessionStore";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

interface SessionSidebarProps {
  onNewSession: () => void;
}

export function SessionSidebar({ onNewSession }: SessionSidebarProps) {
  const [search, setSearch] = useState("");
  const { sessions, activeSessionId, setActiveSession, deleteSession } = useSessionStore();

  const filtered = sessions.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64 h-full flex flex-col bg-[var(--bg-surface)] border-r border-[var(--border)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[var(--text-primary)]">Conversations</span>
          <button
            onClick={onNewSession}
            className="w-7 h-7 rounded-lg bg-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)]/30 transition-colors"
            title="Nouvelle conversation"
          >
            <Plus size={15} />
          </button>
        </div>
        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.length === 0 && (
          <p className="text-xs text-[var(--text-secondary)] text-center py-8 opacity-60">
            Aucune conversation
          </p>
        )}
        <AnimatePresence>
          {filtered.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className={cn(
                "group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors",
                activeSessionId === session.id
                  ? "bg-[var(--primary)]/15 border border-[var(--primary)]/30"
                  : "hover:bg-[var(--bg-input)]"
              )}
              onClick={() => setActiveSession(session.id)}
            >
              <MessageSquare size={13} className="flex-shrink-0 text-[var(--text-secondary)]" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--text-primary)] truncate">{session.title}</p>
                <p className="text-[10px] text-[var(--text-secondary)]">
                  {session.messages.length} message{session.messages.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                className="opacity-0 group-hover:opacity-100 text-[var(--text-secondary)] hover:text-red-400 transition-all"
              >
                <Trash2 size={13} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border)]">
        <p className="text-[10px] text-[var(--text-secondary)] text-center opacity-50">Musia — Agent Culturel IA</p>
      </div>
    </div>
  );
}
