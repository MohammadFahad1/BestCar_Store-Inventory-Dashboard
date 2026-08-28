import React, { useState } from 'react';
import { Car as CarIcon, Heart, Menu, X, User, LogOut, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onLogout,
  favoritesCount,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'How it Work', href: '#how-it-works', id: 'how-it-works' },
    { name: 'Rental Deals', href: '#rental-deals', id: 'rental-deals' },
    { name: 'Why Choose Us', href: '#why-choose-us', id: 'why-choose-us' },
    { name: 'Testimonial', href: '#testimonials', id: 'testimonials' },
  ];

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          id="brand-logo-link"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home', '#home');
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <img src="/logo.png" alt="BestCar Logo" className="h-8 object-contain group-hover:scale-105 transition-transform" />
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id, link.href);
                }}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive ? 'text-neutral-900 font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Wishlist, Register & Login */}
        <div id="desktop-auth-actions" className="hidden lg:flex items-center space-x-5">
          {/* Wishlist button */}
          <button
            id="wishlist-toggle-btn"
            onClick={onOpenOpenWishlist => onOpenFavorites()}
            className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            title="Saved Cars"
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {user.isLoggedIn ? (
            <div className="flex items-center gap-3 pl-2 border-l border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs font-bold uppercase">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                    {user.name}
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                  </div>
                  <span className="text-[10px] text-neutral-500">Verified Driver</span>
                </div>
              </div>
              <button
                id="logout-btn"
                onClick={onLogout}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                id="header-register-btn"
                onClick={() => onOpenAuth('register')}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 px-3 py-2 transition-colors cursor-pointer"
              >
                Register
              </button>
              <button
                id="header-login-btn"
                onClick={() => onOpenAuth('login')}
                className="px-5 py-2.5 text-sm font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Log in
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenFavorites}
            className="p-2 text-neutral-600 hover:text-neutral-900 relative"
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute 0 right-0 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>
          
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id, link.href);
                }}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  activeSection === link.id ? 'bg-neutral-100 text-neutral-900 font-semibold' : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
            {user.isLoggedIn ? (
              <div className="flex items-center justify-between px-3 py-2 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">{user.name}</div>
                    <div className="text-xs text-neutral-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-neutral-700 bg-neutral-100 rounded-xl hover:bg-neutral-200"
                >
                  Register
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
