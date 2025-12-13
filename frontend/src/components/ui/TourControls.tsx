/**
 * Tour Controls Component
 * Playback controls for guided tours
 */

import { useTourStore, useMuseumStore } from "@/stores";

export function TourControls() {
  const {
    currentTour,
    currentStepIndex,
    waypoints,
    isPlaying,
    isPaused,
    play,
    pause,
    nextStep,
    previousStep,
    stop,
  } = useTourStore();

  const { artworks } = useMuseumStore();

  if (!currentTour) return null;

  const totalSteps = waypoints.length;
  const currentWaypoint = waypoints[currentStepIndex];
  const currentArtwork = currentWaypoint
    ? artworks.find((a) => a.id === currentWaypoint.artworkId)
    : null;

  const togglePlayPause = () => {
    if (isPlaying && !isPaused) {
      pause();
    } else {
      play();
    }
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xl z-40">
      <div className="bg-black/70 backdrop-blur-md rounded-2xl p-4 mx-4 text-white shadow-2xl">
        {/* Tour Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">{currentTour.name}</h3>
          <button
            onClick={stop}
            className="text-gray-400 hover:text-white transition-colors text-xl"
            title="Quitter le parcours"
          >
            ✕
          </button>
        </div>

        {/* Current Artwork Info */}
        {currentArtwork && (
          <div className="mb-3">
            <p className="text-blue-300 font-medium">{currentArtwork.title}</p>
            {currentArtwork.artist && (
              <p className="text-sm text-gray-400">{currentArtwork.artist}</p>
            )}
            {currentWaypoint.description && (
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                {currentWaypoint.description}
              </p>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-400">
            {currentStepIndex + 1} / {totalSteps}
          </span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6">
          <button
            onClick={previousStep}
            disabled={currentStepIndex === 0}
            className="p-2 text-2xl disabled:opacity-30 hover:scale-110 transition-transform disabled:cursor-not-allowed"
            title="Étape précédente"
          >
            ⏮
          </button>

          <button
            onClick={togglePlayPause}
            className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600
                       flex items-center justify-center text-2xl
                       transition-all shadow-lg hover:shadow-xl active:scale-95"
            title={isPlaying && !isPaused ? "Pause" : "Lecture"}
          >
            {isPlaying && !isPaused ? "⏸" : "▶"}
          </button>

          <button
            onClick={nextStep}
            disabled={currentStepIndex === totalSteps - 1}
            className="p-2 text-2xl disabled:opacity-30 hover:scale-110 transition-transform disabled:cursor-not-allowed"
            title="Étape suivante"
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
