export type AgentState = "idle" | "recording" | "thinking" | "speaking";

export interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  audioUrl?: string;
  intent?: string;
  confidence?: number;
  timestamp: Date;
  type: "text" | "audio";
}

export interface Session {
  id: string;
  sessionId: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}

export interface VoiceSettings {
  voice: string;
  speed: number;
  language: string;
}

export interface Settings {
  theme: "dark" | "light" | "system";
  voice: VoiceSettings;
  micDeviceId: string | null;
  vadEnabled: boolean;
}

export interface ArtworkInfo {
  id: string;
  title: string;
  artist: string;
  year?: string;
  description?: string;
}
