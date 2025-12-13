import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3, Group } from "three";
import { useTourStore } from "@/stores";
import { ROBOT_CONFIG } from "@/constants/museum";

interface RobotGuideProps {
  position?: [number, number, number];
}

export function RobotGuide({
  position = ROBOT_CONFIG.initialPosition,
}: RobotGuideProps) {
  const groupRef = useRef<Group>(null);

  const {
    currentWaypoint,
    isPlaying,
    isPaused,
    nextStep,
    robotPosition,
    setRobotPosition,
    setRobotMoving,
    isRobotSpeaking,
  } = useTourStore();

  const targetPosition = useRef(new Vector3(...robotPosition));
  const currentPosition = useRef(new Vector3(...position));
  const timeAtWaypoint = useRef(0);

  // Update target when waypoint changes
  useEffect(() => {
    if (currentWaypoint) {
      targetPosition.current.set(...currentWaypoint.position);
    }
  }, [currentWaypoint]);

  // Animation loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Always show idle animations even when not in a tour
    if (!isPlaying || isPaused) {
      // Idle bobbing animation when not playing
      if (groupRef.current) {
        groupRef.current.position.y =
          position[1] +
          Math.sin(state.clock.elapsedTime * ROBOT_CONFIG.idleBobSpeed) *
          ROBOT_CONFIG.idleBobAmplitude;
      }
      return;
    }

    const distanceToTarget = currentPosition.current.distanceTo(targetPosition.current);

    if (distanceToTarget > 0.1) {
      // Moving to waypoint
      setRobotMoving(true);

      const direction = new Vector3()
        .subVectors(targetPosition.current, currentPosition.current)
        .normalize();

      const moveDistance = Math.min(ROBOT_CONFIG.movementSpeed * delta, distanceToTarget);
      currentPosition.current.add(direction.multiplyScalar(moveDistance));

      groupRef.current.position.copy(currentPosition.current);

      // Rotate toward movement direction
      const angle = Math.atan2(direction.x, direction.z);
      groupRef.current.rotation.y = angle;

      // Walking animation (bobbing)
      groupRef.current.position.y =
        currentPosition.current.y +
        Math.sin(state.clock.elapsedTime * ROBOT_CONFIG.idleBobSpeed * 2) *
          ROBOT_CONFIG.idleBobAmplitude;

      timeAtWaypoint.current = 0;
    } else {
      // Arrived at waypoint
      setRobotMoving(false);
      timeAtWaypoint.current += delta * 1000; // Convert to ms

      // Idle bobbing animation
      groupRef.current.position.y =
        currentPosition.current.y +
        Math.sin(state.clock.elapsedTime * ROBOT_CONFIG.idleBobSpeed) *
          ROBOT_CONFIG.idleBobAmplitude;

      // Speaking animation
      if (isRobotSpeaking) {
        const talkScale =
          1 + Math.sin(state.clock.elapsedTime * ROBOT_CONFIG.talkingSpeed) *
          ROBOT_CONFIG.talkingAmplitude;
        groupRef.current.scale.y = talkScale;
      } else {
        groupRef.current.scale.y = 1;
      }

      // Auto-advance to next waypoint
      if (timeAtWaypoint.current >= (currentWaypoint?.duration || 3000)) {
        nextStep();
        timeAtWaypoint.current = 0;
      }
    }

    // Update store position
    setRobotPosition(groupRef.current.position.toArray() as [number, number, number]);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
        <meshStandardMaterial
          color={ROBOT_CONFIG.bodyColor}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={ROBOT_CONFIG.headColor}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Eyes (LEDs) */}
      <mesh position={[0.1, 0.75, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color={ROBOT_CONFIG.eyeColor}
          emissive={ROBOT_CONFIG.eyeColor}
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-0.1, 0.75, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color={ROBOT_CONFIG.eyeColor}
          emissive={ROBOT_CONFIG.eyeColor}
          emissiveIntensity={2}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial
          color={ROBOT_CONFIG.headColor}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color={ROBOT_CONFIG.antennaColor}
          emissive={ROBOT_CONFIG.antennaColor}
          emissiveIntensity={1}
        />
      </mesh>

      {/* Base/Wheels */}
      <mesh castShadow position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial
          color="#2c3e50"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Robot light */}
      <pointLight
        position={[0, 1, 0]}
        intensity={ROBOT_CONFIG.lightIntensity}
        distance={ROBOT_CONFIG.lightDistance}
        color={ROBOT_CONFIG.lightColor}
      />
    </group>
  );
}
