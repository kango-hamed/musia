import { RigidBody } from '@react-three/rapier';

function SimpleRoom() {
  const roomSize = 15;
  const wallHeight = 4;
  const wallThickness = 0.5;

  return (
    <group>
      {/* Sol avec physique - BOX au lieu de PLANE pour collision complète */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <boxGeometry args={[roomSize, 0.2, roomSize]} />
          <meshStandardMaterial 
            color="#e8e4d9" 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </RigidBody>

      {/* Mur Nord (fond) - Plus épais et plus haut */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, wallHeight / 2, -roomSize / 2]} receiveShadow castShadow>
          <boxGeometry args={[roomSize + wallThickness * 2, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Mur Sud (devant) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, wallHeight / 2, roomSize / 2]} receiveShadow castShadow>
          <boxGeometry args={[roomSize + wallThickness * 2, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Mur Ouest (gauche) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-roomSize / 2, wallHeight / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[wallThickness, wallHeight, roomSize]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Mur Est (droite) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[roomSize / 2, wallHeight / 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[wallThickness, wallHeight, roomSize]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Plafond */}
      <mesh position={[0, wallHeight, 0]} receiveShadow>
        <boxGeometry args={[roomSize, wallThickness, roomSize]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>

      {/* Barrières invisibles sous le sol (au cas où on tombe) */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -5, 0]} visible={false}>
          <boxGeometry args={[roomSize * 2, 1, roomSize * 2]} />
        </mesh>
      </RigidBody>
    </group>
  );
}

export default SimpleRoom;
