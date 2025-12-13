/**
 * Positioning Utilities
 * Helper functions for artwork and object positioning in museum space
 */

import { Vector3 } from 'three';
import type { Artwork, Orientation, Waypoint } from '@/types';
import {
  calculateArtworkPosition,
  calculateViewPosition,
  calculateLookAtTarget,
} from './3d';

/**
 * Generate waypoints from trajectory steps
 */
export function generateWaypointsFromArtworks(
  artworks: Artwork[],
  stopDuration: number = 5000
): Waypoint[] {
  const waypoints: Waypoint[] = [];

  artworks.forEach((artwork) => {
    const viewPosition = calculateViewPosition(artwork);
    const lookAt = calculateLookAtTarget(artwork);

    waypoints.push({
      position: viewPosition.toArray() as [number, number, number],
      lookAt: lookAt.toArray() as [number, number, number],
      artworkId: artwork.id,
      duration: stopDuration,
      isTransition: false,
    });
  });

  return waypoints;
}

/**
 * Insert transition waypoints between artworks
 */
export function insertTransitionWaypoints(
  waypoints: Waypoint[],
  transitionDuration: number = 2000
): Waypoint[] {
  const result: Waypoint[] = [];

  for (let i = 0; i < waypoints.length; i++) {
    result.push(waypoints[i]);

    // Add transition between this and next waypoint
    if (i < waypoints.length - 1) {
      const current = new Vector3(...waypoints[i].position);
      const next = new Vector3(...waypoints[i + 1].position);

      // Midpoint between artworks
      const midpoint = new Vector3().lerpVectors(current, next, 0.5);

      result.push({
        position: midpoint.toArray() as [number, number, number],
        lookAt: waypoints[i + 1].lookAt,
        duration: transitionDuration,
        isTransition: true,
      });
    }
  }

  return result;
}

/**
 * Calculate optimal grid positions for artworks
 */
export function calculateGridPositions(
  count: number,
  spacing: number = 3,
  wallLength: number = 30
): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  const perRow = Math.floor(wallLength / spacing);
  const rows = Math.ceil(count / perRow);

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;

    const x = (col - perRow / 2) * spacing;
    const y = 2.5 + row * 3; // Default height + row offset

    positions.push({ x, y });
  }

  return positions;
}

/**
 * Distribute artworks evenly on a wall
 */
export function distributeOnWall(
  artworkIds: string[],
  orientation: Orientation,
  startX: number,
  spacing: number = 3,
  height: number = 2.5
): Array<{ id: string; x: number; y: number; orientation: Orientation }> {
  return artworkIds.map((id, index) => ({
    id,
    x: startX + index * spacing,
    y: height,
    orientation,
  }));
}

/**
 * Calculate bounding box for artworks
 */
export function calculateArtworksBounds(artworks: Artwork[]): {
  min: Vector3;
  max: Vector3;
  center: Vector3;
} {
  if (artworks.length === 0) {
    return {
      min: new Vector3(),
      max: new Vector3(),
      center: new Vector3(),
    };
  }

  const positions = artworks.map((a) => calculateArtworkPosition(a));

  const min = new Vector3(
    Math.min(...positions.map((p) => p.x)),
    Math.min(...positions.map((p) => p.y)),
    Math.min(...positions.map((p) => p.z))
  );

  const max = new Vector3(
    Math.max(...positions.map((p) => p.x)),
    Math.max(...positions.map((p) => p.y)),
    Math.max(...positions.map((p) => p.z))
  );

  const center = new Vector3().addVectors(min, max).multiplyScalar(0.5);

  return { min, max, center };
}

/**
 * Find nearest artwork to a position
 */
export function findNearestArtwork(
  position: Vector3,
  artworks: Artwork[]
): Artwork | null {
  if (artworks.length === 0) return null;

  let nearest = artworks[0];
  let minDistance = position.distanceTo(calculateArtworkPosition(artworks[0]));

  for (let i = 1; i < artworks.length; i++) {
    const distance = position.distanceTo(calculateArtworkPosition(artworks[i]));
    if (distance < minDistance) {
      minDistance = distance;
      nearest = artworks[i];
    }
  }

  return nearest;
}

/**
 * Get artworks within radius of position
 */
export function getArtworksInRadius(
  position: Vector3,
  artworks: Artwork[],
  radius: number
): Artwork[] {
  return artworks.filter((artwork) => {
    const artworkPos = calculateArtworkPosition(artwork);
    return position.distanceTo(artworkPos) <= radius;
  });
}

/**
 * Sort artworks by distance from position
 */
export function sortByDistance(
  position: Vector3,
  artworks: Artwork[]
): Artwork[] {
  return [...artworks].sort((a, b) => {
    const distA = position.distanceTo(calculateArtworkPosition(a));
    const distB = position.distanceTo(calculateArtworkPosition(b));
    return distA - distB;
  });
}

/**
 * Group artworks by room
 */
export function groupByRoom(
  artworks: Artwork[]
): Map<string, Artwork[]> {
  const grouped = new Map<string, Artwork[]>();

  artworks.forEach((artwork) => {
    const room = artwork.room || 'default';
    if (!grouped.has(room)) {
      grouped.set(room, []);
    }
    grouped.get(room)!.push(artwork);
  });

  return grouped;
}

/**
 * Group artworks by wall orientation
 */
export function groupByOrientation(
  artworks: Artwork[]
): Map<Orientation, Artwork[]> {
  const grouped = new Map<Orientation, Artwork[]>();

  artworks.forEach((artwork) => {
    if (!grouped.has(artwork.orientation)) {
      grouped.set(artwork.orientation, []);
    }
    grouped.get(artwork.orientation)!.push(artwork);
  });

  return grouped;
}

/**
 * Calculate tour path length
 */
export function calculateTourLength(waypoints: Waypoint[]): number {
  let totalLength = 0;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const current = new Vector3(...waypoints[i].position);
    const next = new Vector3(...waypoints[i + 1].position);
    totalLength += current.distanceTo(next);
  }

  return totalLength;
}

/**
 * Estimate tour duration based on waypoints
 */
export function estimateTourDuration(
  waypoints: Waypoint[],
  walkSpeed: number = 2
): number {
  const pathLength = calculateTourLength(waypoints);
  const walkTime = (pathLength / walkSpeed) * 1000; // Convert to ms

  const stopTime = waypoints.reduce((sum, wp) => sum + wp.duration, 0);

  return walkTime + stopTime;
}

/**
 * Optimize waypoint order (nearest neighbor algorithm)
 */
export function optimizeWaypointOrder(waypoints: Waypoint[]): Waypoint[] {
  if (waypoints.length <= 2) return waypoints;

  const optimized: Waypoint[] = [waypoints[0]];
  const remaining = waypoints.slice(1);

  while (remaining.length > 0) {
    const last = new Vector3(...optimized[optimized.length - 1].position);
    let nearestIndex = 0;
    let minDistance = Infinity;

    remaining.forEach((wp, index) => {
      const distance = last.distanceTo(new Vector3(...wp.position));
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    optimized.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex, 1);
  }

  return optimized;
}

/**
 * Create circular tour path
 */
export function createCircularTour(
  artworks: Artwork[],
  center: Vector3,
  radius: number
): Waypoint[] {
  const waypoints: Waypoint[] = [];
  const angleStep = (Math.PI * 2) / artworks.length;

  artworks.forEach((artwork, index) => {
    const angle = angleStep * index;
    const x = center.x + Math.cos(angle) * radius;
    const z = center.z + Math.sin(angle) * radius;
    const y = artwork.positionY;

    const lookAt = calculateLookAtTarget(artwork);

    waypoints.push({
      position: [x, y, z],
      lookAt: lookAt.toArray() as [number, number, number],
      artworkId: artwork.id,
      duration: 5000,
      isTransition: false,
    });
  });

  return waypoints;
}

/**
 * Validate artwork position (check for overlaps)
 */
export function validateArtworkPosition(
  artwork: Artwork,
  existingArtworks: Artwork[],
  minDistance: number = 2
): boolean {
  const newPos = calculateArtworkPosition(artwork);

  for (const existing of existingArtworks) {
    if (existing.id === artwork.id) continue;
    if (existing.orientation !== artwork.orientation) continue;

    const existingPos = calculateArtworkPosition(existing);
    if (newPos.distanceTo(existingPos) < minDistance) {
      return false;
    }
  }

  return true;
}
