/**
 * InstructionsOverlay Component
 * Shows museum navigation instructions to users
 */

interface InstructionsOverlayProps {
  onClose: () => void;
}

export function InstructionsOverlay({ onClose }: InstructionsOverlayProps) {
  return (
    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white p-6 rounded-xl z-30 max-w-sm shadow-2xl border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Guide du Musée
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
          aria-label="Fermer les instructions"
        >
          ✕
        </button>
      </div>

      {/* Instructions List */}
      <div className="space-y-3 text-sm">
        {/* Navigation Controls */}
        <div className="pb-3 border-b border-gray-700">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">
            Navigation
          </p>
          <div className="space-y-2">
            <InstructionItem
              icon="🖱️"
              label="Souris"
              description="Regarder autour de vous"
            />
            <InstructionItem
              icon="⌨️"
              label="WASD / Flèches"
              description="Se déplacer"
            />
            <InstructionItem
              icon="🔍"
              label="Molette"
              description="Zoom avant/arrière"
            />
          </div>
        </div>

        {/* Interaction Controls */}
        <div className="pb-3 border-b border-gray-700">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">
            Interaction
          </p>
          <div className="space-y-2">
            <InstructionItem
              icon="👆"
              label="Clic gauche"
              description="Sélectionner une œuvre"
            />
            <InstructionItem
              icon="🎤"
              label="Microphone"
              description="Poser une question au guide"
            />
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-500/10 rounded-lg p-3">
          <p className="text-blue-300 text-xs">
            💡 <strong>Astuce:</strong> Cliquez sur le bouton micro et demandez
            "Guide-moi dans le musée" pour démarrer une visite guidée!
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-full mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors shadow-lg"
      >
        Commencer la visite
      </button>
    </div>
  );
}

/**
 * Single Instruction Item
 */
interface InstructionItemProps {
  icon: string;
  label: string;
  description: string;
}

function InstructionItem({ icon, label, description }: InstructionItemProps) {
  return (
    <p className="flex items-start gap-2">
      <span className="text-lg">{icon}</span>
      <span>
        <strong className="text-white">{label}:</strong>{" "}
        <span className="text-gray-300">{description}</span>
      </span>
    </p>
  );
}
