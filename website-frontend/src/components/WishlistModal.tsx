import React from 'react';
import { X, Trash2, ArrowRight, Heart } from 'lucide-react';
import { Car } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allCars: Car[];
  onRemoveFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  favorites,
  allCars,
  onRemoveFavorite,
  onSelectCar,
}) => {
  if (!isOpen) return null;

  const favoriteCars = allCars.filter((c) => favorites.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/70 backdrop-blur-sm flex items-center justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full min-h-screen bg-white p-6 shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="text-lg font-bold text-neutral-900">Saved Wishlist ({favoriteCars.length})</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          {favoriteCars.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-neutral-800">No cars saved yet</h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Click the heart icon on any vehicle card to save it for quick comparison and rental.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {favoriteCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all group"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-20 h-14 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">{car.name}</h4>
                    <span className="text-[11px] text-neutral-500 block">{car.type} • {car.transmission}</span>
                    <span className="text-xs font-black text-neutral-900">${car.pricePerDay}/day</span>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCar(car);
                      }}
                      className="px-3 py-1.5 bg-neutral-900 text-white hover:bg-neutral-800 text-[11px] font-bold rounded-lg transition-colors"
                    >
                      Rent
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(car.id)}
                      className="p-1 text-neutral-400 hover:text-rose-600 transition-colors flex items-center justify-center"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-colors"
          >
            Continue Browsing Fleet
          </button>
        </div>

      </div>
    </div>
  );
};
