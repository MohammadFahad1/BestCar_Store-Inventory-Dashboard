import React from 'react';
import { RotateCw, ArrowUp } from 'lucide-react';
import {
  MoneyBagChartIllustration,
  TotalSalesCoinsIcon,
  PurchasedGoodsBagIcon,
} from './Illustrations';

interface KpiCardsProps {
  onRefreshSales?: () => void;
  onRefreshPurchases?: () => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  onRefreshSales,
  onRefreshPurchases,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Card 1: Weekly Earning (Span 6 cols on lg / 5 cols on md) */}
      <div className="md:col-span-12 lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-100/90 shadow-xs flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="space-y-2 z-10">
          <p className="text-xs md:text-sm font-semibold text-[#f97316] tracking-wide">
            Weekly Earning
          </p>
          <div className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight">
            $95000.45
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
            <span>48%</span>
            <span className="font-normal text-slate-500">increase compare to last week</span>
          </div>
        </div>

        {/* Right side 3D Money Bag Chart Graphic */}
        <div className="shrink-0 transform group-hover:scale-105 transition-transform duration-300">
          <img src="/weekly_earning_growth.png" alt="Weekly Earning Growth" className="w-24 h-24 sm:w-28 sm:h-28 object-contain" />
        </div>
      </div>

      {/* Card 2: No of Total Sales (Span 3 cols on lg / 6 cols on md) */}
      <div className="md:col-span-6 lg:col-span-3 bg-[#f97316] rounded-2xl p-5 md:p-6 text-white shadow-xs flex flex-col justify-between relative group hover:shadow-md hover:bg-[#ea580c] transition-all min-h-[140px]">
        {/* Top Icon & Refresh */}
        <div className="flex items-start justify-between">
          <img src="/icon_no_of_total_sales.png" alt="Total Sales Icon" className="w-15 h-15 object-contain" />
          <button
            onClick={onRefreshSales}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors active:scale-95 cursor-pointer"
            title="Refresh sales count"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-0.5">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight">
            10,000+
          </div>
          <p className="text-xs md:text-sm font-medium text-white/90">
            No of Total Sales
          </p>
        </div>
      </div>

      {/* Card 3: No of Purchased Goods (Span 3 cols on lg / 6 cols on md) */}
      <div className="md:col-span-6 lg:col-span-3 bg-[#0d1d38] rounded-2xl p-5 md:p-6 text-white shadow-xs flex flex-col justify-between relative group hover:shadow-md hover:bg-[#0b172e] transition-all min-h-[140px]">
        {/* Top Icon & Refresh */}
        <div className="flex items-start justify-between">
          <img src="/no_of_purchased_goods_icon.png" alt="Purchased Goods Icon" className="w-15 h-15 object-contain" />
          <button
            onClick={onRefreshPurchases}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors active:scale-95 cursor-pointer"
            title="Refresh goods count"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-0.5">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight">
            800+
          </div>
          <p className="text-xs md:text-sm font-medium text-white/90">
            No of Purchased Goods
          </p>
        </div>
      </div>
    </div>
  );
};
