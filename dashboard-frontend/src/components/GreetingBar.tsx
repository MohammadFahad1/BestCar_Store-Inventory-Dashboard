import React, { useState } from 'react';
import { Calendar, RotateCcw, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface GreetingBarProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  selectedRange: string;
  setSelectedRange: (range: string) => void;
  isStatsCollapsed: boolean;
  setIsStatsCollapsed: (collapsed: boolean) => void;
}

export const GreetingBar: React.FC<GreetingBarProps> = ({
  onRefresh,
  isRefreshing = false,
  selectedRange,
  setSelectedRange,
  isStatsCollapsed,
  setIsStatsCollapsed,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const datePresets = [
    '01 Jan 2024 - 07 Jan 2024',
    'Today (07 Jan 2024)',
    'Last 7 Days',
    'This Month (Jan 2024)',
    'Last Quarter (Q4 2023)',
    'Year to Date (2024)',
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
      {/* Greeting Title */}
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl select-none" role="img" aria-label="wave">
          👋
        </span>
        <h1 className="text-base md:text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
          Hi Mike Witzel,{' '}
          <span className="font-normal text-slate-600 text-sm md:text-base">
            here's what's happening with your store today.
          </span>
        </h1>
      </div>

      {/* Action Controls on Right */}
      <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
        {/* Date Filter Button */}
        <div className="relative">
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedRange}</span>
          </button>

          {isDatePickerOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-40 animate-in fade-in">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Select Date Range
              </div>
              {datePresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setSelectedRange(preset);
                    setIsDatePickerOpen(false);
                    onRefresh();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    selectedRange === preset
                      ? 'bg-orange-50 text-[#f97316] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{preset}</span>
                  {selectedRange === preset && <Check className="w-3.5 h-3.5 text-[#f97316]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reload / Refresh Button */}
        <button
          onClick={onRefresh}
          className={`w-9 h-9 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center shadow-2xs transition-all active:scale-95 ${
            isRefreshing ? 'animate-spin text-[#f97316]' : ''
          }`}
          title="Refresh store metrics"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Collapse / Expand Top Metrics */}
        <button
          onClick={() => setIsStatsCollapsed(!isStatsCollapsed)}
          className="w-9 h-9 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-lg flex items-center justify-center shadow-2xs transition-all active:scale-95"
          title={isStatsCollapsed ? 'Expand top cards' : 'Collapse top cards'}
        >
          {isStatsCollapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
