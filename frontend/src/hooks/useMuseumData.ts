/**
 * useMuseumData Hook
 * Hook for fetching and managing museum data (artworks, trajectories)
 */

import { useEffect, useState, useCallback } from 'react';
import { useMuseumStore } from '@/stores';
import type { Artwork, Trajectory } from '@/types';

interface UseMuseumDataOptions {
  autoLoad?: boolean;
  floor?: number;
  room?: string;
}

interface UseMuseumDataReturn {
  artworks: Artwork[];
  trajectories: Trajectory[];
  isLoading: boolean;
  error: string | undefined;
  refetch: () => Promise<void>;
  getArtworkById: (id: string) => Artwork | undefined;
  getTrajectoryById: (id: string) => Trajectory | undefined;
}

export function useMuseumData(
  options: UseMuseumDataOptions = {}
): UseMuseumDataReturn {
  const { autoLoad = true, floor, room } = options;

  const {
    artworks: allArtworks,
    trajectories,
    isLoading,
    error,
    setArtworks,
    setTrajectories,
    setLoading,
    setError,
    getArtworkById,
    getTrajectoryById,
  } = useMuseumStore();

  const [artworks, setFilteredArtworks] = useState<Artwork[]>(allArtworks);

  // Filter artworks based on floor and room
  useEffect(() => {
    let filtered = allArtworks;

    if (floor !== undefined) {
      filtered = filtered.filter((a) => a.floor === floor);
    }

    if (room !== undefined) {
      filtered = filtered.filter((a) => a.room === room);
    }

    setFilteredArtworks(filtered);
  }, [allArtworks, floor, room]);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      // Fetch artworks
      const artworksResponse = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/artworks`
      );

      if (!artworksResponse.ok) {
        throw new Error('Failed to fetch artworks');
      }

      const artworksData = await artworksResponse.json();
      setArtworks(artworksData.data || []);

      // Fetch trajectories
      const trajectoriesResponse = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/trajectories`
      );

      if (!trajectoriesResponse.ok) {
        throw new Error('Failed to fetch trajectories');
      }

      const trajectoriesData = await trajectoriesResponse.json();
      setTrajectories(trajectoriesData.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('Failed to fetch museum data:', err);
    } finally {
      setLoading(false);
    }
  }, [setArtworks, setTrajectories, setLoading, setError]);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad && allArtworks.length === 0) {
      fetchData();
    }
  }, [autoLoad, allArtworks.length, fetchData]);

  return {
    artworks,
    trajectories,
    isLoading,
    error,
    refetch: fetchData,
    getArtworkById,
    getTrajectoryById,
  };
}
