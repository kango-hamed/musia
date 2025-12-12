export function Lighting() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.5} />

      {/* Main directional light (sun-like) */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Spotlights for artworks (will be positioned dynamically) */}
      <spotLight
        position={[-5, 5, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.6}
        castShadow
        color="#fff5e6"
      />
      <spotLight
        position={[5, 5, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.6}
        castShadow
        color="#fff5e6"
      />
      <spotLight
        position={[0, 5, -5]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.6}
        castShadow
        color="#fff5e6"
      />

      {/* Fill light from below for softer shadows */}
      <hemisphereLight args={["#ffffff", "#e0e0e0", 0.3]} />
    </>
  );
}
