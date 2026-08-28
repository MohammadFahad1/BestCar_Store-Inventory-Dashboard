import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { monthlySalesData } from '../data/mockData';
import { dashboardApi } from '../services/api';

interface SalesAnalyticsChartProps {
  className?: string;
}

export const SalesAnalyticsChart: React.FC<SalesAnalyticsChartProps> = ({ className = '' }) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ month: string; sales: number }[]>(monthlySalesData);

  const years = ['2024', '2023', '2022', '2021'];

  useEffect(() => {
    dashboardApi.getSalesChart(selectedYear).then((data) => {
      if (data && data.length > 0) {
        setChartData(data);
      }
    });
  }, [selectedYear]);

  // Dimensions & scaling
  const width = 640;
  const height = 220;
  const paddingLeft = 36;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Max scale is 70k (0 to 70)
  const maxY = 70;
  const yTicks = [10, 20, 30, 40, 50, 60, 70];

  // Calculate coordinates for points
  const activeDataset = chartData.length > 0 ? chartData : monthlySalesData;
  const points = activeDataset.map((d, index) => {
    const x = paddingLeft + (index / (activeDataset.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.sales / maxY) * chartHeight;
    return { x, y, data: d };
  });

  // Generate smooth cubic bezier curve
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div className={`bg-white rounded-2xl p-5 md:p-6 border border-slate-100/90 shadow-xs flex flex-col justify-between h-full ${className}`}>
      {/* Header with Title and Year Selector */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
          Sales Analytics
        </h2>

        <div className="relative">
          <button
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedYear}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isYearDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                    selectedYear === year
                      ? 'bg-orange-50 text-[#f97316] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{year}</span>
                  {selectedYear === year && <Check className="w-3.5 h-3.5 text-[#f97316]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Smooth SVG Chart */}
      <div className="relative w-full overflow-hidden select-none mt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            {/* Orange Gradient Fill */}
            <linearGradient id="salesOrangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#f97316" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines and Y-Axis Labels */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxY) * chartHeight;
            return (
              <g key={tick} className="text-slate-400">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1.2"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="11"
                  fontWeight="500"
                  fill="#94a3b8"
                >
                  {tick}k
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path
            d={areaPath}
            fill="url(#salesOrangeGradient)"
          />

          {/* Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="#f97316"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points and Hover Target Zones */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={pt.data.month}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Vertical hover guide line */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={paddingTop}
                    x2={pt.x}
                    y2={paddingTop + chartHeight}
                    stroke="#f97316"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.7"
                  />
                )}

                {/* Outer halo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke="#f97316"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150"
                />

                {/* Invisible large hit area for touch/hover */}
                <circle cx={pt.x} cy={pt.y} r={16} fill="transparent" />

                {/* X-Axis Month Label */}
                <text
                  x={pt.x}
                  y={paddingTop + chartHeight + 18}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isHovered ? '700' : '500'}
                  fill={isHovered ? '#0f172a' : '#64748b'}
                  className="transition-colors"
                >
                  {pt.data.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div
            className="absolute -top-1 pointer-events-none transform -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs shadow-xl transition-all duration-150 z-20"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${Math.max(10, (points[hoveredIndex].y / height) * 100 - 24)}%`,
            }}
          >
            <div className="font-bold text-[#fb923c]">
              {points[hoveredIndex].data.month} {selectedYear}
            </div>
            <div className="text-[11px] text-slate-300">
              Revenue: <span className="font-semibold text-white">${((points[hoveredIndex].data.sales || points[hoveredIndex].data.revenue || 0) * 1000).toLocaleString()}</span>
            </div>
            <div className="text-[10px] text-slate-400">
              {points[hoveredIndex].data.units || Math.round((points[hoveredIndex].data.sales || 0) * 12)} vehicles rented
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
