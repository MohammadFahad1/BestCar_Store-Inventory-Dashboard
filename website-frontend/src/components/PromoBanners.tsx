import React from 'react';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';
import { PROMO_BANNERS } from '../data/mockData';

interface PromoBannersProps {
  onPromoClick: (promoId: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onPromoClick }) => {
  return (
    <section className="py-8 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROMO_BANNERS.map((promo) => (
            <div
              key={promo.id}
              id={`promo-card-${promo.id}`}
              className="relative aspect-[16/9] sm:aspect-[2/1] bg-[#ececec] rounded-3xl overflow-hidden shadow-sm flex items-center justify-center p-6 sm:p-8 group border border-neutral-300 transition-all hover:shadow-md cursor-pointer"
              onClick={() => onPromoClick(promo.id)}
            >
              {/* High-res background image */}
              <img
                src={promo.image}
                alt={promo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />

              {/* Dark subtle overlay for contrast */}
              <div className="absolute inset-0 bg-neutral-900/40" />

              {/* Center wireframe mockup placeholder icon matching image.png */}
              <div className="relative z-10 text-white flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                  <svg className="w-9 h-9 fill-white" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                  </svg>
                </div>

                <div className="space-y-1 max-w-sm">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/90 text-neutral-900 text-xs font-extrabold uppercase tracking-wider">
                    {promo.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight drop-shadow-sm">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-neutral-200 line-clamp-2">
                    {promo.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-1 px-5 py-2 rounded-xl bg-white text-neutral-900 font-bold text-xs hover:bg-neutral-100 flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  {promo.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
