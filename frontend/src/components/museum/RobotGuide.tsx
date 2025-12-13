import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useMuseumStore, useTourStore } from "../../lib/stores";

export function RobotGuide() {
  const meshRef = useRef<THREE.Group>(null);
  const { robotTarget, isRobotMoving, setIsRobotMoving, setRobotPosition } =
    useMuseumStore();
  const { isSpeaking } = useTourStore();

  // Idle animation state
  const [bobOffset, setBobOffset] = useState(0);

  // Target position for smooth movement
  const targetPosition = useRef(new THREE.Vector3(0, 0, 3));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 3));

  // Update target when robotTarget changes
  useEffect(() => {
    if (robotTarget) {
      targetPosition.current.copy(robotTarget);
    }
  }, [robotTarget]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth movement towards target
    const distance = currentPosition.current.distanceTo(targetPosition.current);

    if (distance > 0.1) {
      // Move towards target
      currentPosition.current.lerp(targetPosition.current, delta * 2);
      meshRef.current.position.copy(currentPosition.current);

      // Rotate to face movement direction
      const direction = targetPosition.current
        .clone()
        .sub(currentPosition.current);
      if (direction.length() > 0.01) {
        const angle = Math.atan2(direction.x, direction.z);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          angle,
          delta * 5
        );
      }

      if (!isRobotMoving) setIsRobotMoving(true);
    } else {
      if (isRobotMoving) setIsRobotMoving(false);
    }

    // Idle bobbing animation
    setBobOffset(Math.sin(state.clock.elapsedTime * 2) * 0.05);

    // Speaking animation (subtle head movement)
    if (isSpeaking) {
      meshRef.current.children[0].rotation.x =
        Math.sin(state.clock.elapsedTime * 8) * 0.02;
    }

    // Update store position
    setRobotPosition(currentPosition.current.clone());
  });

  return (
    <group ref={meshRef} position={[0, 0, 3]}>
      {/* Robot Body */}
      <group position={[0, 0.8 + bobOffset, 0]}>
        {/* Head */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color="#34495e"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.08, 0.75, 0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#4A90E2"
            emissive="#4A90E2"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0.08, 0.75, 0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#4A90E2"
            emissive="#4A90E2"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.6, 16]} />
          <meshStandardMaterial
            color="#34495e"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Arms */}
        <mesh
          position={[-0.35, 0.2, 0]}
          rotation={[0, 0, Math.PI / 6]}
          castShadow
        >
          <capsuleGeometry args={[0.06, 0.3, 4, 8]} />
          <meshStandardMaterial
            color="#4a5568"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
        <mesh
          position={[0.35, 0.2, 0]}
          rotation={[0, 0, -Math.PI / 6]}
          castShadow
        >
          <capsuleGeometry args={[0.06, 0.3, 4, 8]} />
          <meshStandardMaterial
            color="#4a5568"
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>

        {/* Base/Wheels (hover pad) */}
        <mesh position={[0, -0.35, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 0.15, 16]} />
          <meshStandardMaterial
            color="#2d3748"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Glow ring under robot */}
        <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.25, 0.35, 32]} />
          <meshBasicMaterial
            color="#4A90E2"
            transparent
            opacity={0.3 + Math.sin(Date.now() * 0.005) * 0.2}
          />
        </mesh>
      </group>
    </group>
  );
}
