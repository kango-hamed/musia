import { useFrame } from '@react-three/fiber';
import { forwardRef, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTourStore } from '../../store/tourStore';

const RobotGuide = forwardRef((props, ref) => {
  const robotRef = ref || useRef();
  const { waypoints, currentWaypointIndex, isPlaying, isPaused, nextWaypoint } = useTourStore();
  
  const currentWaypoint = waypoints[currentWaypointIndex];
  const targetPosition = useRef(new THREE.Vector3());
  const currentPosition = useRef(new THREE.Vector3(-15, 0, -15)); // Position initiale
  const timeAtWaypoint = useRef(0);
  const movementSpeed = 2; // unités par seconde

  useEffect(() => {
    if (currentWaypoint) {
      targetPosition.current.set(...currentWaypoint.position);
    }
  }, [currentWaypoint]);

  useFrame((state, delta) => {
    if (!robotRef.current || !isPlaying || isPaused) return;

    const distanceToTarget = currentPosition.current.distanceTo(targetPosition.current);

    if (distanceToTarget > 0.1) {
      // Se déplacer vers le waypoint
      const direction = new THREE.Vector3()
        .subVectors(targetPosition.current, currentPosition.current)
        .normalize();
      
      const moveDistance = Math.min(movementSpeed * delta, distanceToTarget);
      currentPosition.current.add(direction.multiplyScalar(moveDistance));
      
      robotRef.current.position.copy(currentPosition.current);
      
      // Rotation vers la direction de mouvement
      const angle = Math.atan2(direction.x, direction.z);
      robotRef.current.rotation.y = angle;
      
      // Animation de "marche" (bobbing)
      robotRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 5) * 0.05;
      
      timeAtWaypoint.current = 0;
    } else {
      // Arrivé au waypoint, attendre
      timeAtWaypoint.current += delta * 1000; // convertir en ms
      
      if (timeAtWaypoint.current >= (currentWaypoint?.duration || 3000)) {
        nextWaypoint();
        timeAtWaypoint.current = 0;
      }
    }
  });

  return (
    <group ref={robotRef} position={[-15, 0.5, -15]}>
      {/* Corps du robot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
        <meshStandardMaterial color="#4a90e2" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Tête */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#357abd" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Yeux (LEDs) */}
      <mesh position={[0.1, 0.75, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.1, 0.75, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
      </mesh>

      {/* Antenne */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#357abd" metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
      </mesh>

      {/* Base/Roues */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Lumière du robot */}
      <pointLight position={[0, 1, 0]} intensity={0.5} distance={5} color="#4a90e2" />
    </group>
  );
});

RobotGuide.displayName = 'RobotGuide';

export default RobotGuide;
