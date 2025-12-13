import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThirdPersonCamera({ target }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  
  // Distance et hauteur de la caméra par rapport au robot
  const cameraDistance = 8;
  const cameraHeight = 4;

  useFrame(() => {
    if (!target?.current) return;

    // Obtenir la position du robot
    const robotPosition = target.current.translation();
    targetPosition.current.set(robotPosition.x, robotPosition.y, robotPosition.z);

    // Mettre à jour la cible des OrbitControls pour suivre le robot
    if (controlsRef.current) {
      controlsRef.current.target.copy(targetPosition.current);
      controlsRef.current.target.y += 1; // Regarder légèrement au-dessus du robot
      controlsRef.current.update();
    }
  });

  useEffect(() => {
    // Position initiale de la caméra (derrière et au-dessus du robot)
    camera.position.set(0, cameraHeight, cameraDistance);
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false} // Désactiver le déplacement latéral
      enableZoom={true} // Permettre le zoom
      minDistance={3} // Distance minimale
      maxDistance={15} // Distance maximale
      minPolarAngle={Math.PI / 6} // Angle minimal (ne pas aller trop bas)
      maxPolarAngle={Math.PI / 2.5} // Angle maximal (ne pas aller sous le sol)
      enableDamping={true} // Mouvement fluide
      dampingFactor={0.05}
    />
  );
}

export default ThirdPersonCamera;
