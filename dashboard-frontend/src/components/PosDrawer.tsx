import React, { useState } from 'react';
import { X, Monitor, ShoppingBag, Trash2, Plus, Minus, CreditCard, CheckCircle2 } from 'lucide-react';
import { CarItem, Transaction } from '../types';

interface PosDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: CarItem[];
  onCompleteSale: (transaction: Transaction) => void;
}

export const PosDrawer: React.FC<PosDrawerProps> = ({
  isOpen,
  onClose,
  inventory,
  onCompleteSale,
}) => {
  const [cart, setCart] = useState<{ car: CarItem; quantity: number }[]>([
    { car: inventory[0] || { id: 'pos-1', name: 'Range Rover', price: 260, salesCount: 6547, imageUrl: '' }, quantity: 1 },
  ]);
  const [selectedPayment, setSelectedPayment] = useState('Paypal');
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.car.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity += delta;
      if (next[index].quantity <= 0) {
        next.splice(index, 1);
      }
      return next;
    });
  };

  const addToCart = (car: CarItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.car.id === car.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx].quantity += 1;
        return next;
      }
      return [...prev, { car, quantity: 1 }];
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const primaryItem = cart[0];
    const newTx: Transaction = {
      id: Date.now() % 100000,
      carName: primaryItem.car.name,
      carImage: primaryItem.car.imageUrl,
      timeAgo: 'Just now',
      paymentMethod: selectedPayment,
      transactionCode: `#${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      status: 'Success',
      amount: total,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    onCompleteSale(newTx);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      setCart([]);
      onClose();
    }, 1200);
  };

  const paymentMethods = ['Paypal', 'Apple Pay', 'Stripe', 'PayU', 'Paytm', 'Cash'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Point of Sale (POS)</h3>
              <p className="text-[11px] text-slate-500">Fast checkout terminal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Quick Item Picker */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-2">Quick Add Item</h4>
            <div className="grid grid-cols-2 gap-2">
              {inventory.slice(0, 4).map((car) => (
                <button
                  key={car.id}
                  onClick={() => addToCart(car)}
                  className="p-2 border border-slate-200 rounded-lg text-left hover:border-[#f97316] hover:bg-orange-50/50 transition-colors flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-md bg-slate-100 shrink-0 overflow-hidden">
                    <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">{car.name}</p>
                    <p className="text-[11px] text-slate-500">${car.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cart Items */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
              <span>Current Order ({cart.length})</span>
            </h4>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No items in checkout order. Click an item above to add.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                {cart.map((item, idx) => (
                  <div key={item.car.id} className="p-3 flex items-center justify-between bg-white">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.car.name}</p>
                      <p className="text-[11px] text-slate-500">${item.car.price} each</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="p-1 text-slate-500 hover:bg-slate-100 rounded-l-md"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="p-1 text-slate-500 hover:bg-slate-100 rounded-r-md"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-slate-900 w-16 text-right">
                        ${(item.car.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method Selector */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-slate-500" />
              <span>Payment Gateway</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedPayment(method)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    selectedPayment === method
                      ? 'border-[#f97316] bg-orange-50 text-[#f97316] font-bold shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer & Checkout button */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
              <span>Total Due</span>
              <span className="text-[#f97316]">${total.toFixed(2)}</span>
            </div>
          </div>

          {successNotice ? (
            <div className="bg-emerald-500 text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4" />
              <span>Payment Processed Successfully!</span>
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full py-2.5 bg-[#f97316] hover:bg-[#ea580c] disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              Complete Sale (${total.toFixed(2)})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
