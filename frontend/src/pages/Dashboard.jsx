import { useState, useEffect } from "react";
import { useAuth } from "../hook/authHook";
import { tokenService } from "../services/authServices";

export const DashboardPage = () => {
  const { user, logout, extendSession, sessionStatus } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Calculer le temps restant
  useEffect(() => {
    if (sessionStatus.expiresAt) {
      const updateTimer = () => {
        const remaining = sessionStatus.expiresAt - Date.now();
        if (remaining <= 0) {
          setTimeRemaining('Session expirée');
          return;
        }

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [sessionStatus.expiresAt]);

  // Afficher l'avertissement si la session expire bientôt
  useEffect(() => {
    setShowSessionWarning(sessionStatus.isExpiring);
  }, [sessionStatus.isExpiring]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const handleExtendSession = async () => {
    setLoading(true);
    try {
      const success = await extendSession();
      if (success) {
        setShowSessionWarning(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-800">Tableau de bord</h1>
            <div className="flex items-center gap-4">
              {sessionStatus.expiresAt && (
                <div className="text-sm text-gray-600">
                  Session: <span className="font-mono font-semibold">{timeRemaining}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all disabled:opacity-50"
              >
                {loading ? 'Chargement...' : 'Déconnexion'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSessionWarning && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-yellow-800 font-semibold">Votre session expire bientôt</p>
                  <p className="text-yellow-700 text-sm">Prolongez votre session pour continuer à travailler</p>
                </div>
              </div>
              <button
                onClick={handleExtendSession}
                disabled={loading}
                className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-all disabled:opacity-50"
              >
                Prolonger la session
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bienvenue, {user?.name}!
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">ID:</span> {user?.id}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Rôle:</span> {user?.role}
            </p>
          </div>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              ✓ Vous êtes connecté avec succès!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Informations de session</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Statut de la session:</span>
              <span className={`font-semibold ${sessionStatus.isExpiring ? 'text-yellow-600' : 'text-green-600'}`}>
                {sessionStatus.isExpiring ? '⚠️ Expire bientôt' : '✓ Active'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Temps restant:</span>
              <span className="font-mono font-semibold text-gray-800">{timeRemaining}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-gray-600">Access Token:</span>
              <span className="font-mono text-xs text-gray-600 truncate max-w-xs">
                {tokenService.getAccessToken()?.substring(0, 30)}...
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};