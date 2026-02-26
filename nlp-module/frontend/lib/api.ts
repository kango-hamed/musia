const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function audioUrl(path: string): string {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
}

export async function startSession(artworkId?: string): Promise<{ session_id: string; message: string; audio_url: string }> {
  const res = await fetch(`${API_BASE}/conversation/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artworkId: artworkId || null }),
  });
  if (!res.ok) throw new Error(`startSession failed: ${res.status}`);
  return res.json();
}

export async function askAudio(
  sessionId: string,
  audioBlob: Blob
): Promise<{ user_input: string; response: string; audio_url: string; intent: string; confidence: number }> {
  const formData = new FormData();
  formData.append("session_id", sessionId);
  formData.append("audio_file", audioBlob, "question.wav");

  const res = await fetch(`${API_BASE}/conversation/ask`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`askAudio failed: ${res.status}`);
  return res.json();
}

export async function askText(
  sessionId: string,
  message: string
): Promise<{ user_input: string; response: string; audio_url: string; intent: string }> {
  const res = await fetch(`${API_BASE}/conversation/text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message }),
  });
  if (!res.ok) throw new Error(`askText failed: ${res.status}`);
  return res.json();
}

export async function getHistory(sessionId: string): Promise<Array<{ user: string; bot: string; intent: string }>> {
  const res = await fetch(`${API_BASE}/conversation/${sessionId}/history`);
  if (!res.ok) throw new Error(`getHistory failed: ${res.status}`);
  return res.json();
}

export async function getVoices(): Promise<Array<{ name: string; locale: string; gender: string }>> {
  const res = await fetch(`${API_BASE}/voices`);
  if (!res.ok) return [];
  return res.json();
}

export async function getArtworks(): Promise<Array<{ id: string; title: string; artist: string }>> {
  const res = await fetch(`${API_BASE}/artworks`);
  if (!res.ok) return [];
  return res.json();
}
