"use client";
import type { AgentState } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

interface VoiceOrbProps {
  state: AgentState;
  volumeLevel?: number;
}

const stateConfig = {
  idle: {
    gradient: ["#5E6AD2", "#8B5CF6", "#3B82F6"],
    scale: 1,
    glow: "rgba(94,106,210,0.4)",
  },
  recording: {
    gradient: ["#EF4444", "#F97316", "#EF4444"],
    scale: 1,
    glow: "rgba(239,68,68,0.5)",
  },
  thinking: {
    gradient: ["#5E6AD2", "#06B6D4", "#8B5CF6"],
    scale: 1,
    glow: "rgba(6,182,212,0.4)",
  },
  speaking: {
    gradient: ["#10B981", "#06B6D4", "#3B82F6"],
    scale: 1,
    glow: "rgba(16,185,129,0.4)",
  },
};

export function VoiceOrb({ state, volumeLevel = 0 }: VoiceOrbProps) {
  const cfg = stateConfig[state];
  const dynamicScale = state === "recording" ? 1 + volumeLevel * 0.35 : 1;

  return (
    <div className="relative flex items-center justify-center w-48 h-48 select-none">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: `0 0 ${40 + volumeLevel * 60}px 8px ${cfg.glow}`,
          scale: dynamicScale,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />

      {/* Breathing outer ring */}
      <motion.div
        className="absolute inset-[-12px] rounded-full border border-white/10"
        animate={
          state === "idle"
            ? { scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }
            : state === "thinking"
            ? { rotate: 360 }
            : { scale: 1, opacity: 0.2 }
        }
        transition={
          state === "thinking"
            ? { duration: 2, repeat: Infinity, ease: "linear" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Orbital dots for thinking */}
      <AnimatePresence>
        {state === "thinking" && (
          <>
            {[0, 120, 240].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-cyan-400"
                style={{ originX: "50%", originY: "50%" }}
                initial={{ opacity: 0, rotate: deg, translateX: 68 }}
                animate={{ opacity: 1, rotate: deg + 360, translateX: 68 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.15,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main orb */}
      <motion.div
        className="relative w-36 h-36 rounded-full overflow-hidden cursor-pointer"
        animate={{ scale: dynamicScale }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          background: `radial-gradient(circle at 35% 35%, ${cfg.gradient[0]}, ${cfg.gradient[1]} 50%, ${cfg.gradient[2]})`,
        }}
      >
        {/* Inner shimmer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.25) 0%, transparent 60%)",
          }}
          animate={
            state === "speaking"
              ? { opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.05, 0.9] }
              : { opacity: 0.4 }
          }
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ripple for recording */}
        <AnimatePresence>
          {state === "recording" && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/30"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* State label */}
      <div className="absolute -bottom-7 text-xs font-medium tracking-widest uppercase opacity-60 text-[--text-secondary]">
        {state === "idle" && "En attente"}
        {state === "recording" && "Écoute..."}
        {state === "thinking" && "Réflexion..."}
        {state === "speaking" && "Parole..."}
      </div>
    </div>
  );
}
