import { useTourStore } from "../../lib/stores";

export function TourControls() {
  const {
    currentTour,
    currentStepIndex,
    isPlaying,
    togglePlayPause,
    nextStep,
    previousStep,
    exitTour,
  } = useTourStore();

  if (!currentTour) return null;

  const currentStep = currentTour.steps[currentStepIndex];
  const totalSteps = currentTour.steps.length;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xl z-40">
      <div className="bg-black/70 backdrop-blur-md rounded-2xl p-4 mx-4 text-white">
        {/* Tour Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">
            {currentTour.trajectory.name}
          </h3>
          <button
            onClick={exitTour}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Current Artwork Info */}
        <div className="mb-3">
          <p className="text-blue-300 font-medium">
            {currentStep?.artwork.title}
          </p>
          <p className="text-sm text-gray-400 line-clamp-2">
            {currentStep?.narrative.text.substring(0, 100)}...
          </p>
        </div>

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
            className="p-2 text-2xl disabled:opacity-30 hover:scale-110 transition-transform"
          >
            ⏮
          </button>

          <button
            onClick={togglePlayPause}
            className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 
                       flex items-center justify-center text-2xl
                       transition-colors shadow-lg"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            onClick={nextStep}
            disabled={currentStepIndex === totalSteps - 1}
            className="p-2 text-2xl disabled:opacity-30 hover:scale-110 transition-transform"
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
