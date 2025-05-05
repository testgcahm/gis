// LibraryModal component for selecting images from Google Drive
import React from 'react';

interface LibraryModalProps {
  open: boolean;
  images: { id: string; name: string; url: string }[];
  loading: boolean;
  error: string | null;
  onSelect: (url: string) => void;
  onClose: () => void;
}

const LibraryModal: React.FC<LibraryModalProps> = ({ open, images, loading, error, onSelect, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <div className="font-bold text-lg mb-2 text-primary-700 text-center">Select an image from your library</div>
        {loading && <div className="text-center py-6">Loading images...</div>}
        {error && <div className="text-red-500 text-center py-4">{error}</div>}
        {!loading && !error && images.length === 0 && (
          <div className="text-gray-500 text-center py-8">No images found in your Google Drive folder.</div>
        )}
        <div className="grid grid-cols-3 max-[510px]:grid-cols-1 gap-3 max-h-72 overflow-y-auto p-1">
          {images.map(img => (
            <button
              key={img.id}
              type="button"
              className="relative group focus:outline-none"
              title={img.name}
              onClick={() => onSelect(img.url)}
            >
              <img
                src={img.url}
                alt={img.name}
                className="rounded border-2 border-transparent group-hover:border-primary-500 group-focus:border-primary-600 transition-all shadow-sm w-full h-24 object-cover bg-white"
              />
              <span className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-xs rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition">{img.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryModal;