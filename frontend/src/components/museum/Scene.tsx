import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Artworks } from "./Artworks";
import { CameraController } from "./CameraController";
import { Lighting } from "./Lighting";
import { MuseumRoom } from "./MuseumRoom";
import { RobotGuide } from "./RobotGuide";

interface SceneProps {
  className?: string;
}

export function Scene({ className }: SceneProps) {
  return (
    <Canvas
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      camera={{ position: [0, 2, 8], fov: 60 }}
      shadows
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
        <Suspense fallback={null}>
          {/* Lighting */}
          <Lighting />

          {/* Environment */}
          <fog attach="fog" args={["#f5f5f5", 10, 50]} />

          {/* Museum Content */}
          <MuseumRoom />
          <Artworks />
          <RobotGuide />

          {/* Camera Controls */}
          <CameraController />
        </Suspense>
    </Canvas>
  );
}
