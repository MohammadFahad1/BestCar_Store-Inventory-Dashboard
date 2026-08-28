import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockData';

export const Testimonials: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCardsCount = 3;
  const maxIndex = Math.max(0, TESTIMONIALS_DATA.length - visibleCardsCount);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleTestimonials = TESTIMONIALS_DATA.slice(
    startIndex,
    startIndex + visibleCardsCount
  );

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching wireframe */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            Trusted by Thousands of Happy Customer
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Testimonials 3-Card Carousel matching wireframe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {visibleTestimonials.map((item) => (
            <div
              key={item.id}
              id={`testimonial-card-${item.id}`}
              className="bg-[#b8b8b8] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-400/40 text-neutral-900"
            >
              {/* Card Header: Avatar, Name, Location, Rating */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/80 shrink-0 bg-neutral-300"
                  />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-neutral-700 font-medium">
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white/40 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                  <span className="text-xs font-black text-neutral-900">
                    {item.rating.toFixed(1)}
                  </span>
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>
              </div>

              {/* Card Quote Body matching wireframe */}
              <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed italic">
                {item.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Controls matching wireframe: Dots on left, Arrow buttons on right */}
        <div className="flex items-center justify-between pt-4">
          
          {/* Pagination indicator dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  startIndex === idx
                    ? 'w-8 bg-neutral-900'
                    : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-900 text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-900 text-neutral-700 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Next testimonials"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
