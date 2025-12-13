import { useRef, useState } from 'react';
import { useMuseumStore } from '../../store/museumStore';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const { sessionId, setCurrentAudioUrl, setIsPlayingAudio } = useMuseumStore();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await sendAudio(audioBlob);
        
        // Arrêter tous les tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Erreur accès micro:", err);
      alert("Impossible d'accéder au microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const sendAudio = async (audioBlob) => {
    if (!sessionId) {
      console.error("Aucune session active");
      setIsProcessing(false);
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    try {
      const response = await fetch(`http://localhost:8000/conversation/ask?session_id=${sessionId}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Erreur réseau');

      const data = await response.json();
      console.log("Réponse robot:", data);

      // Jouer la réponse audio
      if (data.audio_url) {
        // Ajouter le host si chemin relatif
        const url = `http://localhost:8000${data.audio_url}`;
        setCurrentAudioUrl(url);
        setIsPlayingAudio(true);
      }
      
    } catch (error) {
      console.error("Erreur envoi audio:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onMouseLeave={stopRecording}
        disabled={isProcessing}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-200 shadow-lg
          ${isRecording 
            ? 'bg-red-600 scale-110 shadow-red-500/50' 
            : isProcessing 
              ? 'bg-gray-500 cursor-wait' 
              : 'bg-museum-highlight hover:bg-museum-highlight/80'
          }
        `}
      >
        {isProcessing ? '⏳' : isRecording ? '🛑' : '🎤'}
      </button>
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 text-white px-3 py-1 rounded text-sm pointer-events-none">
        {isRecording ? "Relâchez pour envoyer" : "Maintenez pour parler"}
      </div>
    </div>
  );
}

export default AudioRecorder;
