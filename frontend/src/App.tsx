/**
 * Main App Component
 * Orchestrates the entire 3D Virtual Museum application
 * Integrates: stores, hooks, services, 3D scene, UI components
 */

import { Scene } from "@/components/museum/Scene";
// import { ArtworkModal } from "@/components/ui/ArtworkModal";
import { ErrorScreen } from "@/components/ui/ErrorScreen";
import { InstructionsOverlay } from "@/components/ui/InstructionsOverlay";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { TourControls } from "@/components/ui/TourControls";
import { VoiceButton } from "@/components/ui/VoiceButton";
import { useAudioManager } from "@/hooks/useAudioManager";
import { useMuseumData } from "@/hooks/useMuseumData";
import { nlpService } from "@/services";
import {
  useChatStore,
  useMuseumStore,
  useTourStore,
  useUIStore,
} from "@/stores";
import type { QuestionResponse } from "@/types";
import { Suspense, useEffect } from "react";

/**
 * Main Application Component
 */
function App() {
  // ========================================
  // STORES - Global State Management
  // ========================================
  const { selectedArtwork, viewMode, setArtworks, setTrajectories } =
    useMuseumStore();

  const { isPlaying } = useTourStore();

  const { addMessage, setSessionId } = useChatStore();

  const { isHelpOpen, toggleHelp, addNotification } = useUIStore();

  // ========================================
  // HOOKS - Data & Audio Management
  // ========================================

  // Fetch museum data (artworks + trajectories)
  const { artworks, trajectories, isLoading, error } = useMuseumData({
    autoLoad: true,
  });

  // Audio management (TTS, ambient sounds, etc.)
  const audioManager = useAudioManager({
    autoUnlock: true,
    maxConcurrent: 3,
  });

  // ========================================
  // EFFECTS - Initialization & Side Effects
  // ========================================

  /**
   * Initialize museum artworks in store
   */
  useEffect(() => {
    if (artworks.length > 0) {
      setArtworks(artworks);
      console.log(`✅ Loaded ${artworks.length} artworks`);
    }
  }, [artworks, setArtworks]);

  /**
   * Initialize museum trajectories in store
   */
  useEffect(() => {
    if (trajectories.length > 0) {
      setTrajectories(trajectories);
      console.log(`✅ Loaded ${trajectories.length} trajectories`);
    }
  }, [trajectories, setTrajectories]);

  /**
   * Initialize NLP conversation session
   */
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await nlpService.startConversation({});

        setSessionId(response.session_id);
        console.log("✅ NLP Session initialized:", response.session_id);
      } catch (err) {
        console.error("❌ Failed to initialize NLP session:", err);

        addNotification(
          "error",
          "Impossible d'initialiser la session de conversation",
          5000
        );
      }
    };

    initSession();
  }, [setSessionId, addNotification]);

  // ========================================
  // EVENT HANDLERS - Voice Interaction
  // ========================================

  /**
   * Handle voice transcript (user spoke)
   */
  const handleVoiceTranscript = (text: string) => {
    if (!text.trim()) return;

    addMessage({
      role: "user",
      content: text,
    });
  };

  /**
   * Handle NLP response (assistant replied)
   */
  const handleVoiceResponse = (response: QuestionResponse) => {
    // Add text response to chat
    if (response.answer) {
      addMessage({
        role: "assistant",
        content: response.answer,
      });
    }

    // Play TTS audio response if available
    if (response.audio_url) {
      try {
        const audioUrl = nlpService.getAudioUrl(response.audio_url);
        audioManager.play({
          id: "tts",
          url: audioUrl,
          volume: 0.8,
          fadeIn: true,
        });
      } catch (err) {
        console.error("Failed to play TTS audio:", err);
      }
    }

    // Handle intent-specific actions
    if (response.intent) {
      handleIntent(response.intent, response.entities);
    }
  };

  /**
   * Handle NLP intents (navigate, info, etc.)
   */
  const handleIntent = (intent: string, entities?: Record<string, unknown>) => {
    switch (intent) {
      case "navigate_to_artwork":
      case "navigation":
        if (entities?.artwork_id && typeof entities.artwork_id === "string") {
          const artwork = artworks.find((a) => a.id === entities.artwork_id);
          if (artwork) {
            useMuseumStore.setState({ selectedArtwork: artwork });
          }
        }
        break;

      case "start_tour":
        if (
          entities?.trajectory_id &&
          typeof entities.trajectory_id === "string"
        ) {
          const trajectory = trajectories.find(
            (t) => t.id === entities.trajectory_id
          );
          if (trajectory) {
            // Convert Trajectory to Waypoints
            const waypoints =
              trajectory.steps?.map((step) => ({
                artworkId: step.artworkId,
                position: [0, 0, 0] as [number, number, number],
                lookAt: [0, 2, 0] as [number, number, number],
                duration: step.stopDuration * 1000 || 60000, // Convert to ms
              })) || [];

            useTourStore.getState().setWaypoints(waypoints);
            useTourStore.getState().play();
          }
        }
        break;

      default:
        // Unknown intent - do nothing
        break;
    }
  };

  // ========================================
  // CONDITIONAL RENDERING - Error States
  // ========================================

  /**
   * Error State - Show error screen
   */
  if (error) {
    console.log(error)
    return (
      <ErrorScreen error={error} onRetry={() => window.location.reload()} />
    );
  }

  /**
   * Loading State - Show loading screen
   */
  if (isLoading) {
    return (
      <LoadingScreen
        artworkCount={artworks.length}
        trajectoryCount={trajectories.length}
      />
    );
  }

  // ========================================
  // MAIN RENDER - Application UI
  // ========================================

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* ========================================
          3D SCENE - Main Museum Experience (z-0 - Background)
          ======================================== */}

      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-white text-xl animate-pulse">
              Préparation de la scène 3D...
            </div>
          </div>
        }
      >
        <Scene />
      </Suspense>

      {/* ========================================
          OVERLAYS - Instructions & Dev Stats (z-30+)
          ======================================== */}

      {/* Instructions Overlay */}
      {isHelpOpen && <InstructionsOverlay onClose={() => toggleHelp()} />}

      {/* Dev Stats (Development Mode Only) */}
      {import.meta.env.DEV && (
        <div className="fixed top-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg z-50 text-xs font-mono space-y-1 shadow-xl pointer-events-auto">
          <div className="font-bold text-blue-400 mb-2">DEBUG INFO</div>
          <div>
            View Mode: <span className="text-green-400">{viewMode}</span>
          </div>
          <div>
            Artworks: <span className="text-green-400">{artworks.length}</span>
          </div>
          <div>
            Trajectories:{" "}
            <span className="text-green-400">{trajectories.length}</span>
          </div>
          <div>
            Tour Playing:{" "}
            <span className="text-green-400">{isPlaying ? "Yes" : "No"}</span>
          </div>
          <div>
            Selected:{" "}
            <span className="text-green-400">
              {selectedArtwork ? selectedArtwork.code : "None"}
            </span>
          </div>
        </div>
      )}

      {/* ========================================
          UI COMPONENTS - Interactive Elements
          ======================================== */}

      {/* Tour Controls (visible when playing) */}
      {isPlaying && <TourControls />}

      {/* Artwork Details Modal (visible when artwork selected) */}
      {/* {selectedArtwork && <ArtworkModal />} */}

      {/* Voice Interaction Button */}
      <VoiceButton
        onTranscript={handleVoiceTranscript}
        onResponse={handleVoiceResponse}
      />

      {/* ========================================
          HINTS & TIPS
          ======================================== */}

      {/* Audio Context Unlock Hint */}
      {!audioManager.isUnlocked && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm pointer-events-none animate-pulse z-40">
          🔊 Cliquez n'importe où pour activer l'audio
        </div>
      )}

      {/* Mobile Warning (optional) */}
      {typeof window !== "undefined" && window.innerWidth < 768 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-yellow-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs text-center max-w-xs z-40">
          ⚠️ Expérience optimale sur desktop
        </div>
      )}
    </div>
  );
}

export default App;
