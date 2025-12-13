/**
 * ErrorScreen Component
 * Displays error state with retry option
 */

interface ErrorScreenProps {
  error: string | Error;
  onRetry?: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error.message || "Une erreur est survenue";

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="text-center max-w-md px-6">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-2xl font-bold mb-4 text-red-400">
          Erreur de chargement
        </h2>

        {/* Error Message */}
        <p className="text-gray-300 mb-8 leading-relaxed">{errorMessage}</p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              🔄 Réessayer
            </button>
          )}

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>

        {/* Help Text */}
        <p className="text-gray-500 text-xs mt-8">
          Si le problème persiste, contactez le support technique
        </p>
      </div>
    </div>
  );
}
