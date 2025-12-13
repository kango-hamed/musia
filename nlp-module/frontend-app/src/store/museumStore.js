import { create } from 'zustand';

export const useMuseumStore = create((set) => ({
  // Navigation State
  navigationMode: 'first-person', // orbit, first-person, teleport
  setNavigationMode: (mode) => set({ navigationMode: mode }),

  // Artwork State
  selectedArtwork: null,
  setSelectedArtwork: (artwork) => set({ selectedArtwork: artwork }),
  
  // Chat/Guide State
  sessionId: null,
  setSessionId: (id) => set({ sessionId: id }),
  isChatOpen: false,
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  
  messages: [
    { id: '1', sender: 'bot', text: 'Bienvenue au Musée Virtuel ! Je suis votre guide. N\'hésitez pas à me poser des questions sur les œuvres.' }
  ],
  addMessage: (sender, text) => set((state) => ({ 
    messages: [...state.messages, { id: Date.now().toString(), sender, text }] 
  })),

  // Audio State
  currentAudioUrl: null,
  setCurrentAudioUrl: (url) => set({ currentAudioUrl: url }),
  isPlayingAudio: false,
  setIsPlayingAudio: (isPlaying) => set({ isPlayingAudio: isPlaying }),

  // Loading State
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
