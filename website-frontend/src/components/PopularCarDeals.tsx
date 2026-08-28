import React, { useState } from 'react';
import { Heart, Users, Fuel, Gauge, Sparkles, Filter, ChevronRight, Check } from 'lucide-react';
import { Car, CarCategory } from '../types';

interface PopularCarDealsProps {
  cars: Car[];
  favorites: string[];
  onToggleFavorite: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  searchFilterLocation?: string;
}

export const PopularCarDeals: React.FC<PopularCarDealsProps> = ({
  cars,
  favorites,
  onToggleFavorite,
  onSelectCar,
  searchFilterLocation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('Popular');
  const [showAll, setShowAll] = useState(false);
  const [wireframePlaceholderMode, setWireframePlaceholderMode] = useState(false);

  const categories: CarCategory[] = ['Popular', 'Large Car', 'Small Car', 'Exclusive Car'];

  // Filter cars by category and location if searched
  const filteredCars = cars.filter((car) => {
    const categoryMatches = selectedCategory === 'Popular' 
      ? car.isPopular || car.category === 'Popular'
      : car.category === selectedCategory;

    if (!categoryMatches) return false;

    if (searchFilterLocation && searchFilterLocation.trim() !== '') {
      const cityOrName = searchFilterLocation.toLowerCase();
      return car.locationAvailability.some((loc) => 
        cityOrName.includes(loc.toLowerCase()) || loc.toLowerCase().includes(cityOrName)
      );
    }

    return true;
  });

  // Limit display based on showAll state
  const displayedCars = showAll ? filteredCars : filteredCars.slice(0, 8);

  return (
    <section id="rental-deals" className="py-20 lg:py-28 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            Most popular car rental deals
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Filter Tabs matching wireframe */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-8 border-b border-neutral-300 pb-4 mb-12">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                id={`deal-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowAll(false);
                }}
                className={`text-sm sm:text-base font-semibold px-4 py-2 transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-neutral-900 font-bold'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {category}
                {isActive && (
                  <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* View Controls: Total counter & Visual Switch */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 px-1">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-neutral-800">{displayedCars.length}</strong> of {filteredCars.length} available models</span>
            {searchFilterLocation && (
              <span className="bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded-full font-medium">
                Near: {searchFilterLocation}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWireframePlaceholderMode(!wireframePlaceholderMode)}
              className="text-[11px] font-medium text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
              title="Toggle between realistic photos and wireframe mockup placeholder mode"
            >
              {wireframePlaceholderMode ? 'Switch to Real Photos' : 'Wireframe Icon Mode'}
            </button>
          </div>
        </div>

        {/* 4x2 Car Cards Grid matching wireframe */}
        {displayedCars.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200">
            <p className="text-neutral-600 font-medium mb-4">No vehicles currently match this specific location filter.</p>
            <button
              onClick={() => setSelectedCategory('Popular')}
              className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-xl"
            >
              View All Popular Deals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCars.map((car) => {
              const isFav = favorites.includes(car.id);

              return (
                <div
                  key={car.id}
                  id={`car-card-${car.id}`}
                  className="bg-[#e4e4e4] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:bg-[#dedede] group border border-neutral-300/60"
                >
                  {/* Card Header: Title and Favorite Button matching mockup */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 tracking-tight group-hover:text-black">
                        {car.name}
                      </h3>
                      <span className="text-[11px] font-medium text-neutral-500">
                        {car.type}
                      </span>
                    </div>

                    <button
                      id={`fav-btn-${car.id}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(car.id);
                      }}
                      className="p-1.5 text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
                      aria-label="Save to favorite"
                    >
                      <Heart
                        className={`w-5 h-5 transition-transform active:scale-125 ${
                          isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Car Image / Mockup Placeholder Container matching wireframe */}
                  <div 
                    onClick={() => onSelectCar(car)}
                    className="w-full aspect-[16/11] bg-[#cdcdcd] rounded-xl flex items-center justify-center relative overflow-hidden mb-5 cursor-pointer group-hover:bg-[#c4c4c4] transition-colors"
                  >
                    {wireframePlaceholderMode ? (
                      /* Minimalist Wireframe Icon Style matching image.png */
                      <div className="text-neutral-400 flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                        </svg>
                      </div>
                    ) : (
                      /* Polished High-Res Car Photography */
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}

                    {/* Subtle type pill */}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-[10px] font-semibold text-white">
                      {car.capacity} Seats • {car.transmission}
                    </div>
                  </div>

                  {/* Card Bottom: Price and Rent Now Button matching wireframe */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-lg font-black text-neutral-900 tracking-tight">
                          ${car.pricePerDay.toFixed(2)}/
                        </span>
                        <span className="text-xs font-semibold text-neutral-600 ml-1">
                          day
                        </span>
                      </div>
                      {car.originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through">
                          ${car.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      id={`rent-now-btn-${car.id}`}
                      type="button"
                      onClick={() => onSelectCar(car)}
                      className="px-4 py-2 bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer border border-neutral-300/70"
                    >
                      Rent Now
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Bar: "Show more car" button & "120 Car" count matching wireframe */}
        <div className="relative mt-14 flex items-center justify-center">
          
          {/* Centered Action Button */}
          <button
            id="show-more-cars-btn"
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all cursor-pointer border border-neutral-300/80 active:scale-95"
          >
            {showAll ? 'Show less' : 'Show more car'}
          </button>

          {/* Right Counter matching wireframe "120 Car" */}
          <div className="absolute right-0 text-xs sm:text-sm font-semibold text-neutral-500">
            120 Car
          </div>

        </div>

      </div>
    </section>
  );
};
