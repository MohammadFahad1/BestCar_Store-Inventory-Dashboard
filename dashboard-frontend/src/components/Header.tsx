import React, { useState } from 'react';
import {
  Search,
  Plus,
  Monitor,
  Maximize2,
  Minimize2,
  Mail,
  Bell,
  Settings,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Car,
  Menu,
  Zap,
  ExternalLink,
} from 'lucide-react';
import { BestCarLogo } from './Illustrations';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  onOpenAddNew: () => void;
  onOpenPos: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenAutomations?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isSidebarCollapsed,
  onOpenAddNew,
  onOpenPos,
  onOpenSearch,
  onOpenNotifications,
  onOpenAutomations,
  searchQuery,
  setSearchQuery,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-xs select-none">
      {/* Desktop Sidebar Header Zone: starts at X=0 with width matching sidebar */}
      <div
        className={`flex items-center justify-between h-16 border-r border-slate-200/80 pl-4 md:pl-6 pr-4 shrink-0 transition-all duration-200 relative ${
          isSidebarCollapsed ? 'w-18' : 'w-56 lg:w-60'
        }`}
      >
        {/* Mobile Hamburger toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="BestCar Logo" className="h-7 md:h-8 object-contain" />
        </div>

        {/* Desktop Collapse / Expand Toggle Button centered on the vertical line */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center w-6 h-6 rounded-full bg-[#f97316] text-white hover:bg-[#ea580c] shadow-xs transition-transform active:scale-95 cursor-pointer z-20"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronsRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronsLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Main Header Content Area */}
      <div className="flex-1 flex items-center justify-between px-4 md:px-6">
        {/* Search Bar */}
        <div className="relative hidden sm:flex items-center">
          <div className="relative flex items-center w-56 md:w-64 lg:w-72">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={onOpenSearch}
              placeholder="Search"
              className="w-full pl-9 pr-14 py-1.5 bg-slate-50/90 hover:bg-slate-100/90 focus:bg-white text-xs md:text-sm text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/15 transition-all"
            />
            <div className="absolute right-2.5 flex items-center">
              <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-md shadow-2xs">
                ⌘ K
              </kbd>
            </div>
          </div>
        </div>

      {/* Right side: Action buttons & Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Coming Soon Dropdown */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setIsComingSoonOpen(!isComingSoonOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 rounded-lg text-xs font-medium text-slate-700 transition-colors"
          >
            <Car className="w-3.5 h-3.5 text-slate-800" />
            <span>Coming Soon</span>
            <ChevronDown className="w-3 h-3 text-slate-500 ml-0.5" />
          </button>
          
          {isComingSoonOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Upcoming Features
              </div>
              <button onClick={() => setIsComingSoonOpen(false)} className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-orange-50 hover:text-[#f97316] cursor-pointer">
                Spare Parts Catalog
              </button>
              <button onClick={() => setIsComingSoonOpen(false)} className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-orange-50 hover:text-[#f97316] cursor-pointer">
                Live Car Auctions
              </button>
              <button onClick={() => setIsComingSoonOpen(false)} className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-orange-50 hover:text-[#f97316] cursor-pointer">
                Insurance Estimator
              </button>
            </div>
          )}
        </div>

        {/* + Add New Button */}
        <button
          onClick={onOpenAddNew}
          className="flex items-center gap-1 px-3 md:px-3.5 py-1.5 bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white text-xs md:text-xs font-semibold rounded-lg shadow-2xs transition-all duration-150 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden xs:inline">Add New</span>
        </button>

        {/* POS Button */}
        <button
          onClick={onOpenPos}
          className="flex items-center gap-1 px-3 md:px-3.5 py-1.5 bg-[#0f172a] hover:bg-slate-800 active:bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-2xs transition-all duration-150 shrink-0 cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>POS</span>
        </button>

        {/* AI Automations & Webhooks Button */}
        <button
          onClick={onOpenAutomations}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-semibold rounded-lg shadow-2xs transition-all duration-150 shrink-0 cursor-pointer"
          title="AI Automations & Webhook Activity Log"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>AI Automations</span>
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200 hidden sm:block mx-0.5" />

        {/* Country Flag (US) */}
        <div
          className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 cursor-pointer shadow-2xs shrink-0 hover:ring-2 hover:ring-slate-300 transition-all flex items-center justify-center bg-slate-50"
          title="United States (English)"
        >
          <svg className="w-full h-full object-cover" viewBox="0 0 640 480">
            <g fillRule="evenodd">
              <path fill="#bd3d44" d="M0 0h640v480H0z"/>
              <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203.1h640M0 276.9h640M0 350.8h640M0 424.6h640"/>
              <path fill="#192f5d" d="M0 0h256v258.5H0z"/>
              <marker id="a" markerHeight="30" markerWidth="30">
                <path fill="#fff" d="m14 0 9 27-23-17h28L5 27z"/>
              </marker>
              <path fill="#fff" d="m20 18 3 9-8-6h10l-8 6zm50 0 3 9-8-6h10l-8 6zm50 0 3 9-8-6h10l-8 6zm50 0 3 9-8-6h10l-8 6zm50 0 3 9-8-6h10l-8 6z"/>
            </g>
          </svg>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="hidden md:flex p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Mail Icon with Badge */}
        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Messages"
        >
          <Mail className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
            01
          </span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Settings */}
        <button
          onClick={onOpenNotifications}
          className="hidden sm:flex p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-0.5 rounded-full ring-2 ring-transparent hover:ring-slate-300 focus:outline-hidden transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Mike Witzel"
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs"
            />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">Mike Witzel</p>
                <p className="text-[11px] text-slate-500 truncate">mike.witzel@bestcar.com</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-[#f97316] text-[10px] font-semibold rounded-full">
                  Super Admin
                </span>
              </div>
              <div className="py-1 text-xs text-slate-700">
                <button onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-4 py-1.5 hover:bg-slate-50 cursor-pointer">Profile Settings</button>
                <button onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-4 py-1.5 hover:bg-slate-50 cursor-pointer">Manage Dealerships</button>
                <button onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-4 py-1.5 hover:bg-slate-50 cursor-pointer">Subscription & Billing</button>
                <div className="my-1 border-t border-slate-100" />
                <button onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-4 py-1.5 text-red-600 hover:bg-red-50 font-medium cursor-pointer">Log out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
  );
};
