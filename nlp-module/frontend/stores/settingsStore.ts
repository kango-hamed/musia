import type { Settings } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState extends Settings {
  setTheme: (theme: Settings["theme"]) => void;
  setVoice: (voice: Partial<Settings["voice"]>) => void;
  setMicDevice: (id: string | null) => void;
  setVadEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      voice: {
        voice: "fr-FR-DeniseNeural",
        speed: 1.0,
        language: "fr",
      },
      micDeviceId: null,
      vadEnabled: false,
      setTheme: (theme) => set({ theme }),
      setVoice: (voice) =>
        set((state) => ({ voice: { ...state.voice, ...voice } })),
      setMicDevice: (micDeviceId) => set({ micDeviceId }),
      setVadEnabled: (vadEnabled) => set({ vadEnabled }),
    }),
    { name: "musia-settings" }
  )
);
