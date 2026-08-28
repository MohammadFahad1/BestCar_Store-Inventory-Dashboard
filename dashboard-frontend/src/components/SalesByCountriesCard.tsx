import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUp, Check } from 'lucide-react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import worldGeoData from '../data/world-110m.json';
import { dashboardApi } from '../services/api';

interface RegionInfo {
  regionName: string;
  sales: number;
  headerBg: string;
}

// Deep Navy Blue color for highlighted countries
const NAVY_COLOR = '#0F2C4C';
// Warm Orange color for highlighted region (Brazil / South America)
const ORANGE_COLOR = '#FF9C3D';
// Light gray color for inactive countries
const GRAY_COLOR = '#EAECEF';

// Specific country IDs from world-110m.json
const HIGHLIGHTED_NAVY_IDS = new Set([
  '840', // United States of America
  '156', // China
  '360', // Indonesia
  '180', // Dem. Rep. Congo
  '024', // Angola
  '894', // Zambia
]);

const HIGHLIGHTED_ORANGE_IDS = new Set([
  '076', // Brazil
]);

const SALES_DATA: Record<string, Record<string, RegionInfo>> = {
  'This Week': {
    Africa: { regionName: 'Africa', sales: 3455, headerBg: '#FF9C3D' },
    'North America': { regionName: 'North America', sales: 2890, headerBg: '#0F2C4C' },
    'East Asia': { regionName: 'China', sales: 3120, headerBg: '#0F2C4C' },
    'South America': { regionName: 'South America', sales: 980, headerBg: '#FF9C3D' },
    'Southeast Asia': { regionName: 'Indonesia', sales: 1850, headerBg: '#0F2C4C' },
    Europe: { regionName: 'Europe', sales: 1420, headerBg: '#0F2C4C' },
    Australia: { regionName: 'Australia', sales: 650, headerBg: '#0F2C4C' },
  },
  'This Month': {
    Africa: { regionName: 'Africa', sales: 14200, headerBg: '#FF9C3D' },
    'North America': { regionName: 'North America', sales: 11800, headerBg: '#0F2C4C' },
    'East Asia': { regionName: 'China', sales: 12500, headerBg: '#0F2C4C' },
    'South America': { regionName: 'South America', sales: 4100, headerBg: '#FF9C3D' },
    'Southeast Asia': { regionName: 'Indonesia', sales: 7600, headerBg: '#0F2C4C' },
    Europe: { regionName: 'Europe', sales: 5800, headerBg: '#0F2C4C' },
    Australia: { regionName: 'Australia', sales: 2900, headerBg: '#0F2C4C' },
  },
  'This Quarter': {
    Africa: { regionName: 'Africa', sales: 42100, headerBg: '#FF9C3D' },
    'North America': { regionName: 'North America', sales: 35400, headerBg: '#0F2C4C' },
    'East Asia': { regionName: 'China', sales: 38900, headerBg: '#0F2C4C' },
    'South America': { regionName: 'South America', sales: 12300, headerBg: '#FF9C3D' },
    'Southeast Asia': { regionName: 'Indonesia', sales: 21800, headerBg: '#0F2C4C' },
    Europe: { regionName: 'Europe', sales: 17500, headerBg: '#0F2C4C' },
    Australia: { regionName: 'Australia', sales: 8400, headerBg: '#0F2C4C' },
  },
  'This Year': {
    Africa: { regionName: 'Africa', sales: 168500, headerBg: '#FF9C3D' },
    'North America': { regionName: 'North America', sales: 142000, headerBg: '#0F2C4C' },
    'East Asia': { regionName: 'China', sales: 154000, headerBg: '#0F2C4C' },
    'South America': { regionName: 'South America', sales: 49200, headerBg: '#FF9C3D' },
    'Southeast Asia': { regionName: 'Indonesia', sales: 87500, headerBg: '#0F2C4C' },
    Europe: { regionName: 'Europe', sales: 69000, headerBg: '#0F2C4C' },
    Australia: { regionName: 'Australia', sales: 33600, headerBg: '#0F2C4C' },
  },
};

export const SalesByCountriesCard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>('Africa');
  const [apiData, setApiData] = useState<Record<string, RegionInfo> | null>(null);

  const filterOptions = ['This Week', 'This Month', 'This Quarter', 'This Year'];

  useEffect(() => {
    const rangeKeyMap: Record<string, string> = {
      'This Week': 'week',
      'This Month': 'month',
      'This Quarter': 'quarter',
      'This Year': 'year',
    };
    const key = rangeKeyMap[timeFilter] || 'week';
    dashboardApi.getSalesByCountry(key).then((data) => {
      if (data && data.length > 0) {
        const transformed: Record<string, RegionInfo> = {};
        data.forEach((c) => {
          transformed[c.name] = {
            regionName: c.name,
            sales: c.salesCount,
            headerBg: c.colorTier === 'orange' ? ORANGE_COLOR : NAVY_COLOR,
          };
        });
        setApiData(transformed);
      }
    });
  }, [timeFilter]);

  const currentDataset = apiData || SALES_DATA[timeFilter] || SALES_DATA['This Week'];
  const activeInfo = currentDataset[selectedKey] || currentDataset['Africa'] || { regionName: 'Africa', sales: 3455, headerBg: NAVY_COLOR };

  const getCountryFill = (geoId: string) => {
    if (HIGHLIGHTED_NAVY_IDS.has(geoId)) {
      return NAVY_COLOR;
    }
    if (HIGHLIGHTED_ORANGE_IDS.has(geoId)) {
      return ORANGE_COLOR;
    }
    return GRAY_COLOR;
  };

  const getRegionKeyFromGeo = (geoName: string, geoId: string): string => {
    if (geoId === '840' || geoName === 'United States of America' || geoName === 'Canada') {
      return 'North America';
    }
    if (geoId === '156' || geoName === 'China') {
      return 'East Asia';
    }
    if (geoId === '360' || geoName === 'Indonesia') {
      return 'Southeast Asia';
    }
    if (geoId === '076' || geoName === 'Brazil') {
      return 'South America';
    }
    if (
      geoId === '180' ||
      geoId === '024' ||
      geoId === '894' ||
      geoName.includes('Congo') ||
      geoName === 'Angola' ||
      geoName === 'Zambia'
    ) {
      return 'Africa';
    }
    if (geoName === 'Australia') {
      return 'Australia';
    }
    return 'Africa';
  };

  const handleCountryHoverOrClick = (geoName: string, geoId: string) => {
    const key = getRegionKeyFromGeo(geoName, geoId);
    setSelectedKey(key);
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100/90 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
          Sales by Countries
        </h2>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <span>{timeFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setTimeFilter(opt);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                    timeFilter === opt
                      ? 'bg-orange-50 text-[#FF9C3D] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt}</span>
                  {timeFilter === opt && <Check className="w-3.5 h-3.5 text-[#FF9C3D]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* World Map Container with react-simple-maps */}
      <div className="relative w-full py-1 my-auto flex items-center justify-center min-h-[260px]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 145,
            center: [12, 15],
          }}
          className="w-full h-auto max-h-[285px] select-none outline-none"
        >
          <Geographies geography={worldGeoData}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.name !== 'Antarctica')
                .map((geo) => {
                  const geoId = String(geo.id);
                  const fillColor = getCountryFill(geoId);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#FFFFFF"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: 'none' },
                        hover: {
                          fill: fillColor === GRAY_COLOR ? '#CBD5E1' : fillColor,
                          outline: 'none',
                          cursor: 'pointer',
                        },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={() => handleCountryHoverOrClick(geo.properties.name, geoId)}
                      onClick={() => handleCountryHoverOrClick(geo.properties.name, geoId)}
                    />
                  );
                })
            }
          </Geographies>
        </ComposableMap>

        {/* Floating Tooltip Box matching exact design in screenshot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-md flex flex-col items-center z-10 min-w-[150px]">
          <div
            className="w-full text-center text-white text-sm font-semibold px-6 py-2 rounded-t-xl tracking-wide shadow-xs"
            style={{ backgroundColor: activeInfo.headerBg }}
          >
            {activeInfo.regionName}
          </div>
          <div className="w-full bg-white px-6 py-3 rounded-b-xl border-x border-b border-slate-100/80 text-slate-800 font-bold text-base shadow-xs text-center">
            {activeInfo.sales.toLocaleString()} Sales
          </div>
        </div>
      </div>

      {/* Bottom Metric */}
      <div className="pt-2 flex items-center justify-start gap-1.5 text-xs sm:text-sm font-semibold text-emerald-500">
        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
        <span className="font-bold text-emerald-500">48%</span>
        <span className="font-normal text-slate-500">increase compare to last week</span>
      </div>
    </div>
  );
};


