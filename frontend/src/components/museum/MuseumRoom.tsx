export function MuseumRoom() {
  // Room dimensions
  const roomWidth = 20;
  const roomLength = 15;
  const roomHeight = 6;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomLength]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, roomHeight / 2, -roomLength / 2]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[roomLength, roomHeight]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[roomLength, roomHeight]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
        <planeGeometry args={[roomWidth, roomLength]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Decorative baseboards */}
      <mesh position={[0, 0.1, -roomLength / 2 + 0.05]}>
        <boxGeometry args={[roomWidth, 0.2, 0.1]} />
        <meshStandardMaterial color="#ddd" />
      </mesh>
      <mesh
        position={[-roomWidth / 2 + 0.05, 0.1, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[roomLength, 0.2, 0.1]} />
        <meshStandardMaterial color="#ddd" />
      </mesh>
      <mesh
        position={[roomWidth / 2 - 0.05, 0.1, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[roomLength, 0.2, 0.1]} />
        <meshStandardMaterial color="#ddd" />
      </mesh>
    </group>
  );
}
