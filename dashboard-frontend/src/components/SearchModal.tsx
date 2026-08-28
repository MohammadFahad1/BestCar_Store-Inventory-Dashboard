import React, { useEffect, useState } from 'react';
import { Search, X, Car, Receipt, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CarItem, Transaction } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: CarItem[];
  transactions: Transaction[];
  onSelectCar: (car: CarItem) => void;
  onSelectTransaction: (tx: Transaction) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  inventory,
  transactions,
  onSelectCar,
  onSelectTransaction,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle is handled in parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCars = inventory.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.category && c.category.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredTransactions = transactions.filter((t) =>
    t.carName.toLowerCase().includes(query.toLowerCase()) ||
    t.paymentMethod.toLowerCase().includes(query.toLowerCase()) ||
    t.transactionCode.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="relative flex items-center p-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type vehicle name, transaction code, or payment method..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-4">
          {/* Vehicles Section */}
          {filteredCars.length > 0 && (
            <div>
              <p className="px-2 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Vehicles &amp; Best Sellers
              </p>
              <div className="space-y-1">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => {
                      onSelectCar(car);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-orange-50/70 text-slate-800 hover:text-[#f97316] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{car.name}</p>
                        <p className="text-[11px] text-slate-400">${car.price.toLocaleString()} • {car.salesCount} sold</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#f97316]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transactions Section */}
          {filteredTransactions.length > 0 && (
            <div>
              <p className="px-2 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Recent Transactions
              </p>
              <div className="space-y-1">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => {
                      onSelectTransaction(tx);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center text-[#2563eb]">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{tx.carName} — {tx.paymentMethod}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{tx.transactionCode} • ${tx.amount.toFixed(2)}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {tx.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCars.length === 0 && filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search automotive catalog &amp; transactions</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Select
          </span>
        </div>
      </div>
    </div>
  );
};
