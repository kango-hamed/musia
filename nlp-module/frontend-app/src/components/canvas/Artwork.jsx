import { RigidBody } from '@react-three/rapier';

function Artwork({ position, title, artist }) {
  return (
    <group position={position}>
      {/* Cadre doré */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.2, 1.6, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Toile */}
      <mesh position={[0, 1.5, 0.06]}>
        <boxGeometry args={[1, 1.4, 0.02]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Plaque avec titre */}
      <mesh position={[0, 0.5, 0.05]}>
        <boxGeometry args={[0.8, 0.2, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Support invisible pour collision */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 1, -0.1]} visible={false}>
          <boxGeometry args={[1.5, 2.5, 0.3]} />
        </mesh>
      </RigidBody>
    </group>
  );
}

export default Artwork;
