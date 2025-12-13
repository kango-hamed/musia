import ChatInterface from '../chat/ChatInterface';
import ArtworkDetail from './ArtworkDetail';

function UIOverlay() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 pointer-events-none">
      {/* Header */}
      <header className="flex justify-between items-center pointer-events-auto">
        <div className="bg-black/50 backdrop-blur-md p-4 rounded-lg text-white">
          <h1 className="text-xl font-bold">🏛️ Musée Virtuel</h1>
          <p className="text-sm opacity-80">Exploration Interactive</p>
        </div>
        
        <div className="bg-black/50 backdrop-blur-md p-2 rounded-lg text-white">
          <span className="text-sm">Navigation: WASD / Click & Drag</span>
        </div>
      </header>

      {/* Artwork Detail Modal */}
      <ArtworkDetail />

      {/* Footer / Chat Area */}
      <footer className="flex justify-end items-end pointer-events-auto">
        <ChatInterface />
      </footer>
    </div>
  );
}

export default UIOverlay;
