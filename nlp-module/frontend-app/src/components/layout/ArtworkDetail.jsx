import { useMuseumStore } from '../../store/museumStore';

function ArtworkDetail() {
  const { selectedArtwork, setSelectedArtwork } = useMuseumStore();

  if (!selectedArtwork) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-8 max-w-md z-50 pointer-events-auto">
      <button
        onClick={() => setSelectedArtwork(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedArtwork.title}</h2>
      <p className="text-xl text-gray-600 mb-1">{selectedArtwork.artist}</p>
      <p className="text-lg text-gray-500 mb-6">{selectedArtwork.year}</p>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-2">À propos de cette œuvre</h3>
        <p className="text-gray-600 leading-relaxed">
          Cette œuvre fait partie de la collection permanente du musée. 
          Pour en savoir plus, posez vos questions au guide virtuel !
        </p>
      </div>

      <button
        onClick={() => setSelectedArtwork(null)}
        className="mt-6 w-full bg-museum-primary text-white py-2 px-4 rounded-lg hover:bg-museum-accent transition-colors"
      >
        Fermer
      </button>
    </div>
  );
}

export default ArtworkDetail;
