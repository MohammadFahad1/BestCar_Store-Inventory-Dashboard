import React from 'react';

export const BestCarLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      {/* Stylized Car Swoosh Logo */}
      <svg className="h-8 w-auto" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Red / Blue swoosh lines representing speed and car outline */}
        <path
          d="M6 22C12 12 26 8 36 8C50 8 58 14 62 18C52 14 36 12 24 16C16 19 10 25 8 30"
          stroke="#EF4444"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M14 26C20 18 32 14 42 14C52 14 60 18 64 22"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M4 18C10 9 24 5 34 5"
          stroke="#EF4444"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* "3Best" text */}
        <text
          x="32"
          y="28"
          fill="#0F172A"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="-0.5px"
        >
          <tspan fill="#EF4444" fontSize="24" fontWeight="900">3</tspan>Best
        </text>
        {/* "Car" text */}
        <text
          x="88"
          y="28"
          fill="#2563EB"
          fontFamily="system-ui, sans-serif"
          fontWeight="600"
          fontSize="17"
          fontStyle="italic"
        >
          Car
        </text>
      </svg>
    </div>
  );
};

export const MoneyBagChartIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background soft glow / base */}
      <ellipse cx="60" cy="100" rx="45" ry="8" fill="#E2E8F0" opacity="0.6" />
      
      {/* Chart Bars Behind Money Bag */}
      {/* Bar 1 (Lowest) */}
      <rect x="70" y="65" width="10" height="30" rx="2" fill="#84CC16" stroke="#1E293B" strokeWidth="2.5" />
      {/* Bar 2 (Medium) */}
      <rect x="83" y="48" width="10" height="47" rx="2" fill="#EAB308" stroke="#1E293B" strokeWidth="2.5" />
      {/* Bar 3 (Highest) */}
      <rect x="96" y="32" width="10" height="63" rx="2" fill="#F97316" stroke="#1E293B" strokeWidth="2.5" />

      {/* Upward Growth Arrow */}
      <path
        d="M66 65L82 45L100 24"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M86 24H102V40"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Golden fill inside arrow */}
      <path
        d="M66 65L82 45L100 24"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M86 24H102V40"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Coins on ground */}
      <ellipse cx="48" cy="94" rx="14" ry="5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
      <ellipse cx="48" cy="91" rx="14" ry="5" fill="#FCD34D" stroke="#1E293B" strokeWidth="2" />
      
      <ellipse cx="62" cy="97" rx="12" ry="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
      <ellipse cx="62" cy="94" rx="12" ry="4" fill="#FCD34D" stroke="#1E293B" strokeWidth="2" />

      {/* Money Bag */}
      {/* Bag body */}
      <path
        d="M24 72C24 55 35 48 42 45C46 38 52 35 56 35C62 35 68 38 72 45C79 48 90 55 90 72C90 92 78 98 57 98C36 98 24 92 24 72Z"
        fill="#22C55E"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Bag highlight */}
      <path
        d="M32 68C32 58 38 52 45 49"
        stroke="#86EFAC"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Bag Neck Tied */}
      <path
        d="M44 44C44 44 50 48 57 48C64 48 70 44 70 44"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Golden Tie Rope */}
      <path
        d="M45 43C45 43 51 47 57 47C63 47 69 43 69 43"
        stroke="#FCD34D"
        strokeWidth="2.5"
      />
      {/* Dollar sign on Bag */}
      <text
        x="57"
        y="78"
        fill="#FFFFFF"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="24"
        stroke="#1E293B"
        strokeWidth="1.5"
        paintOrder="stroke fill"
      >
        $
      </text>
    </svg>
  );
};

export const TotalSalesCoinsIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stack of Coins */}
      <ellipse cx="20" cy="38" rx="10" ry="3" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <path d="M10 38V32C10 32 10 29 20 29C30 29 30 32 30 32V38" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      
      <ellipse cx="20" cy="32" rx="10" ry="3" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <path d="M10 32V26C10 26 10 23 20 23C30 23 30 26 30 26V32" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      
      <ellipse cx="20" cy="26" rx="10" ry="3" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      
      {/* Secondary mini coin stack */}
      <ellipse cx="32" cy="40" rx="8" ry="2.5" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <path d="M24 40V35C24 35 24 32.5 32 32.5C40 32.5 40 35 40 35V40" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <ellipse cx="32" cy="35" rx="8" ry="2.5" stroke="#FFFFFF" strokeWidth="2" fill="none" />

      {/* Upward Line and Arrow */}
      <path d="M16 20L26 12L36 16L44 8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 8H44V14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const PurchasedGoodsBagIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hand holding money/bag or Money Bag with Golden Line */}
      <path
        d="M20 18C20 14 24 10 28 10C32 10 36 14 36 18C40 21 42 27 42 34C42 41 36 43 28 43C20 43 14 41 14 34C14 27 16 21 20 18Z"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="28" cy="18" rx="8" ry="3" stroke="#F59E0B" strokeWidth="1.5" />
      {/* Dollar text */}
      <text x="28" y="32" fill="#F59E0B" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="sans-serif">$</text>

      {/* Coins falling into hand / bag */}
      <ellipse cx="14" cy="12" rx="4" ry="2" stroke="#F59E0B" strokeWidth="1.5" />
      <ellipse cx="14" cy="16" rx="4" ry="2" stroke="#F59E0B" strokeWidth="1.5" />
      
      {/* Small floating sparkles/coins */}
      <circle cx="38" cy="12" r="1.5" fill="#F59E0B" />
      <circle cx="42" cy="18" r="1" fill="#F59E0B" />
    </svg>
  );
};
