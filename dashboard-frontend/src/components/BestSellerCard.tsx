import React from 'react';
import { CarItem } from '../types';
import { CarThumbnail } from './CarThumbnail';

interface BestSellerCardProps {
  items: CarItem[];
  onViewAll: () => void;
  onSelectItem?: (item: CarItem) => void;
}

export const BestSellerCard: React.FC<BestSellerCardProps> = ({
  items,
  onViewAll,
  onSelectItem,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100/90 shadow-xs flex flex-col justify-start h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
          Best Seller
        </h2>
        <button
          onClick={onViewAll}
          className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Car List */}
      <div className="divide-y divide-slate-100 mt-1">
        {items.map((car) => (
          <div
            key={car.id}
            onClick={() => onSelectItem?.(car)}
            className="py-3 flex items-center justify-between group hover:bg-slate-50/80 -mx-2 px-2 rounded-xl transition-all cursor-pointer"
          >
            {/* Left: Thumbnail & Info */}
            <div className="flex items-center gap-3 min-w-0">
              <CarThumbnail
                name={car.name}
                imageUrl={car.imageUrl}
                size="md"
                className="group-hover:ring-2 group-hover:ring-[#f97316]/30 transition-all"
              />
              <div className="min-w-0">
                <h4 className="text-xs md:text-sm font-semibold text-slate-900 truncate group-hover:text-[#f97316] transition-colors">
                  {car.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  ${car.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Right: Sales stat */}
            <div className="text-right shrink-0">
              <p className="text-[11px] text-slate-400 font-medium">Sales</p>
              <p className="text-xs md:text-sm font-semibold text-slate-800">
                {car.salesCount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
