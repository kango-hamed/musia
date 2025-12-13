/**
 * 3D Utilities
 * Helper functions for Three.js mathematics and transformations
 */

import { Vector3, Euler, Quaternion, Matrix4, Box3, Sphere } from 'three';
import type { Artwork, Orientation } from '@/types';
import { ORIENTATION_ANGLES, WALL_OFFSETS, CAMERA_DISTANCES } from '@/constants/museum';

/**
 * Convert orientation string to rotation angle
 */
export function orientationToAngle(orientation: Orientation): number {
  return ORIENTATION_ANGLES[orientation];
}

/**
 * Calculate 3D position for artwork based on museum coordinates
 */
export function calculateArtworkPosition(artwork: Artwork): Vector3 {
  const wallOffset = WALL_OFFSETS[artwork.orientation];

  return new Vector3(
    artwork.positionX + wallOffset.x,
    artwork.positionY,
    wallOffset.z
  );
}

/**
 * Calculate rotation for artwork based on orientation
 */
export function calculateArtworkRotation(artwork: Artwork): Euler {
  const angle = orientationToAngle(artwork.orientation);
  return new Euler(0, angle, 0);
}

/**
 * Calculate optimal camera position for viewing an artwork
 */
export function calculateViewPosition(artwork: Artwork): Vector3 {
  const distance = CAMERA_DISTANCES.artworkView;
  const height = artwork.positionY;
  const angle = orientationToAngle(artwork.orientation);

  // Calculate offset based on wall orientation
  // Camera should be perpendicular to the wall
  const offset = new Vector3(0, 0, distance);
  offset.applyEuler(new Euler(0, angle, 0));

  const artworkPos = calculateArtworkPosition(artwork);

  return new Vector3(
    artworkPos.x + offset.x,
    height,
    artworkPos.z + offset.z
  );
}

/**
 * Calculate camera look-at target for artwork
 */
export function calculateLookAtTarget(artwork: Artwork): Vector3 {
  const artworkPos = calculateArtworkPosition(artwork);
  return new Vector3(artworkPos.x, artwork.positionY, artworkPos.z);
}

/**
 * Linear interpolation between two Vector3 points
 */
export function lerpVector3(start: Vector3, end: Vector3, alpha: number): Vector3 {
  return new Vector3().lerpVectors(start, end, alpha);
}

/**
 * Spherical linear interpolation between two quaternions
 */
export function slerpQuaternion(start: Quaternion, end: Quaternion, alpha: number): Quaternion {
  return new Quaternion().slerpQuaternions(start, end, alpha);
}

/**
 * Calculate distance between two points
 */
export function distance(a: Vector3, b: Vector3): number {
  return a.distanceTo(b);
}

/**
 * Check if point is within bounds
 */
export function isWithinBounds(
  point: Vector3,
  min: Vector3,
  max: Vector3
): boolean {
  return (
    point.x >= min.x &&
    point.x <= max.x &&
    point.y >= min.y &&
    point.y <= max.y &&
    point.z >= min.z &&
    point.z <= max.z
  );
}

/**
 * Clamp a point within bounds
 */
export function clampToBounds(
  point: Vector3,
  min: Vector3,
  max: Vector3
): Vector3 {
  return new Vector3(
    Math.max(min.x, Math.min(max.x, point.x)),
    Math.max(min.y, Math.min(max.y, point.y)),
    Math.max(min.z, Math.min(max.z, point.z))
  );
}

/**
 * Calculate bounding box for an object
 */
export function calculateBoundingBox(object: THREE.Object3D): Box3 {
  const box = new Box3();
  box.setFromObject(object);
  return box;
}

/**
 * Calculate bounding sphere for an object
 */
export function calculateBoundingSphere(object: THREE.Object3D): Sphere {
  const box = calculateBoundingBox(object);
  const sphere = new Sphere();
  box.getBoundingSphere(sphere);
  return sphere;
}

/**
 * Check if two objects collide (sphere-based)
 */
export function checkCollision(
  obj1: THREE.Object3D,
  obj2: THREE.Object3D
): boolean {
  const sphere1 = calculateBoundingSphere(obj1);
  const sphere2 = calculateBoundingSphere(obj2);

  const distance = sphere1.center.distanceTo(sphere2.center);
  return distance < sphere1.radius + sphere2.radius;
}

/**
 * Convert world position to screen coordinates
 */
export function worldToScreen(
  position: Vector3,
  camera: THREE.Camera,
  width: number,
  height: number
): { x: number; y: number } {
  const vector = position.clone().project(camera);

  return {
    x: ((vector.x + 1) / 2) * width,
    y: ((-vector.y + 1) / 2) * height,
  };
}

/**
 * Convert screen coordinates to world position
 */
export function screenToWorld(
  x: number,
  y: number,
  z: number,
  camera: THREE.Camera,
  width: number,
  height: number
): Vector3 {
  const vector = new Vector3(
    (x / width) * 2 - 1,
    -(y / height) * 2 + 1,
    z
  );

  vector.unproject(camera);
  return vector;
}

/**
 * Calculate angle between two vectors (in radians)
 */
export function angleBetween(v1: Vector3, v2: Vector3): number {
  return Math.acos(v1.dot(v2) / (v1.length() * v2.length()));
}

/**
 * Rotate vector around Y axis
 */
export function rotateAroundY(vector: Vector3, angle: number): Vector3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return new Vector3(
    vector.x * cos - vector.z * sin,
    vector.y,
    vector.x * sin + vector.z * cos
  );
}

/**
 * Get direction vector from rotation
 */
export function getDirectionFromRotation(rotation: Euler): Vector3 {
  const direction = new Vector3(0, 0, -1);
  direction.applyEuler(rotation);
  return direction.normalize();
}

/**
 * Calculate smooth damping (exponential decay)
 */
export function smoothDamp(
  current: number,
  target: number,
  velocity: number,
  smoothTime: number,
  deltaTime: number
): { value: number; velocity: number } {
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

  const change = current - target;
  const temp = (velocity + omega * change) * deltaTime;

  velocity = (velocity - omega * temp) * exp;
  const value = target + (change + temp) * exp;

  return { value, velocity };
}

/**
 * Ease in-out cubic function
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Map value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Check if object is in camera frustum
 */
export function isInFrustum(
  object: THREE.Object3D,
  camera: THREE.Camera
): boolean {
  const frustum = new THREE.Frustum();
  const matrix = new Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(matrix);

  const sphere = calculateBoundingSphere(object);
  return frustum.intersectsSphere(sphere);
}

/**
 * Calculate LOD level based on distance
 */
export function calculateLODLevel(
  distance: number,
  levels: number[]
): number {
  for (let i = 0; i < levels.length; i++) {
    if (distance < levels[i]) {
      return i;
    }
  }
  return levels.length - 1;
}

/**
 * Dispose of Three.js object and its resources
 */
export function disposeObject(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }

      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => disposeMaterial(material));
        } else {
          disposeMaterial(child.material);
        }
      }
    }
  });
}

/**
 * Dispose of Three.js material and its textures
 */
function disposeMaterial(material: THREE.Material): void {
  Object.keys(material).forEach((key) => {
    const value = (material as any)[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      // It's a texture
      value.dispose();
    }
  });
  material.dispose();
}
