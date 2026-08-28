import React from 'react';
import { MapPin, Calendar, Car as CarIcon } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 'step-1',
      title: 'Choose Location',
      description: 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.',
      icon: MapPin,
    },
    {
      id: 'step-2',
      title: 'Pick-up Date',
      description: 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.',
      icon: Calendar,
    },
    {
      id: 'step-3',
      title: 'Book your car',
      description: 'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.',
      icon: CarIcon,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold text-slate-900 tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Steps Grid Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Connector Wave 1: Between Icon 1 and Icon 2 */}
          <div className="hidden md:block absolute top-[44px] left-[20%] w-[26.5%] z-0 pointer-events-none">
            <img
              src="/Vector 5.png"
              alt="Wave Connector 1"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Connector Wave 2: Between Icon 2 and Icon 3 */}
          <div className="hidden md:block absolute top-[44px] left-[53.5%] w-[26.5%] z-0 pointer-events-none">
            <img
              src="/Vector 5.png"
              alt="Wave Connector 2"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center"
                >
                  {/* Soft Light Gray Squircle Icon Container */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[32px] bg-[#fff] text-[#b0b0b0] flex items-center justify-center mb-6 shadow-2xs">
                    <div className="w-22 h-22 flex justify-center items-center bg-[#f4f4f4] text-[#ff7718] p-3 rounded-[20px]">
                      <IconComponent className="w-11 h-11 fill-[#b0b0b0] text-[#f4f4f4] stroke-[1]" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl md:text-[22px] font-bold text-slate-900 mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[260px] font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
