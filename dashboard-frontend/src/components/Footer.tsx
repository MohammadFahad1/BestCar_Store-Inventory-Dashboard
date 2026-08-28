import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 pt-4 pb-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
      <p>2026 © All Right Reserved</p>
      <p className="hover:text-slate-600 transition-colors">
        Designed &amp; Developed
      </p>
    </footer>
  );
};
