/**
 * Artwork Type Definitions
 * Complete type system for museum artworks
 */

export type Orientation = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export type NarrativeVersion = 'standard' | 'short' | 'detailed' | 'kids';

export type LanguageCode = 'fr' | 'en' | 'es' | 'de' | 'it';

export interface NarrativeContent {
  id: string;
  version: NarrativeVersion;
  language: LanguageCode;
  textContent: string;
  audioUrl?: string;
  duration?: number; // in seconds
  createdAt: string;
  updatedAt: string;
}

export interface Artwork {
  id: string;
  code: string; // Museum internal code
  title: string;
  artist?: string;
  description?: string;

  // Classification
  period?: string; // e.g., "Renaissance", "Impressionism"
  style?: string; // e.g., "Baroque", "Modern"
  collection?: string;

  // Museum positioning
  positionX: number; // X coordinate in museum space
  positionY: number; // Y coordinate (height on wall)
  floor: number;
  room?: string;
  orientation: Orientation; // Which wall the artwork is on

  // Media
  imageUrl?: string;

  // Relations
  narrativeContents?: NarrativeContent[];

  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface ArtworkFrame {
  width: number;
  height: number;
  depth: number;
  color: string;
  materialType: 'wood' | 'metal' | 'ornate';
}

export interface ArtworkInteraction {
  artworkId: string;
  type: 'hover' | 'click' | 'view';
  timestamp: number;
  duration?: number;
}

// API Response types
export interface ArtworkResponse {
  data: Artwork[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SingleArtworkResponse {
  data: Artwork;
}
