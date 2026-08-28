import React, { useState } from 'react';
import {
  LayoutGrid,
  ShieldCheck,
  Package,
  FilePlus,
  Clock,
  TrendingDown,
  Grid,
  Network,
  Tag,
  Layers,
  Sliders,
  ScanLine,
  QrCode,
  Boxes,
  ArrowLeftRight,
  Truck,
  ShoppingCart,
  Receipt,
  RotateCcw,
  FileText,
  Monitor,
  Percent,
  ChevronDown,
  ChevronRight,
  X,
  UserCog,
} from 'lucide-react';
import { sidebarNavigation } from '../data/mockData';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  activeItem: string;
  setActiveItem: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  onCloseMobile,
  activeItem,
  setActiveItem,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dashboard: true,
    sales: false,
  });

  const toggleSubmenu = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const getIcon = (name: string, isActive: boolean) => {
    const iconProps = {
      className: `w-4 h-4 shrink-0 transition-colors ${
        isActive ? 'text-[#f97316]' : 'text-slate-500 group-hover:text-slate-700'
      }`,
    };

    switch (name) {
      case 'LayoutGrid':
        return <LayoutGrid {...iconProps} />;
      case 'ShieldAlert':
        return <UserCog {...iconProps} />;
      case 'Package':
        return <Package {...iconProps} />;
      case 'FilePlus':
        return <FilePlus {...iconProps} />;
      case 'Clock':
        return <Clock {...iconProps} />;
      case 'TrendingDown':
        return <TrendingDown {...iconProps} />;
      case 'Grid':
        return <Grid {...iconProps} />;
      case 'Network':
        return <Network {...iconProps} />;
      case 'Tag':
        return <Tag {...iconProps} />;
      case 'Layers':
        return <Layers {...iconProps} />;
      case 'Sliders':
        return <Sliders {...iconProps} />;
      case 'ShieldCheck':
        return <ShieldCheck {...iconProps} />;
      case 'ScanLine':
        return <ScanLine {...iconProps} />;
      case 'QrCode':
        return <QrCode {...iconProps} />;
      case 'Boxes':
        return <Boxes {...iconProps} />;
      case 'ArrowLeftRight':
        return <ArrowLeftRight {...iconProps} />;
      case 'Truck':
        return <Truck {...iconProps} />;
      case 'ShoppingCart':
        return <ShoppingCart {...iconProps} />;
      case 'Receipt':
        return <Receipt {...iconProps} />;
      case 'RotateCcw':
        return <RotateCcw {...iconProps} />;
      case 'FileText':
        return <FileText {...iconProps} />;
      case 'Monitor':
        return <Monitor {...iconProps} />;
      case 'Percent':
        return <Percent {...iconProps} />;
      default:
        return <Package {...iconProps} />;
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3">
      <div className="space-y-4">
        {sidebarNavigation.map((section) => (
          <div key={section.title} className="px-2">
            {!isCollapsed && (
              <h3 className="px-3 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = activeItem === item.id;
                const isSubmenuOpen = !!expandedSections[item.id];

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        setActiveItem(item.id);
                        if (item.hasSubmenu) {
                          setExpandedSections((prev) => ({
                            ...prev,
                            [item.id]: !prev[item.id],
                          }));
                        }
                      }}
                      title={isCollapsed ? item.name : undefined}
                      className={`w-full group flex items-center ${
                        isCollapsed ? 'justify-center px-2' : 'justify-between px-3'
                      } py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#fef2eb] text-[#f97316] font-semibold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {getIcon(item.iconName, isActive)}
                        {!isCollapsed && (
                          <span className="truncate">{item.name}</span>
                        )}
                      </div>

                      {!isCollapsed && item.hasSubmenu && (
                        <span
                          onClick={(e) => toggleSubmenu(item.id, e)}
                          className="p-0.5 text-slate-400 group-hover:text-slate-600"
                        >
                          {isSubmenuOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#f97316]" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom version info */}
      {!isCollapsed && (
        <div className="px-4 py-3 mx-2 mt-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <p className="text-[11px] font-bold text-slate-700">BestCar Dealership v2.4</p>
          <p className="text-[10px] text-slate-400">All systems online</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:hidden flex flex-col ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <span className="text-sm font-bold text-slate-800">Navigation Menu</span>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">{sidebarContent}</div>
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-slate-200/80 shrink-0 transition-all duration-200 select-none sticky top-16 h-[calc(100vh-4rem)] z-20 ${
          isCollapsed ? 'w-18' : 'w-56 lg:w-60'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
