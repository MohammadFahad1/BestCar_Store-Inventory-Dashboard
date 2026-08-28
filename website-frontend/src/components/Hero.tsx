import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBookingNowClick: () => void;
  onSeeAllCarsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookingNowClick, onSeeAllCarsClick }) => {
  const [activeCarPreview, setActiveCarPreview] = useState<'suv' | 'sport' | 'luxury'>('suv');

  const previewVehicles = {
    suv: {
      name: 'All New Rush SUV',
      speed: '0-60 in 7.4s',
      rating: '4.9 (120+ reviews)',
      price: '$72/day',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    },
    sport: {
      name: 'Nissan GT-R Sport',
      speed: '0-60 in 3.1s',
      rating: '5.0 (150+ reviews)',
      price: '$96/day',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    },
    luxury: {
      name: 'Rolls-Royce Silver Ghost',
      speed: 'V12 Whisper Ride',
      rating: '5.0 (200+ reviews)',
      price: '$180/day',
      image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1000&q=80',
    }
  };

  return (
    <section id="home" className="relative bg-[#ebebeb] text-neutral-900 pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      {/* Subtle geometric background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#e2e2e2] rounded-bl-[120px] pointer-events-none hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content matching wireframe */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top trust label matching wireframe */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide text-neutral-600">
                100% Trusted Car rental platform in the UK
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-neutral-900 leading-[1.12]">
              FAST AND EASY WAY TO RENT A CAR
            </h1>

            {/* Description matching wireframe */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl font-normal">
              Our Car Rental online booking system designed to meet the specific needs of car rental business owners. This easy-to-use car rental software will let you manage.
            </p>

            {/* CTA Buttons matching wireframe */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                id="hero-booking-now-btn"
                onClick={onBookingNowClick}
                className="px-8 py-3.5 bg-white text-neutral-900 font-semibold text-base rounded-xl shadow-md hover:shadow-lg hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer border border-neutral-200/60"
              >
                Booking Now
              </button>
              
              <button
                id="hero-see-all-cars-btn"
                onClick={onSeeAllCarsClick}
                className="inline-flex items-center gap-2 text-base font-semibold text-neutral-700 hover:text-neutral-900 transition-colors group cursor-pointer"
              >
                See all cars
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Fleet Switcher Pills */}
            <div className="pt-4 flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500 mr-2">Quick Preview:</span>
              {(['suv', 'sport', 'luxury'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveCarPreview(key)}
                  className={`text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                    activeCarPreview === key 
                      ? 'bg-neutral-900 text-white shadow-sm' 
                      : 'bg-white/80 text-neutral-700 hover:bg-white'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Visual Container matching wireframe mockup layout */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/11] bg-neutral-400/80 rounded-[36px] overflow-hidden shadow-xl p-4 flex flex-col justify-between group border border-neutral-300/60">
              
              {/* Wireframe-styled background & photo */}
              <img
                src={previewVehicles[activeCarPreview].image}
                alt={previewVehicles[activeCarPreview].name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              
              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />

              {/* Wireframe icon badge overlay */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-neutral-900 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Featured Deal
                </span>

                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                  </svg>
                </div>
              </div>

              {/* Bottom Car Details Overlay */}
              <div className="relative z-10 text-white space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
                    {previewVehicles[activeCarPreview].name}
                  </h3>
                  <span className="text-lg font-black text-amber-300">
                    {previewVehicles[activeCarPreview].price}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-200">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {previewVehicles[activeCarPreview].rating}
                  </span>
                  <span>•</span>
                  <span>{previewVehicles[activeCarPreview].speed}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
