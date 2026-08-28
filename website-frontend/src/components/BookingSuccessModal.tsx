import React, { useEffect } from 'react';
import { CheckCircle2, Calendar, MapPin, Download, Printer, ArrowRight, ShieldCheck, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingDetails, Car } from '../types';

interface BookingSuccessModalProps {
  booking: BookingDetails | null;
  car: Car | null;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ booking, car, onClose }) => {
  useEffect(() => {
    if (booking) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [booking]);

  if (!booking || !car) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-6">
        
        {/* Success Header */}
        <div className="bg-neutral-900 text-white p-6 sm:p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-block px-3 py-1 bg-neutral-800 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
            Reservation Confirmed
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Ready for the Road!
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mt-2">
            Booking reference <strong className="text-white tracking-widest">{booking.bookingRef}</strong> has been secured and sent to {booking.driverEmail}.
          </p>
        </div>

        {/* Voucher Ticket Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Car Mini Banner */}
          <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
            <img
              src={car.image}
              alt={car.name}
              className="w-24 h-16 object-cover rounded-xl shrink-0"
            />
            <div className="flex-1">
              <span className="text-[11px] font-bold text-neutral-500">{car.type} • {car.transmission}</span>
              <h4 className="text-base font-extrabold text-neutral-900">{car.name}</h4>
              <span className="text-xs font-bold text-neutral-700">${car.pricePerDay}/day</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-500 block">Total Paid</span>
              <span className="text-lg font-black text-neutral-900">${booking.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Pick-up</span>
              <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                {booking.pickupLocation}
              </div>
              <div className="text-xs text-neutral-600 pl-5">
                {booking.pickupDate} at {booking.pickupTime}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Drop-off</span>
              <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                {booking.dropoffLocation}
              </div>
              <div className="text-xs text-neutral-600 pl-5">
                {booking.dropoffDate} at {booking.dropoffTime}
              </div>
            </div>
          </div>

          {/* Driver details */}
          <div className="border-t border-neutral-200 pt-4 flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-2">
            <div><strong>Driver:</strong> {booking.driverName} ({booking.driverAge} yrs)</div>
            <div><strong>Phone:</strong> {booking.driverPhone}</div>
            <div><strong>Coverage:</strong> {booking.insuranceType.toUpperCase()}</div>
          </div>

          {/* Simulated Barcode / QR */}
          <div className="bg-neutral-100 p-4 rounded-2xl flex flex-col items-center justify-center border border-dashed border-neutral-300 text-center">
            <div className="font-mono tracking-[0.4em] text-xs font-bold text-neutral-800 mb-1">
              ||| | ||||| || |||| ||| |||| || |
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Present barcode at reception for instant key pickup</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Voucher
            </button>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold rounded-xl transition-colors ml-auto shadow-sm"
            >
              Done & Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
