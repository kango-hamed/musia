import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useMuseumStore } from "../../lib/stores";
import { Artwork as ArtworkType } from "../../lib/types";

interface ArtworkProps {
  artwork: ArtworkType;
  position: [number, number, number];
  rotation?: [number, number, number];
}

function Artwork({ artwork, position, rotation = [0, 0, 0] }: ArtworkProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setCurrentArtwork, setArtworkModalOpen } = useMuseumStore();

  // Hover animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(hovered ? 1.05 : 1, hovered ? 1.05 : 1, 1),
        0.1
      );
    }
  });

  const handleClick = () => {
    setCurrentArtwork(artwork);
    setArtworkModalOpen(true);
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        castShadow
      >
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial color={hovered ? "#d4a574" : "#8b7355"} />
      </mesh>

      {/* Canvas/Painting surface */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.8, 1.3]} />
        <meshStandardMaterial color="#f0e6d3" roughness={0.8} />
      </mesh>

      {/* Title label */}
      <Text
        position={[0, -1, 0]}
        fontSize={0.12}
        color="#333333"
        anchorX="center"
        anchorY="top"
        maxWidth={2}
      >
        {artwork.title}
      </Text>

      {/* Artist label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.08}
        color="#666666"
        anchorX="center"
        anchorY="top"
      >
        {artwork.artist || "Unknown Artist"}
      </Text>
    </group>
  );
}

// Placeholder artworks for demo
const DEMO_ARTWORKS: ArtworkType[] = [
  { id: "1", code: "ART-001", title: "La Joconde", artist: "Léonard de Vinci" },
  {
    id: "2",
    code: "ART-002",
    title: "Le Radeau de la Méduse",
    artist: "Théodore Géricault",
  },
  {
    id: "3",
    code: "ART-003",
    title: "La Liberté guidant le peuple",
    artist: "Eugène Delacroix",
  },
  { id: "4", code: "ART-004", title: "Les Nymphéas", artist: "Claude Monet" },
  {
    id: "5",
    code: "ART-005",
    title: "Le Déjeuner sur l'herbe",
    artist: "Édouard Manet",
  },
];

export function Artworks() {
  const { artworks } = useMuseumStore();

  // Use API artworks if available, otherwise demo data
  const displayArtworks = artworks.length > 0 ? artworks : DEMO_ARTWORKS;

  // Position artworks on walls
  const positions: {
    pos: [number, number, number];
    rot: [number, number, number];
  }[] = [
    // Back wall
    { pos: [-4, 2.5, -7.4], rot: [0, 0, 0] },
    { pos: [0, 2.5, -7.4], rot: [0, 0, 0] },
    { pos: [4, 2.5, -7.4], rot: [0, 0, 0] },
    // Left wall
    { pos: [-9.9, 2.5, -2], rot: [0, Math.PI / 2, 0] },
    // Right wall
    { pos: [9.9, 2.5, -2], rot: [0, -Math.PI / 2, 0] },
  ];

  return (
    <group>
      {displayArtworks.slice(0, positions.length).map((artwork, index) => (
        <Artwork
          key={artwork.id}
          artwork={artwork}
          position={positions[index].pos}
          rotation={positions[index].rot}
        />
      ))}
    </group>
  );
}
