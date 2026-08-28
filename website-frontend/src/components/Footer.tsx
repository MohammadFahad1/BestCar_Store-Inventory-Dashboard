import React from 'react';
import { Car as CarIcon, Facebook, Twitter, Instagram, Disc as Discord } from 'lucide-react';

interface FooterProps {
  onLinkClick: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer id="main-footer" className="bg-[#b8b8b8] text-neutral-900 pt-16 pb-12 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-400/50">
          
          {/* Brand Info & Vision Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold">
                <CarIcon className="w-4 h-4" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-neutral-900">
                Logo
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 max-w-sm leading-relaxed font-normal">
              Our vision is to provide convenience and help increase your sales business.
            </p>

            {/* Social Icons matching wireframe */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* About Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 font-medium">
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick('how-it-works');
                  }}
                  className="hover:text-neutral-900 hover:underline transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#rental-deals"
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick('rental-deals');
                  }}
                  className="hover:text-neutral-900 hover:underline transition-colors"
                >
                  Featured
                </a>
              </li>
              <li>
                <a
                  href="#why-choose-us"
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick('why-choose-us');
                  }}
                  className="hover:text-neutral-900 hover:underline transition-colors"
                >
                  Partnership
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-neutral-900 hover:underline transition-colors">
                  Business Relations
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Community
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 font-medium">
              <li>
                <a href="#home" className="hover:text-neutral-900 hover:underline transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-neutral-900 hover:underline transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-neutral-900 hover:underline transition-colors">
                  Podcast
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-neutral-900 hover:underline transition-colors">
                  Invite a friend
                </a>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Socials
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 font-medium">
              <li>
                <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-neutral-900 hover:underline transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-neutral-900 hover:underline transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-neutral-900 hover:underline transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-neutral-900 hover:underline transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-neutral-800 font-semibold gap-4">
          <div>
            ©2026 Best Auto. All rights reserved
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-black hover:underline transition-colors">
              Privacy & Policy
            </a>
            <a href="#terms" className="hover:text-black hover:underline transition-colors">
              Terms & Condition
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
