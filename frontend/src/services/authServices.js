export const authService = {
  login: async (email, password) => {
    // Simulation d'un appel API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password123') {
          const accessToken = 'access-token-' + Date.now();
          const refreshToken = 'refresh-token-' + Date.now();
          const expiresIn = 3600; // 1 heure en secondes
          
          resolve({
            accessToken,
            refreshToken,
            expiresIn,
            user: { 
              id: '123',
              email, 
              name: 'Utilisateur Test',
              role: 'user'
            }
          });
        } else {
          reject(new Error('Email ou mot de passe incorrect'));
        }
      }, 1000);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  },

  refreshToken: async (refreshToken) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (refreshToken && refreshToken.startsWith('refresh-token-')) {
          const accessToken = 'access-token-' + Date.now();
          const expiresIn = 3600;
          resolve({ accessToken, expiresIn });
        } else {
          reject(new Error('Token invalide'));
        }
      }, 500);
    });
  },

  verifyToken: async (token) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(token && token.startsWith('access-token-'));
      }, 300);
    });
  }
};

// Service de gestion des tokens
export const tokenService = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  
  getTokenExpiry: () => {
    const expiry = localStorage.getItem('tokenExpiry');
    return expiry ? parseInt(expiry) : null;
  },
  
  setTokens: (accessToken, refreshToken, expiresIn) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    const expiryTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
  },
  
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userData');
  },
  
  isTokenExpired: () => {
    const expiry = tokenService.getTokenExpiry();
    if (!expiry) return true;
    return Date.now() >= expiry;
  },
  
  isTokenExpiringSoon: () => {
    const expiry = tokenService.getTokenExpiry();
    if (!expiry) return true;
    // Considère le token comme "expirant bientôt" s'il reste moins de 5 minutes
    return Date.now() >= (expiry - 5 * 60 * 1000);
  }
};

