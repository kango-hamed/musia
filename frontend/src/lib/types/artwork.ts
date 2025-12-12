// Artwork type matching backend API response
export interface Artwork {
  id: string;
  code: string;
  title: string;
  artist: string;
  description?: string;
  period?: string;
  style?: string;
  collection?: string;
  positionX?: number;
  positionY?: number;
  floor?: number;
  room?: string;
  orientation?: number;
  imageUrl?: string;
  narrativeContents?: NarrativeContent[];
  createdAt?: string;
  updatedAt?: string;
}

export interface NarrativeContent {
  id: string;
  artworkId: string;
  version: "standard" | "kids" | "expert";
  language: string;
  textContent: string;
  audioUrl?: string;
  duration?: number;
}
