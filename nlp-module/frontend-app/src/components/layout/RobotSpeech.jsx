import { useEffect } from 'react';
import { useMuseumStore } from '../../store/museumStore';

function RobotSpeech({ socket }) {
  const { setCurrentAudioUrl, setIsPlayingAudio, isPlayingAudio, setSessionId } = useMuseumStore();

  useEffect(() => {
    if (!socket) return;

    // Écouter les événements de parole du robot
    const handleRobotSpeech = async (data) => {
      console.log('Audio reçu pour spatialisation:', data.text);
      
      // Sauvegarder l'ID de session pour permettre les questions
      if (data.session_id) {
        setSessionId(data.session_id);
      }
      
      try {
        // Convertir base64 en blob
        const audioData = atob(data.audio_base64);
        const arrayBuffer = new ArrayBuffer(audioData.length);
        const view = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < audioData.length; i++) {
          view[i] = audioData.charCodeAt(i);
        }
        
        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        
        // Mettre à jour le store pour que le composant Robot joue le son
        setCurrentAudioUrl(url);
        setIsPlayingAudio(true);
        
      } catch (error) {
        console.error('Erreur traitement audio:', error);
      }
    };

    socket.on('robot_speech', handleRobotSpeech);

    return () => {
      socket.off('robot_speech', handleRobotSpeech);
    };
  }, [socket, setCurrentAudioUrl, setIsPlayingAudio]);

  // Ce composant ne gère plus que l'affichage UI
  if (!isPlayingAudio) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg animate-fade-in transition-opacity duration-300">
      <div className="flex items-center gap-2">
        <span className="animate-pulse">🔊</span>
        <span>Le robot parle...</span>
      </div>
    </div>
  );
}

export default RobotSpeech;
