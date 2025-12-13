/**
 * LoadingScreen Component
 * Displays loading progress for museum initialization
 */

interface LoadingScreenProps {
  artworkCount: number;
  trajectoryCount: number;
}

export function LoadingScreen({
  artworkCount,
  trajectoryCount,
}: LoadingScreenProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="text-center">
        {/* Main Loading Title */}
        <div className="text-4xl font-bold text-white mb-6 animate-pulse">
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            MUSIA
          </span>
        </div>

        <div className="text-xl text-gray-300 mb-8">
          Chargement du Musée Virtuel...
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-3 bg-gray-700 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse transition-all duration-500"
            style={{ width: "75%" }}
          />
        </div>

        {/* Loading Stats */}
        <div className="text-gray-400 text-sm space-y-2">
          <p>
            📦 {artworkCount} {artworkCount === 1 ? "œuvre" : "œuvres"} chargées
          </p>
          <p>
            🗺️ {trajectoryCount}{" "}
            {trajectoryCount === 1 ? "parcours" : "parcours"} disponibles
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
