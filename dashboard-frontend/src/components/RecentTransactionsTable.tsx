import React from 'react';
import { Clock } from 'lucide-react';
import { Transaction } from '../types';
import { CarThumbnail } from './CarThumbnail';

interface RecentTransactionsTableProps {
  transactions: Transaction[];
  onViewAll: () => void;
  onSelectTransaction?: (tx: Transaction) => void;
}

export const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({
  transactions,
  onViewAll,
  onSelectTransaction,
}) => {
  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Success':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#ecfdf5] text-[#059669] border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            Success
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#fef2f2] text-[#dc2626] border border-red-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            Cancelled
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#ecfeff] text-[#0891b2] border border-cyan-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2]" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100/90 shadow-xs flex flex-col justify-start h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
          Recent Transactions
        </h2>
        <button
          onClick={onViewAll}
          className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
        >
          View All
        </button>
      </div>

      {/* Table responsive container */}
      <div className="overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6">
        <table className="w-full text-left border-collapse min-w-[540px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] md:text-xs font-bold text-slate-700">
              <th className="py-3 px-2 w-8">#</th>
              <th className="py-3 px-3">Order Details</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 text-xs md:text-sm">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                onClick={() => onSelectTransaction?.(tx)}
                className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                {/* Number */}
                <td className="py-3.5 px-2 text-xs font-medium text-slate-500">
                  {tx.id}
                </td>

                {/* Order Details (Thumbnail + Car Name + Time) */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <CarThumbnail
                      name={tx.carName}
                      imageUrl={tx.carImage}
                      size="sm"
                      className="group-hover:ring-2 group-hover:ring-[#f97316]/30 transition-all"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 text-xs md:text-sm group-hover:text-[#f97316] transition-colors">
                        {tx.carName}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{tx.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Payment & Transaction Code */}
                <td className="py-3.5 px-3">
                  <p className="font-medium text-slate-800 text-xs md:text-sm">
                    {tx.paymentMethod}
                  </p>
                  <p className="text-[11px] text-[#2563eb] hover:underline font-mono">
                    {tx.transactionCode}
                  </p>
                </td>

                {/* Status Pill */}
                <td className="py-3.5 px-3">
                  {getStatusBadge(tx.status)}
                </td>

                {/* Amount */}
                <td className="py-3.5 px-3 text-right">
                  <span className="font-bold text-slate-900 text-xs md:text-sm">
                    ${tx.amount.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
