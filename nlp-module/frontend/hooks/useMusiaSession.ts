"use client";
import { askAudio, askText, audioUrl, startSession } from "@/lib/api";
import { playAudioUrl } from "@/lib/audio";
import { useSessionStore } from "@/stores/sessionStore";
import type { AgentState, Message } from "@/types";
import { useCallback, useRef, useState } from "react";

function makeId() {
  return Math.random().toString(36).slice(2);
}

interface UseMusiaSessionReturn {
  sessionId: string | null;
  appState: AgentState;
  messages: Message[];
  isReady: boolean;
  initSession: (artworkId?: string) => Promise<void>;
  sendAudio: (blob: Blob) => Promise<void>;
  sendText: (text: string) => Promise<void>;
}

export function useMusiaSession(): UseMusiaSessionReturn {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [appState, setAppState] = useState<AgentState>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isReady, setIsReady] = useState(false);
  const localSessionRef = useRef<string | null>(null);
  const addSession = useSessionStore((s) => s.addSession);
  const addMessage = useSessionStore((s) => s.addMessage);
  const storeSessionId = useRef<string | null>(null);

  const pushMessage = useCallback((msg: Message, storeId: string) => {
    setMessages((prev) => [...prev, msg]);
    addMessage(storeId, msg);
  }, [addMessage]);

  const initSession = useCallback(async (artworkId?: string) => {
    try {
      setAppState("thinking");
      const data = await startSession(artworkId);
      setSessionId(data.session_id);
      localSessionRef.current = data.session_id;

      const storeId = makeId();
      storeSessionId.current = storeId;

      addSession({
        id: storeId,
        sessionId: data.session_id,
        title: "Nouvelle conversation",
        createdAt: new Date(),
        messages: [],
      });

      if (data.message) {
        const welcomeMsg: Message = {
          id: makeId(),
          role: "agent",
          content: data.message,
          audioUrl: data.audio_url,
          timestamp: new Date(),
          type: "text",
        };
        pushMessage(welcomeMsg, storeId);

        if (data.audio_url) {
          setAppState("speaking");
          await playAudioUrl(audioUrl(data.audio_url));
        }
      }
      setIsReady(true);
      setAppState("idle");
    } catch (err) {
      console.error("initSession failed", err);
      setAppState("idle");
    }
  }, [addSession, pushMessage]);

  const sendAudio = useCallback(async (blob: Blob) => {
    const sid = localSessionRef.current;
    const storeId = storeSessionId.current;
    if (!sid || !storeId) return;
    try {
      setAppState("thinking");
      const data = await askAudio(sid, blob);

      const userMsg: Message = { id: makeId(), role: "user", content: data.user_input, timestamp: new Date(), type: "audio" };
      const agentMsg: Message = { id: makeId(), role: "agent", content: data.response, audioUrl: data.audio_url, intent: data.intent, confidence: data.confidence, timestamp: new Date(), type: "text" };

      pushMessage(userMsg, storeId);
      pushMessage(agentMsg, storeId);

      if (data.audio_url) {
        setAppState("speaking");
        await playAudioUrl(audioUrl(data.audio_url));
      }
      setAppState("idle");
    } catch (err) {
      console.error("sendAudio failed", err);
      setAppState("idle");
    }
  }, [pushMessage]);

  const sendText = useCallback(async (text: string) => {
    const sid = localSessionRef.current;
    const storeId = storeSessionId.current;
    if (!sid || !storeId || !text.trim()) return;
    try {
      const userMsg: Message = { id: makeId(), role: "user", content: text, timestamp: new Date(), type: "text" };
      pushMessage(userMsg, storeId);
      setAppState("thinking");

      const data = await askText(sid, text);
      const agentMsg: Message = { id: makeId(), role: "agent", content: data.response, audioUrl: data.audio_url, intent: data.intent, timestamp: new Date(), type: "text" };
      pushMessage(agentMsg, storeId);

      if (data.audio_url) {
        setAppState("speaking");
        await playAudioUrl(audioUrl(data.audio_url));
      }
      setAppState("idle");
    } catch (err) {
      console.error("sendText failed", err);
      setAppState("idle");
    }
  }, [pushMessage]);

  return { sessionId, appState, messages, isReady, initSession, sendAudio, sendText };
}
