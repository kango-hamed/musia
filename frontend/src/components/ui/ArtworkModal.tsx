import { useMuseumStore } from "../../lib/stores";

export function ArtworkModal() {
  const { currentArtwork, isArtworkModalOpen, setArtworkModalOpen } =
    useMuseumStore();

  if (!isArtworkModalOpen || !currentArtwork) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setArtworkModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {currentArtwork.title}
          </h2>
          <button
            onClick={() => setArtworkModalOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Placeholder */}
          <div className="aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
            {currentArtwork.imageUrl ? (
              <img
                src={currentArtwork.imageUrl}
                alt={currentArtwork.title}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-gray-400 text-4xl">🖼️</span>
            )}
          </div>

          {/* Artist & Period */}
          <div className="mb-4">
            <p className="text-lg text-gray-700">
              <span className="font-medium">Artiste:</span>{" "}
              {currentArtwork.artist || "Inconnu"}
            </p>
            {currentArtwork.period && (
              <p className="text-gray-600">
                <span className="font-medium">Période:</span>{" "}
                {currentArtwork.period}
              </p>
            )}
            {currentArtwork.room && (
              <p className="text-gray-600">
                <span className="font-medium">Salle:</span>{" "}
                {currentArtwork.room}
              </p>
            )}
          </div>

          {/* Description */}
          {currentArtwork.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{currentArtwork.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors">
              🎤 Poser une question
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors">
              🔊 Écouter la narration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
