import { useTourStore } from '../../store/tourStore';

function TourControls() {
  const { isPlaying, isPaused, currentWaypointIndex, waypoints, play, pause, resume, reset } = useTourStore();
  
  const progress = ((currentWaypointIndex + 1) / waypoints.length) * 100;
  
  // Déterminer la salle actuelle
  const getCurrentRoom = () => {
    if (currentWaypointIndex < 3) return "Salle 1 - Renaissance";
    if (currentWaypointIndex < 8) return "Salle 2 - Impressionnisme";
    if (currentWaypointIndex < 12) return "Salle 3 - Art Moderne";
    return "Salle 4 - Art Contemporain";
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 99999,
        pointerEvents: 'auto',
        minWidth: '350px'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '14px', fontWeight: 'normal' }}>
          Visite guidée par robot
        </h3>
        <p style={{ margin: '0 0 15px 0', color: '#1e40af', fontSize: '18px', fontWeight: 'bold' }}>
          {getCurrentRoom()}
        </p>
        
        {/* Barre de progression */}
        <div style={{ 
          width: '100%', 
          backgroundColor: '#e5e7eb', 
          borderRadius: '9999px', 
          height: '8px',
          marginBottom: '8px'
        }}>
          <div style={{ 
            width: `${progress}%`, 
            backgroundColor: '#1e40af', 
            height: '8px', 
            borderRadius: '9999px',
            transition: 'width 0.3s'
          }} />
        </div>
        
        <p style={{ margin: '0 0 15px 0', color: '#6b7280', fontSize: '12px' }}>
          Étape {currentWaypointIndex + 1} / {waypoints.length}
        </p>
        
        {/* Boutons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {!isPlaying ? (
            <button
              onClick={play}
              style={{
                backgroundColor: '#1e40af',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ▶️ Démarrer la visite
            </button>
          ) : isPaused ? (
            <button
              onClick={resume}
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ▶️ Reprendre
            </button>
          ) : (
            <button
              onClick={pause}
              style={{
                backgroundColor: '#ca8a04',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ⏸️ Pause
            </button>
          )}
          
          <button
            onClick={reset}
            style={{
              backgroundColor: '#4b5563',
              color: 'white',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default TourControls;
