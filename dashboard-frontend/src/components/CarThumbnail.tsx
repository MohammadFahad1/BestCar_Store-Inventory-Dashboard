import React, { useState } from 'react';

interface CarThumbnailProps {
  name: string;
  imageUrl: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CarThumbnail: React.FC<CarThumbnailProps> = ({
  name,
  imageUrl,
  className = '',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  const getCarColor = (carName: string) => {
    const lower = carName.toLowerCase();
    if (lower.includes('blue')) return '#2563EB';
    if (lower.includes('red') || lower.includes('audi') || lower.includes('toyota')) return '#DC2626';
    if (lower.includes('range') || lower.includes('rover') || lower.includes('white')) return '#E2E8F0';
    if (lower.includes('compact') || lower.includes('black')) return '#1E293B';
    return '#64748B';
  };

  const dimClasses = {
    sm: 'w-10 h-8',
    md: 'w-12 h-9',
    lg: 'w-16 h-12',
  }[size];

  const primaryColor = getCarColor(name);
  const isWhite = primaryColor === '#E2E8F0';

  return (
    <div
      className={`relative ${dimClasses} rounded-lg overflow-hidden bg-slate-100/90 border border-slate-200/70 flex items-center justify-center shrink-0 ${className}`}
    >
      {!imgError ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Fallback dynamic stylized car vector */
        <svg className="w-4/5 h-4/5" viewBox="0 0 64 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow */}
          <ellipse cx="32" cy="32" rx="26" ry="3" fill="#94A3B8" opacity="0.4" />
          
          {/* Car Body */}
          <path
            d="M6 24C6 24 8 18 16 16C22 14 30 10 40 10C48 10 52 14 56 18C59 21 60 25 58 27C56 29 52 29 10 29C7 29 6 27 6 24Z"
            fill={primaryColor}
            stroke={isWhite ? '#94A3B8' : '#0F172A'}
            strokeWidth="1.5"
          />
          
          {/* Windshield & Windows */}
          <path
            d="M20 16L27 12H39L43 16H20Z"
            fill="#38BDF8"
            opacity="0.85"
            stroke="#0F172A"
            strokeWidth="1"
          />
          
          {/* Headlights */}
          <circle cx="56" cy="22" r="2" fill="#FEF08A" />
          <circle cx="8" cy="22" r="1.5" fill="#EF4444" />

          {/* Front Wheel */}
          <circle cx="46" cy="28" r="4.5" fill="#1E293B" />
          <circle cx="46" cy="28" r="2.5" fill="#CBD5E1" />
          
          {/* Rear Wheel */}
          <circle cx="16" cy="28" r="4.5" fill="#1E293B" />
          <circle cx="16" cy="28" r="2.5" fill="#CBD5E1" />
        </svg>
      )}
    </div>
  );
};
