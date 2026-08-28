import React, { useState } from 'react';
import { X, TrendingUp, Search, Star, Car } from 'lucide-react';
import { CarItem } from '../types';
import { CarThumbnail } from './CarThumbnail';

interface BestSellersModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CarItem[];
}

export const BestSellersModal: React.FC<BestSellersModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Luxury SUV', 'Sport Sedan', 'Sports Coupe', 'Sedan', 'Compact'];

  const filtered = items.filter((item) => {
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f97316] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Top Selling Vehicles</h3>
              <p className="text-xs text-slate-500">Ranking by total units sold this period</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search model name..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#f97316]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium shrink-0 transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#f97316] text-white font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {filtered.map((car, idx) => (
            <div
              key={car.id}
              className="py-3 flex items-center justify-between group hover:bg-slate-50/80 -mx-2 px-2 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 text-xs font-bold text-slate-400">#{idx + 1}</span>
                <CarThumbnail name={car.name} imageUrl={car.imageUrl} size="md" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#f97316] transition-colors">
                    {car.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    ${car.price.toLocaleString()} • {car.category || 'Automotive'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400 font-medium">Total Sold</p>
                <p className="text-sm font-bold text-slate-900">
                  {car.salesCount.toLocaleString()} units
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
