import { Scene } from "../components/museum";
import { ArtworkModal, TourControls, VoiceButton } from "../components/ui";
import { getArtworks } from "../lib/api";
import { useMuseumStore } from "../lib/stores";
import { useEffect } from "react";

export function MuseumPage() {
  const { setArtworks, setIsLoading, isLoading } = useMuseumStore();

  // Fetch artworks on mount
  useEffect(() => {
    async function loadData() {
      try {
        const artworks = await getArtworks();
        setArtworks(artworks);
      } catch (error) {
        console.error("Failed to load artworks:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [setArtworks, setIsLoading]);

  return (
    <div className="w-screen h-screen bg-gray-100 overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Chargement du musée...</p>
          </div>
        </div>
      )}

      {/* 3D Scene */}
      <Scene className="w-full h-full" />

      {/* UI Overlays */}
      <VoiceButton />
      <TourControls />
      <ArtworkModal />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 z-30">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
            🏛️ Musia Virtual Museum
          </h1>
          <div className="flex gap-2">
            <button className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-white transition-colors">
              📚 Tours
            </button>
            <button className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-white transition-colors">
              ℹ️ Aide
            </button>
          </div>
        </div>
      </header>

      {/* Instructions Toast */}
      <div className="absolute bottom-32 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">💡 Astuce:</strong> Cliquez sur
            une œuvre pour en savoir plus, ou utilisez le bouton microphone pour
            poser une question au robot guide.
          </p>
        </div>
      </div>
    </div>
  );
}
