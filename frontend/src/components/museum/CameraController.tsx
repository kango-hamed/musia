import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useMuseumStore } from "../../lib/stores";

export function CameraController() {
  const { robotPosition } = useMuseumStore();
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Camera offset from robot
  const cameraOffset = new THREE.Vector3(0, 3, 6);
  const lookOffset = new THREE.Vector3(0, 1, 0);

  useFrame((_state, delta) => {
    if (!controlsRef.current) return;

    // Calculate target camera position (behind and above robot)
    const targetCameraPos = robotPosition.clone().add(cameraOffset);

    // Smoothly move camera towards target
    camera.position.lerp(targetCameraPos, delta * 2);

    // Update orbit controls target to follow robot
    const targetLookAt = robotPosition.clone().add(lookOffset);
    controlsRef.current.target.lerp(targetLookAt, delta * 2);

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={3}
      maxDistance={15}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      dampingFactor={0.05}
      enableDamping
    />
  );
}
