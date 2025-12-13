/**
 * use3DInteraction Hook
 * Hook for handling 3D object interactions (hover, click, raycasting)
 */

import { useState, useCallback, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Raycaster, Vector2, Vector3 } from 'three';
import type { Object3D, Intersection } from 'three';
import type { Artwork } from '@/types';
import { useMuseumStore } from '@/stores';

interface InteractionCallbacks {
  onHover?: (artwork: Artwork) => void;
  onUnhover?: () => void;
  onClick?: (artwork: Artwork) => void;
}

interface Use3DInteractionReturn {
  hoveredArtwork: Artwork | null;
  handlePointerMove: (event: PointerEvent) => void;
  handlePointerClick: (event: PointerEvent) => void;
  handlePointerLeave: () => void;
  getIntersectedArtwork: (x: number, y: number) => Artwork | null;
}

export function use3DInteraction(
  callbacks: InteractionCallbacks = {}
): Use3DInteractionReturn {
  const { onHover, onUnhover, onClick } = callbacks;

  const { camera, scene, gl } = useThree();
  const { artworks, selectArtwork } = useMuseumStore();

  const [hoveredArtwork, setHoveredArtwork] = useState<Artwork | null>(null);

  const raycaster = useRef(new Raycaster());
  const pointer = useRef(new Vector2());

  // Get intersected artwork
  const getIntersectedArtwork = useCallback(
    (x: number, y: number): Artwork | null => {
      // Convert screen coordinates to NDC (-1 to +1)
      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((x - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((y - rect.top) / rect.height) * 2 + 1;

      // Update raycaster
      raycaster.current.setFromCamera(pointer.current, camera);

      // Find intersections
      const intersects = raycaster.current.intersectObjects(scene.children, true);

      // Find first artwork intersection
      for (const intersect of intersects) {
        const object = intersect.object;

        // Check if object has artwork ID in userData
        if (object.userData?.artworkId) {
          const artworkId = object.userData.artworkId;
          const artwork = artworks.find((a) => a.id === artworkId);
          if (artwork) {
            return artwork;
          }
        }

        // Check parent objects
        let parent = object.parent;
        while (parent) {
          if (parent.userData?.artworkId) {
            const artworkId = parent.userData.artworkId;
            const artwork = artworks.find((a) => a.id === artworkId);
            if (artwork) {
              return artwork;
            }
          }
          parent = parent.parent;
        }
      }

      return null;
    },
    [camera, scene, artworks, gl]
  );

  // Handle pointer move (hover)
  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const artwork = getIntersectedArtwork(event.clientX, event.clientY);

      if (artwork) {
        // Hovering over artwork
        if (!hoveredArtwork || hoveredArtwork.id !== artwork.id) {
          setHoveredArtwork(artwork);
          if (onHover) {
            onHover(artwork);
          }
          // Change cursor
          gl.domElement.style.cursor = 'pointer';
        }
      } else {
        // Not hovering
        if (hoveredArtwork) {
          setHoveredArtwork(null);
          if (onUnhover) {
            onUnhover();
          }
          gl.domElement.style.cursor = 'default';
        }
      }
    },
    [hoveredArtwork, getIntersectedArtwork, onHover, onUnhover, gl]
  );

  // Handle pointer click
  const handlePointerClick = useCallback(
    (event: PointerEvent) => {
      const artwork = getIntersectedArtwork(event.clientX, event.clientY);

      if (artwork) {
        selectArtwork(artwork);
        if (onClick) {
          onClick(artwork);
        }
      }
    },
    [getIntersectedArtwork, selectArtwork, onClick]
  );

  // Handle pointer leave canvas
  const handlePointerLeave = useCallback(() => {
    if (hoveredArtwork) {
      setHoveredArtwork(null);
      if (onUnhover) {
        onUnhover();
      }
      gl.domElement.style.cursor = 'default';
    }
  }, [hoveredArtwork, onUnhover, gl]);

  return {
    hoveredArtwork,
    handlePointerMove,
    handlePointerClick,
    handlePointerLeave,
    getIntersectedArtwork,
  };
}
