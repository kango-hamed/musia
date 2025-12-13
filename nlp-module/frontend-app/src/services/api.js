import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Should be in .env

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const museumService = {
  getArtworks: async () => {
    const response = await api.get('/artworks');
    return response.data;
  },
  
  startConversation: async (artworkId) => {
    const response = await api.post(`/conversation/start?artwork_id=${artworkId}`);
    return response.data;
  },

  sendMessage: async (sessionId, message) => {
    const response = await api.post('/conversation/text', {
      session_id: sessionId,
      message: message
    });
    return response.data;
  }
};
