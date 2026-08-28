import React, { useState } from 'react';
import { Phone, Tag, MapPin, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS } from '../data/mockData';

export const WhyChooseUs: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'PhoneCall':
        return <Phone className="w-5 h-5" />;
      case 'Tag':
        return <Tag className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching wireframe */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            Why choose us
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* 2-Column Grid matching wireframe layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big square visual card matching wireframe placeholder */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square max-w-lg mx-auto w-full bg-[#b8b8b8] rounded-3xl overflow-hidden shadow-md flex items-center justify-center p-8 group border border-neutral-300">
              
              {/* High-res background image */}
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
                alt="Why choose best car rental UK"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              
              <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px]" />

              {/* Wireframe Mockup Icon Overlay matching image.png */}
              <div className="relative z-10 text-white/90 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-4">
                  <svg className="w-14 h-14 fill-white" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-wide uppercase bg-black/40 px-3 py-1 rounded-full text-white">
                  Premium UK Fleet
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: 3 Feature Items with rounded square icons matching wireframe */}
          <div className="lg:col-span-6 space-y-8">
            {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
              const isSelected = activeItem === idx;
              return (
                <div
                  key={item.id}
                  id={`why-us-item-${idx}`}
                  onClick={() => setActiveItem(idx)}
                  className={`flex items-start gap-5 p-4 rounded-2xl transition-all cursor-pointer ${
                    isSelected ? 'bg-white shadow-sm border border-neutral-200' : 'hover:bg-neutral-100/60'
                  }`}
                >
                  {/* Rounded square icon container matching wireframe */}
                  <div className="w-14 h-14 rounded-2xl bg-[#b8b8b8] text-neutral-800 flex items-center justify-center shrink-0 shadow-sm transition-colors">
                    {getIcon(item.iconName)}
                  </div>

                  {/* Feature Text */}
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
