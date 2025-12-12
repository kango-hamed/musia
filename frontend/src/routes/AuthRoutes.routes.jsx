import { useState, useEffect } from "react";
import { authService } from "../services/authServices";
import { useAuth } from "../hook/authHook";
import { tokenService } from "../services/authServices";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionStatus, setSessionStatus] = useState({
    isExpiring: false,
    expiresAt: null
  });

  // Fonction pour rafraîchir le token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('Pas de refresh token');
      }

      const response = await authService.refreshToken(refreshToken);
      tokenService.setTokens(response.accessToken, refreshToken, response.expiresIn);
      
      setSessionStatus({
        isExpiring: false,
        expiresAt: Date.now() + (response.expiresIn * 1000)
      });

      return true;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      await logout();
      return false;
    }
  };

  // Vérification périodique du token
  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (!user) return;

      if (tokenService.isTokenExpired()) {
        // Token expiré, tenter de le rafraîchir
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          setSessionStatus({ isExpiring: false, expiresAt: null });
        }
      } else if (tokenService.isTokenExpiringSoon()) {
        // Token expire bientôt, afficher un avertissement
        const expiry = tokenService.getTokenExpiry();
        setSessionStatus({
          isExpiring: true,
          expiresAt: expiry
        });
        // Rafraîchir automatiquement
        await refreshAccessToken();
      }
    };

    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkTokenExpiry, 30000);
    checkTokenExpiry(); // Vérification initiale

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = tokenService.getAccessToken();
      
      if (accessToken) {
        // Vérifier si le token est expiré
        if (tokenService.isTokenExpired()) {
          // Tenter de rafraîchir le token
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            setUser(userData);
            setSessionStatus({
              isExpiring: false,
              expiresAt: tokenService.getTokenExpiry()
            });
          }
        } else {
          // Token valide
          const isValid = await authService.verifyToken(accessToken);
          if (isValid) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            setUser(userData);
            setSessionStatus({
              isExpiring: tokenService.isTokenExpiringSoon(),
              expiresAt: tokenService.getTokenExpiry()
            });
          } else {
            tokenService.clearTokens();
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    tokenService.setTokens(response.accessToken, response.refreshToken, response.expiresIn);
    localStorage.setItem('userData', JSON.stringify(response.user));
    setUser(response.user);
    setSessionStatus({
      isExpiring: false,
      expiresAt: Date.now() + (response.expiresIn * 1000)
    });
  };

  const logout = async () => {
    await authService.logout();
    tokenService.clearTokens();
    setUser(null);
    setSessionStatus({ isExpiring: false, expiresAt: null });
  };

  const extendSession = async () => {
    return await refreshAccessToken();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, extendSession, sessionStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <LoginPage />;
};