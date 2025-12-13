import { Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import { useMuseumStore } from '../../store/museumStore';
import Artwork from './Artwork';
import PlayerCamera from './PlayerCamera';
import Robot from './Robot';
import SimpleRoom from './SimpleRoom';

function MuseumScene({ socket }) {
  const { setIsLoading } = useMuseumStore();
  const { camera } = useThree();
  const robotRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    // Position initiale de la caméra
    camera.position.set(0, 1.6, 5);
    camera.lookAt(0, 1.6, 0);
    
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [setIsLoading, camera]);

  // Waypoints pour la visite guidée
  const tourWaypoints = [
    // Position d'accueil - Robot vient vers le visiteur
    { 
      position: [0, 0, 4], 
      lookAt: [0, 1.6, 5], 
      duration: 3000,
      name: "Accueil"
    },
    // Devant œuvre 1 (mur gauche)
    { 
      position: [-5, 0, 0], 
      lookAt: [-7, 1.5, 0], 
      duration: 5000,
      name: "Œuvre 1"
    },
    // Devant œuvre 2 (mur fond)
    { 
      position: [0, 0, -5], 
      lookAt: [0, 1.5, -7], 
      duration: 5000,
      name: "La Nuit Étoilée",
      artist: "Vincent van Gogh"
    },
  ];

  const handleWaypointReached = (index) => {
    if (socket) {
      const wp = tourWaypoints[index];
      console.log('Sending waypoint event:', index, wp.name);
      socket.emit('waypoint_reached', {
        waypoint_index: index,
        artwork_name: wp.name,
        artist: wp.artist,
        artwork_id: wp.id
      });
    } else {
      console.warn('Socket not connected, cannot send event');
    }
  };

  return (
    <>
      {/* Éclairage */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <Environment preset="apartment" />

      {/* Physique */}
      <Physics gravity={[0, -9.81, 0]}>
        <SimpleRoom />
        
        {/* Œuvre 1 - Mur gauche */}
        <Artwork 
          position={[-7.2, 0, 0]} 
          title="La Joconde"
          artist="Léonard de Vinci"
        />
        
        {/* Œuvre 2 - Mur fond */}
        <Artwork 
          position={[0, 0, -7.2]} 
          title="La Nuit Étoilée"
          artist="Vincent van Gogh"
        />
        
        {/* Robot guide */}
        <Robot 
          ref={robotRef} 
          playerRef={playerRef}
          waypoints={tourWaypoints}
          speed={2}
          onWaypointReached={handleWaypointReached}
        />
        
        {/* Caméra contrôlée par l'utilisateur */}
        <PlayerCamera ref={playerRef} />
      </Physics>
    </>
  );
}

export default MuseumScene;
