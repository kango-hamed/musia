import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTourStore } from '../store/tourStore';

export function useFollowCamera(robotRef) {
  const { camera } = useThree();
  const { isPlaying, waypoints, currentWaypointIndex } = useTourStore();
  
  const cameraOffset = new THREE.Vector3(0, 3, 5); // Derrière et au-dessus du robot
  const targetCameraPosition = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();

  useFrame(() => {
    if (!robotRef.current || !isPlaying) return;

    const currentWaypoint = waypoints[currentWaypointIndex];
    if (!currentWaypoint) return;

    // Position de la caméra: derrière le robot
    const robotPosition = robotRef.current.position.clone();
    const robotRotation = robotRef.current.rotation.y;
    
    // Calculer l'offset en fonction de la rotation du robot
    const offsetRotated = cameraOffset.clone();
    offsetRotated.applyAxisAngle(new THREE.Vector3(0, 1, 0), robotRotation);
    
    targetCameraPosition.copy(robotPosition).add(offsetRotated);
    
    // La caméra regarde vers où le robot regarde
    if (currentWaypoint.lookAt) {
      targetLookAt.set(...currentWaypoint.lookAt);
    } else {
      targetLookAt.copy(robotPosition);
    }

    // Smooth camera movement (lerp)
    camera.position.lerp(targetCameraPosition, 0.05);
    
    // Smooth camera rotation
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    currentLookAt.lerp(targetLookAt, 0.05);
    camera.lookAt(currentLookAt);
  });

  return null;
}
