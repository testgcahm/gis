// LibraryModal component for selecting images from Google Drive
import React from 'react';
import { SimpleSpinner } from '../Spinner';

interface ImageItem {
  id: string;
  name: string;
  url: string;
  sizeKB?: number;
  isOverSizeLimit?: boolean;
}

interface LibraryModalProps {
  open: boolean;
  images: ImageItem[];
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
        {loading && <div className="text-center py-6"><SimpleSpinner /></div>}
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
              title={img.isOverSizeLimit 
                ? `${img.name} (${img.sizeKB}KB - Too large, max size is 250KB)` 
                : `${img.name} (${img.sizeKB}KB)`}
              onClick={() => !img.isOverSizeLimit && onSelect(img.url)}
              disabled={img.isOverSizeLimit}
            >
              <div className="relative">
                <img
                  src={img.url}
                  alt={img.name}
                  className={`rounded border-2 transition-all shadow-sm w-full h-24 object-cover bg-white
                    ${img.isOverSizeLimit 
                      ? 'border-red-500 opacity-70' 
                      : 'border-transparent group-hover:border-primary-500 group-focus:border-primary-600'}`}
                />
                {img.isOverSizeLimit && (
                  <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                      {img.sizeKB}KB (Too large)
                    </span>
                  </div>
                )}
                <span className={`absolute bottom-1 left-1 right-1 bg-black/60 text-white text-xs rounded px-1 py-0.5 
                  ${img.isOverSizeLimit ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'} transition`}>
                  {img.name} {img.sizeKB && `(${img.sizeKB}KB)`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryModal;