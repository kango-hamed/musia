import { Artwork } from "../types";

const API_BASE = "/api";

export async function getArtworks(): Promise<Artwork[]> {
  const response = await fetch(`${API_BASE}/artworks`);
  if (!response.ok) throw new Error("Failed to fetch artworks");
  const data = await response.json();
  return data.data || data;
}

export async function getArtwork(id: string): Promise<Artwork> {
  const response = await fetch(`${API_BASE}/artworks/${id}`);
  if (!response.ok) throw new Error("Failed to fetch artwork");
  const data = await response.json();
  return data.data || data;
}

export async function getArtworkNarratives(id: string) {
  const response = await fetch(`${API_BASE}/artworks/${id}/narratives`);
  if (!response.ok) throw new Error("Failed to fetch narratives");
  const data = await response.json();
  return data.data || data;
}
