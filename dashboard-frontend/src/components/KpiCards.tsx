import React from 'react';
import { RotateCw, ArrowUp } from 'lucide-react';
import {
  MoneyBagChartIllustration,
  TotalSalesCoinsIcon,
  PurchasedGoodsBagIcon,
} from './Illustrations';

interface KpiCardsProps {
  kpis?: {
    weeklyEarnings: number;
    weeklyEarningsGrowth: number;
    totalSalesCount: number;
    totalSalesGrowth: number;
    purchasedGoodsCount: number;
    purchasedGoodsGrowth: number;
  } | null;
  onRefreshSales?: () => void;
  onRefreshPurchases?: () => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  kpis,
  onRefreshSales,
  onRefreshPurchases,
}) => {
  const weeklyEarnings = kpis ? `$${kpis.weeklyEarnings.toLocaleString()}` : '$95000.45';
  const weeklyGrowth = kpis ? `${kpis.weeklyEarningsGrowth > 0 ? '+' : ''}${kpis.weeklyEarningsGrowth}%` : '+12.5%';
  const totalSales = kpis ? kpis.totalSalesCount.toLocaleString() : '6,547';
  const salesGrowth = kpis ? `${kpis.totalSalesGrowth > 0 ? '+' : ''}${kpis.totalSalesGrowth}%` : '+8.3%';
  const purchasedGoods = kpis ? kpis.purchasedGoodsCount.toLocaleString() : '1,478';
  const goodsGrowth = kpis ? `${kpis.purchasedGoodsGrowth > 0 ? '+' : ''}${kpis.purchasedGoodsGrowth}%` : '-2.1%';

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Card 1: Weekly Earning (Span 6 cols on lg / 5 cols on md) */}
      <div className="md:col-span-12 lg:col-span-6 bg-white rounded-2xl p-5 md:p-6 border border-slate-100/90 shadow-xs flex items-center justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="space-y-2 z-10">
          <p className="text-xs md:text-sm font-semibold text-[#f97316] tracking-wide">
            Weekly Earning
          </p>
          <div className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight">
            {weeklyEarnings}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <ArrowUp className="w-3.5 h-3.5 stroke-[3]" />
            <span>{weeklyGrowth}</span>
          </div>
        </div>

        {/* Image Illustration for Weekly Earning */}
        <div className="w-24 sm:w-28 md:w-32 lg:w-36 h-20 sm:h-24 flex items-center justify-end">
          <img
            src="/weekly_earning_growth.png"
            alt="Weekly Earning Growth"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Card 2: Total Sales (Span 3 cols on lg / 3.5 cols on md) */}
      <div className="md:col-span-6 lg:col-span-3 bg-amber-500 text-white rounded-2xl p-5 md:p-6 border border-slate-100/90 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/90 border border-amber-500/80 flex items-center justify-center p-2 shadow-2xs shrink-0">
            <img
              src="/icon_no_of_total_sales.png"
              alt="Total Sales"
              className="w-10 h-10 object-contain drop-shadow-xs contrast-125 brightness-95 transition-transform group-hover:scale-105"
            />
          </div>
          <button
            onClick={onRefreshSales}
            className="p-1 text-white hover:text-slate-600 transition-colors cursor-pointer"
            title="Refresh Sales"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{totalSales}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUp className="w-3 h-3 stroke-[3]" />
              {salesGrowth}
            </span>
          </div>
          <p className="text-xs font-medium text-white">No of Total Sales</p>
        </div>
      </div>

      {/* Card 3: Purchased Goods (Span 3 cols on lg / 3.5 cols on md) */}
      <div className="md:col-span-6 lg:col-span-3 bg-[#092c4c] rounded-2xl p-5 md:p-6 border border-slate-100/90 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center p-2 shadow-2xs shrink-0">
            <img
              src="/no_of_purchased_goods_icon.png"
              alt="Purchased Goods"
              className="w-10 h-10 object-contain drop-shadow-xs contrast-125 brightness-95 transition-transform group-hover:scale-105"
            />
          </div>
          <button
            onClick={onRefreshPurchases}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh Purchases"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{purchasedGoods}</span>
            <span className="text-xs font-semibold text-rose-500 flex items-center gap-0.5">
              {goodsGrowth}
            </span>
          </div>
          <p className="text-xs font-medium text-white">No of Purchased Goods</p>
        </div>
      </div>
    </div>
  );
};
