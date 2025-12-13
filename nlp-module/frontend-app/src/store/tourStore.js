import { create } from 'zustand';

export const useTourStore = create((set, get) => ({
  // État de la visite
  isPlaying: false,
  isPaused: false,
  currentWaypointIndex: 0,
  
  // Waypoints du parcours (positions où le robot s'arrête)
  waypoints: [
    // Salle 1 - Renaissance
    { position: [-15, 0, -18], lookAt: [-18, 2, -22], artworkId: 1, duration: 5000 },
    { position: [-12, 0, -18], lookAt: [-12, 2, -22], artworkId: 2, duration: 5000 },
    { position: [-20, 0, -18], lookAt: [-25, 2, -18], artworkId: 3, duration: 5000 },
    
    // Transition vers Salle 2
    { position: [0, 0, -18], lookAt: [5, 2, -18], artworkId: null, duration: 2000 },
    
    // Salle 2 - Impressionnisme
    { position: [12, 0, -18], lookAt: [12, 2, -22], artworkId: 4, duration: 5000 },
    { position: [18, 0, -18], lookAt: [18, 2, -22], artworkId: 5, duration: 5000 },
    { position: [20, 0, -18], lookAt: [25, 2, -18], artworkId: 6, duration: 5000 },
    { position: [20, 0, -12], lookAt: [25, 2, -12], artworkId: 7, duration: 5000 },
    
    // Transition vers Salle 3
    { position: [20, 0, 0], lookAt: [20, 2, 5], artworkId: null, duration: 2000 },
    
    // Salle 3 - Art Moderne
    { position: [18, 0, 18], lookAt: [18, 2, 22], artworkId: 8, duration: 5000 },
    { position: [12, 0, 18], lookAt: [12, 2, 22], artworkId: 9, duration: 5000 },
    { position: [20, 0, 18], lookAt: [25, 2, 18], artworkId: 10, duration: 5000 },
    
    // Transition vers Salle 4
    { position: [0, 0, 18], lookAt: [-5, 2, 18], artworkId: null, duration: 2000 },
    
    // Salle 4 - Art Contemporain
    { position: [-12, 0, 18], lookAt: [-12, 2, 22], artworkId: 11, duration: 5000 },
    { position: [-18, 0, 18], lookAt: [-18, 2, 22], artworkId: 12, duration: 5000 },
    { position: [-20, 0, 18], lookAt: [-25, 2, 18], artworkId: 13, duration: 5000 },
  ],

  // Actions
  play: () => set({ isPlaying: true, isPaused: false }),
  pause: () => set({ isPaused: true }),
  resume: () => set({ isPaused: false }),
  stop: () => set({ isPlaying: false, isPaused: false, currentWaypointIndex: 0 }),
  reset: () => set({ isPlaying: false, isPaused: false, currentWaypointIndex: 0 }),
  
  nextWaypoint: () => {
    const { currentWaypointIndex, waypoints } = get();
    if (currentWaypointIndex < waypoints.length - 1) {
      set({ currentWaypointIndex: currentWaypointIndex + 1 });
    } else {
      // Fin du parcours
      set({ isPlaying: false, currentWaypointIndex: 0 });
    }
  },
  
  setWaypointIndex: (index) => set({ currentWaypointIndex: index }),
}));
