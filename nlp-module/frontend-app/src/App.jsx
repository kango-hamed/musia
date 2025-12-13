import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MuseumScene from './components/canvas/MuseumScene';
import RobotSpeech from './components/layout/RobotSpeech';
import AudioRecorder from './components/layout/AudioRecorder';
import { useMuseumStore } from './store/museumStore';

function App() {
  const { isLoading } = useMuseumStore();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connexion WebSocket
    const newSocket = io('http://localhost:8000');
    
    newSocket.on('connect', () => {
      console.log('Socket connected!', newSocket.id);
    });
    
    newSocket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <div className="w-full h-screen bg-black relative">
      {/* Audio Player & Controller */}
      {socket && <RobotSpeech socket={socket} />}
      
      {/* Micro pour Interaction */}
      <AudioRecorder />

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-lg z-10 pointer-events-none">
        <p className="font-bold mb-2">Contrôles :</p>
        <p>• Cliquez pour verrouiller la souris</p>
        <p>• WASD ou Flèches pour se déplacer</p>
        <p>• Le robot vous guide (audio 3D)</p>
        <p>• 🎤 <span className="text-yellow-400">Maintenez le micro pour poser une question</span></p>
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900 text-white">
          <div className="text-2xl font-bold animate-pulse">Chargement du Musée...</div>
        </div>
      )}

      {/* 3D Scene */}
      <Canvas shadows camera={{ fov: 75 }}>
         <color attach="background" args={['#1a1a2e']} />
        {/* Passer le socket à la scène */}
        <MuseumScene socket={socket} />
      </Canvas>
      
      {/* Overlay pour activer l'audio si nécessaire */}
      <div className="absolute bottom-4 right-4 text-white/50 text-sm pointer-events-none">
        Cliquez sur l'écran pour activer l'audio
      </div>
    </div>
  );
}

export default App;
