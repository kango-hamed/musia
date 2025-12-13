import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { forwardRef, useEffect, useRef } from 'react';
import * as THREE from 'three';

const PlayerCamera = forwardRef((props, ref) => {
  const { camera } = useThree();
  const playerRef = ref || useRef();
  const controlsRef = useRef();
  
  const moveSpeed = 5;
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'KeyZ':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'KeyQ':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'KeyZ':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'KeyQ':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!playerRef.current) return;

    // Calculer la direction de mouvement basée sur la caméra
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(
      0,
      0,
      (keys.current.backward ? 1 : 0) - (keys.current.forward ? 1 : 0)
    );
    const sideVector = new THREE.Vector3(
      (keys.current.left ? 1 : 0) - (keys.current.right ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(moveSpeed)
      .applyEuler(camera.rotation);

    // Appliquer le mouvement au RigidBody
    const linvel = playerRef.current.linvel();
    playerRef.current.setLinvel({
      x: direction.x,
      y: linvel.y, // Garder la gravité
      z: direction.z
    }, true);

    // Synchroniser la caméra avec le RigidBody
    const position = playerRef.current.translation();
    camera.position.set(position.x, position.y + 0.5, position.z);
  });

  return (
    <>
      {/* Contrôles de la souris */}
      <PointerLockControls ref={controlsRef} />
      
      {/* Corps du joueur (capsule invisible) */}
      <RigidBody
        ref={playerRef}
        colliders="ball"
        mass={1}
        type="dynamic"
        position={[0, 1.6, 5]}
        enabledRotations={[false, false, false]}
        linearDamping={8}
        lockRotations
      >
        <CapsuleCollider args={[0.5, 0.3]} />
      </RigidBody>
    </>
  );
});

PlayerCamera.displayName = 'PlayerCamera';

export default PlayerCamera;
