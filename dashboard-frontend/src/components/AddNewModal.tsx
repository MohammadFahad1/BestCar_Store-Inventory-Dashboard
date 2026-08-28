import React, { useState } from 'react';
import { X, Plus, Car, DollarSign, Package, Check } from 'lucide-react';
import { CarItem } from '../types';

interface AddNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCar: (car: CarItem) => void;
}

export const AddNewModal: React.FC<AddNewModalProps> = ({
  isOpen,
  onClose,
  onAddCar,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [salesCount, setSalesCount] = useState('0');
  const [category, setCategory] = useState('Luxury SUV');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const newCar: CarItem = {
      id: `car-${Date.now()}`,
      name: name.trim(),
      price: parseFloat(price) || 0,
      salesCount: parseInt(salesCount) || 1,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=160&q=80',
      category,
    };

    onAddCar(newCar);
    setName('');
    setPrice('');
    setSalesCount('0');
    setImageUrl('');
    onClose();
  };

  const presetImages = [
    { label: 'White SUV', url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=160&q=80' },
    { label: 'Red Sport', url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=160&q=80' },
    { label: 'Blue Coupe', url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=160&q=80' },
    { label: 'Red Sedan', url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=160&q=80' },
    { label: 'Black Hatch', url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=160&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#f97316]">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Add New Vehicle / Product</h3>
              <p className="text-xs text-slate-500">Insert new listing directly to the inventory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vehicle / Model Name
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mercedes-Benz C300"
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#f97316] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Price ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2450.00"
                  className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#f97316] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Initial Sales Count
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  value={salesCount}
                  onChange={(e) => setSalesCount(e.target.value)}
                  placeholder="120"
                  className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#f97316] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#f97316] focus:bg-white"
            >
              <option value="Luxury SUV">Luxury SUV</option>
              <option value="Sport Sedan">Sport Sedan</option>
              <option value="Sports Coupe">Sports Coupe</option>
              <option value="Sedan">Sedan</option>
              <option value="Compact">Compact</option>
              <option value="Electric Vehicle">Electric Vehicle</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Quick Image Select or URL
            </label>
            <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
              {presetImages.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border shrink-0 transition-all ${
                    imageUrl === preset.url
                      ? 'border-[#f97316] bg-orange-50 text-[#f97316] font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#f97316] focus:bg-white"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold rounded-lg shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Vehicle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
