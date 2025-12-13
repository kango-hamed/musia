
function MuseumArchitecture() {
  const wallHeight = 5;
  const wallThickness = 0.3;
  const roomSize = 15; // Taille de chaque salle
  const hallwayWidth = 3; // Largeur des passages

  // Configuration des 4 salles en carré
  const rooms = [
    { id: 1, position: [-roomSize/2 - hallwayWidth/2, 0, -roomSize/2 - hallwayWidth/2], name: "Salle 1 - Renaissance" },
    { id: 2, position: [roomSize/2 + hallwayWidth/2, 0, -roomSize/2 - hallwayWidth/2], name: "Salle 2 - Impressionnisme" },
    { id: 3, position: [roomSize/2 + hallwayWidth/2, 0, roomSize/2 + hallwayWidth/2], name: "Salle 3 - Moderne" },
    { id: 4, position: [-roomSize/2 - hallwayWidth/2, 0, roomSize/2 + hallwayWidth/2], name: "Salle 4 - Contemporain" },
  ];

  const Room = ({ position, id }) => {
    const [x, y, z] = position;
    
    return (
      <group position={position}>
        {/* Sol de la salle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshStandardMaterial color="#e8e4d9" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Mur Nord */}
        <mesh position={[0, wallHeight / 2, -roomSize / 2]} receiveShadow>
          <boxGeometry args={[roomSize, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </mesh>

        {/* Mur Sud */}
        <mesh position={[0, wallHeight / 2, roomSize / 2]} receiveShadow>
          <boxGeometry args={[roomSize, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </mesh>

        {/* Mur Ouest */}
        <mesh position={[-roomSize / 2, wallHeight / 2, 0]} receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, roomSize]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </mesh>

        {/* Mur Est */}
        <mesh position={[roomSize / 2, wallHeight / 2, 0]} receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, roomSize]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
        </mesh>

        {/* Plafond */}
        <mesh position={[0, wallHeight, 0]} receiveShadow>
          <boxGeometry args={[roomSize, wallThickness, roomSize]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>
      </group>
    );
  };

  const Hallway = ({ start, end, direction }) => {
    const isHorizontal = direction === 'horizontal';
    const length = isHorizontal ? Math.abs(end[0] - start[0]) : Math.abs(end[2] - start[2]);
    const midX = (start[0] + end[0]) / 2;
    const midZ = (start[2] + end[2]) / 2;

    return (
      <group position={[midX, 0, midZ]}>
        {/* Sol du couloir */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={isHorizontal ? [length, hallwayWidth] : [hallwayWidth, length]} />
          <meshStandardMaterial color="#d4cfc0" roughness={0.8} />
        </mesh>

        {/* Murs du couloir */}
        {isHorizontal ? (
          <>
            <mesh position={[0, wallHeight / 2, -hallwayWidth / 2]} receiveShadow>
              <boxGeometry args={[length, wallHeight, wallThickness]} />
              <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
            </mesh>
            <mesh position={[0, wallHeight / 2, hallwayWidth / 2]} receiveShadow>
              <boxGeometry args={[length, wallHeight, wallThickness]} />
              <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
            </mesh>
          </>
        ) : (
          <>
            <mesh position={[-hallwayWidth / 2, wallHeight / 2, 0]} receiveShadow>
              <boxGeometry args={[wallThickness, wallHeight, length]} />
              <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
            </mesh>
            <mesh position={[hallwayWidth / 2, wallHeight / 2, 0]} receiveShadow>
              <boxGeometry args={[wallThickness, wallHeight, length]} />
              <meshStandardMaterial color="#f5f5f0" roughness={0.9} />
            </mesh>
          </>
        )}

        {/* Plafond du couloir */}
        <mesh position={[0, wallHeight, 0]} receiveShadow>
          <boxGeometry args={isHorizontal ? [length, wallThickness, hallwayWidth] : [hallwayWidth, wallThickness, length]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>
      </group>
    );
  };

  return (
    <group>
      {/* Les 4 salles */}
      {rooms.map(room => (
        <Room key={room.id} position={room.position} id={room.id} />
      ))}

      {/* Couloirs de connexion */}
      {/* Horizontal: Salle 1 ↔ Salle 2 */}
      <Hallway 
        start={[-hallwayWidth/2, 0, -roomSize - hallwayWidth/2]} 
        end={[hallwayWidth/2, 0, -roomSize - hallwayWidth/2]} 
        direction="horizontal" 
      />

      {/* Horizontal: Salle 3 ↔ Salle 4 */}
      <Hallway 
        start={[-hallwayWidth/2, 0, roomSize + hallwayWidth/2]} 
        end={[hallwayWidth/2, 0, roomSize + hallwayWidth/2]} 
        direction="horizontal" 
      />

      {/* Vertical: Salle 1 ↔ Salle 4 */}
      <Hallway 
        start={[-roomSize - hallwayWidth/2, 0, -hallwayWidth/2]} 
        end={[-roomSize - hallwayWidth/2, 0, hallwayWidth/2]} 
        direction="vertical" 
      />

      {/* Vertical: Salle 2 ↔ Salle 3 */}
      <Hallway 
        start={[roomSize + hallwayWidth/2, 0, -hallwayWidth/2]} 
        end={[roomSize + hallwayWidth/2, 0, hallwayWidth/2]} 
        direction="vertical" 
      />
    </group>
  );
}

export default MuseumArchitecture;
