import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';

function FollowerCamera({ target, followDistance = 3 }) {
  const { camera } = useThree();
  const followerRef = useRef();
  const controlsRef = useRef();
  
  const targetPosition = useRef(new THREE.Vector3());
  const currentPosition = useRef(new THREE.Vector3(0, 1.6, 5));

  useFrame((state, delta) => {
    if (!followerRef.current || !target?.current) return;

    // Position du robot
    const robotPos = target.current.translation();
    targetPosition.current.set(robotPos.x, robotPos.y, robotPos.z);

    // Position actuelle du follower
    const followerPos = followerRef.current.translation();
    currentPosition.current.set(followerPos.x, followerPos.y, followerPos.z);

    // Calculer la direction du robot vers le follower
    const direction = new THREE.Vector3()
      .subVectors(currentPosition.current, targetPosition.current)
      .setY(0);

    const distance = direction.length();

    // Si on est trop loin, se rapprocher
    if (distance > followDistance + 1) {
      direction.normalize().multiplyScalar(-3); // Se rapprocher
      
      followerRef.current.setLinvel({
        x: direction.x,
        y: followerRef.current.linvel().y,
        z: direction.z
      }, true);
    } 
    // Si on est trop proche, s'éloigner
    else if (distance < followDistance - 0.5) {
      direction.normalize().multiplyScalar(2); // S'éloigner
      
      followerRef.current.setLinvel({
        x: direction.x,
        y: followerRef.current.linvel().y,
        z: direction.z
      }, true);
    }
    // Sinon, ralentir progressivement
    else {
      const currentVel = followerRef.current.linvel();
      followerRef.current.setLinvel({
        x: currentVel.x * 0.9,
        y: currentVel.y,
        z: currentVel.z * 0.9
      }, true);
    }

    // Synchroniser la caméra avec le follower
    const position = followerRef.current.translation();
    camera.position.set(position.x, position.y + 0.5, position.z);
  });

  return (
    <>
      {/* Contrôles de la souris pour regarder librement */}
      <PointerLockControls ref={controlsRef} />
      
      {/* Corps invisible du follower avec physique */}
      <RigidBody
        ref={followerRef}
        type="dynamic"
        position={[0, 1.5, 5]}
        mass={1}
        linearDamping={8}
        enabledRotations={[false, false, false]}
        lockRotations
      >
        <CapsuleCollider args={[0.5, 0.3]} />
      </RigidBody>
    </>
  );
}

export default FollowerCamera;
