import React, { useState } from 'react';
import { X, Search, Filter, Download, ArrowUpDown } from 'lucide-react';
import { Transaction, TransactionStatus } from '../types';
import { CarThumbnail } from './CarThumbnail';

interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const TransactionsModal: React.FC<TransactionsModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  if (!isOpen) return null;

  const filtered = transactions.filter((tx) => {
    const matchesStatus = filterStatus === 'All' || tx.status === filterStatus;
    const matchesSearch =
      tx.carName.toLowerCase().includes(search.toLowerCase()) ||
      tx.paymentMethod.toLowerCase().includes(search.toLowerCase()) ||
      tx.transactionCode.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  }).sort((a, b) => {
    return sortAsc ? a.amount - b.amount : b.amount - a.amount;
  });

  const downloadCSV = () => {
    const headers = 'ID,Order Details,Payment Method,Transaction Code,Status,Amount,Date\n';
    const rows = filtered
      .map(
        (t) =>
          `"${t.id}","${t.carName}","${t.paymentMethod}","${t.transactionCode}","${t.status}",${t.amount},"${t.date || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${Date.now()}.csv`;
    a.click();
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'Success':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#ecfdf5] text-[#059669] border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            Success
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#fef2f2] text-[#dc2626] border border-red-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            Cancelled
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#ecfeff] text-[#0891b2] border border-cyan-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2]" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">All Recent Transactions</h3>
            <p className="text-xs text-slate-500">Full audit log of store orders &amp; payments</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by car or order..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#f97316]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-0.5 rounded-lg text-xs">
              {['All', 'Success', 'Cancelled', 'Pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-[#f97316] text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50"
              title="Sort by amount"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Amount</span>
            </button>

            <button
              onClick={downloadCSV}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-700">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Order Details</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 text-slate-500 font-medium">{tx.id}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <CarThumbnail name={tx.carName} imageUrl={tx.carImage} size="sm" />
                      <div>
                        <p className="font-semibold text-slate-900">{tx.carName}</p>
                        <p className="text-[11px] text-slate-400">{tx.timeAgo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-slate-800">{tx.paymentMethod}</p>
                    <p className="text-[11px] text-[#2563eb] font-mono">{tx.transactionCode}</p>
                  </td>
                  <td className="py-3 px-3">{getStatusBadge(tx.status)}</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    ${tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
