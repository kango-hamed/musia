/**
 * Artwork Service
 * API client for artwork-related endpoints
 */

import { apiClient, retryRequest } from './api';
import type {
  Artwork,
  ArtworkResponse,
  SingleArtworkResponse,
  NarrativeContent,
} from '@/types';

export const artworkService = {
  /**
   * Get all artworks (paginated)
   */
  async getAll(page: number = 1, limit: number = 20): Promise<ArtworkResponse> {
    const response = await retryRequest(() =>
      apiClient.get<ArtworkResponse>('/artworks', {
        params: { page, limit },
      })
    );
    return response.data;
  },

  /**
   * Get single artwork by ID
   */
  async getById(id: string): Promise<Artwork> {
    const response = await retryRequest(() =>
      apiClient.get<SingleArtworkResponse>(`/artworks/${id}`)
    );
    return response.data.data;
  },

  /**
   * Get artwork by code
   */
  async getByCode(code: string): Promise<Artwork> {
    const response = await retryRequest(() =>
      apiClient.get<SingleArtworkResponse>(`/artworks/code/${code}`)
    );
    return response.data.data;
  },

  /**
   * Create new artwork (protected)
   */
  async create(artwork: Partial<Artwork>): Promise<Artwork> {
    const response = await apiClient.post<SingleArtworkResponse>('/artworks', artwork);
    return response.data.data;
  },

  /**
   * Update artwork (protected)
   */
  async update(id: string, updates: Partial<Artwork>): Promise<Artwork> {
    const response = await apiClient.patch<SingleArtworkResponse>(
      `/artworks/${id}`,
      updates
    );
    return response.data.data;
  },

  /**
   * Delete artwork (protected)
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/artworks/${id}`);
  },

  /**
   * Upload artwork image (protected)
   */
  async uploadImage(id: string, imageFile: File): Promise<Artwork> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await apiClient.post<SingleArtworkResponse>(
      `/artworks/${id}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  /**
   * Get narratives for artwork
   */
  async getNarratives(artworkId: string): Promise<NarrativeContent[]> {
    const response = await retryRequest(() =>
      apiClient.get<{ data: NarrativeContent[] }>(`/artworks/${artworkId}/narratives`)
    );
    return response.data.data;
  },

  /**
   * Get specific narrative version
   */
  async getNarrative(
    artworkId: string,
    version: NarrativeContent['version'] = 'standard',
    language: string = 'fr'
  ): Promise<NarrativeContent | null> {
    const narratives = await this.getNarratives(artworkId);
    return (
      narratives.find((n) => n.version === version && n.language === language) || null
    );
  },

  /**
   * Create narrative for artwork (protected)
   */
  async createNarrative(
    artworkId: string,
    narrative: Partial<NarrativeContent>
  ): Promise<NarrativeContent> {
    const response = await apiClient.post<{ data: NarrativeContent }>(
      `/artworks/${artworkId}/narratives`,
      narrative
    );
    return response.data.data;
  },

  /**
   * Get artworks by room
   */
  async getByRoom(room: string): Promise<Artwork[]> {
    const response = await retryRequest(() =>
      apiClient.get<ArtworkResponse>('/artworks', {
        params: { room },
      })
    );
    return response.data.data;
  },

  /**
   * Get artworks by floor
   */
  async getByFloor(floor: number): Promise<Artwork[]> {
    const response = await retryRequest(() =>
      apiClient.get<ArtworkResponse>('/artworks', {
        params: { floor },
      })
    );
    return response.data.data;
  },

  /**
   * Search artworks
   */
  async search(query: string): Promise<Artwork[]> {
    const response = await retryRequest(() =>
      apiClient.get<ArtworkResponse>('/artworks/search', {
        params: { q: query },
      })
    );
    return response.data.data;
  },
};
