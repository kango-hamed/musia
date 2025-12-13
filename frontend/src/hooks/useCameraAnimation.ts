/**
 * useCameraAnimation Hook
 * Hook for smooth camera transitions and animations
 */

import { useRef, useCallback, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import type { Camera } from 'three';
import type { Artwork } from '@/types';
import { calculateViewPosition, calculateLookAtTarget, easeInOutCubic } from '@/utils';
import { CAMERA_TRANSITION_DURATION } from '@/constants/museum';

interface CameraTransitionOptions {
  duration?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
  onUpdate?: (progress: number) => void;
}

interface UseCameraAnimationReturn {
  animateToArtwork: (artwork: Artwork, options?: CameraTransitionOptions) => void;
  animateToPosition: (
    position: Vector3,
    lookAt: Vector3,
    options?: CameraTransitionOptions
  ) => void;
  stopAnimation: () => void;
  isAnimating: boolean;
}

export function useCameraAnimation(): UseCameraAnimationReturn {
  const { camera } = useThree();
  const animationRef = useRef<{
    active: boolean;
    startTime: number;
    duration: number;
    startPosition: Vector3;
    targetPosition: Vector3;
    startLookAt: Vector3;
    targetLookAt: Vector3;
    easing: (t: number) => number;
    onComplete?: () => void;
    onUpdate?: (progress: number) => void;
  } | null>(null);

  // Animation loop
  useFrame(() => {
    if (!animationRef.current?.active) return;

    const animation = animationRef.current;
    const elapsed = Date.now() - animation.startTime;
    const progress = Math.min(elapsed / animation.duration, 1);
    const easedProgress = animation.easing(progress);

    // Interpolate position
    const newPosition = new Vector3().lerpVectors(
      animation.startPosition,
      animation.targetPosition,
      easedProgress
    );
    camera.position.copy(newPosition);

    // Interpolate look-at target
    const newLookAt = new Vector3().lerpVectors(
      animation.startLookAt,
      animation.targetLookAt,
      easedProgress
    );
    camera.lookAt(newLookAt);

    // Update callback
    if (animation.onUpdate) {
      animation.onUpdate(progress);
    }

    // Complete animation
    if (progress >= 1) {
      animationRef.current.active = false;
      if (animation.onComplete) {
        animation.onComplete();
      }
    }
  });

  // Animate to artwork
  const animateToArtwork = useCallback(
    (artwork: Artwork, options: CameraTransitionOptions = {}) => {
      const targetPosition = calculateViewPosition(artwork);
      const targetLookAt = calculateLookAtTarget(artwork);

      animateToPosition(targetPosition, targetLookAt, options);
    },
    [camera]
  );

  // Animate to position
  const animateToPosition = useCallback(
    (
      targetPosition: Vector3,
      targetLookAt: Vector3,
      options: CameraTransitionOptions = {}
    ) => {
      const {
        duration = CAMERA_TRANSITION_DURATION,
        easing = easeInOutCubic,
        onComplete,
        onUpdate,
      } = options;

      // Calculate current look-at (approximation)
      const direction = new Vector3();
      camera.getWorldDirection(direction);
      const currentLookAt = camera.position.clone().add(direction.multiplyScalar(10));

      animationRef.current = {
        active: true,
        startTime: Date.now(),
        duration,
        startPosition: camera.position.clone(),
        targetPosition: targetPosition.clone(),
        startLookAt: currentLookAt,
        targetLookAt: targetLookAt.clone(),
        easing,
        onComplete,
        onUpdate,
      };
    },
    [camera]
  );

  // Stop animation
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.active = false;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);

  return {
    animateToArtwork,
    animateToPosition,
    stopAnimation,
    isAnimating: animationRef.current?.active ?? false,
  };
}
