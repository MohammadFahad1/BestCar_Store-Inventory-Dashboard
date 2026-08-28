import React, { useState } from 'react';
import { X, Star, Users, Fuel, Gauge, Shield, Check, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { Car, BookingDetails } from '../types';
import { LOCATIONS, TIME_SLOTS } from '../data/mockData';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  onConfirmBooking: (booking: BookingDetails) => void;
  initialPickupLocation?: string;
  initialPickupDate?: string;
  initialPickupTime?: string;
  initialDropoffLocation?: string;
  initialDropoffDate?: string;
  initialDropoffTime?: string;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onConfirmBooking,
  initialPickupLocation = 'London Central (King\'s Cross)',
  initialPickupDate = new Date().toISOString().split('T')[0],
  initialPickupTime = '10:00 AM',
  initialDropoffLocation = 'London Heathrow Airport (LHR)',
  initialDropoffDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  initialDropoffTime = '10:00 AM',
}) => {
  if (!car) return null;

  const [pickupLocation, setPickupLocation] = useState(initialPickupLocation);
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [pickupTime, setPickupTime] = useState(initialPickupTime);
  const [dropoffLocation, setDropoffLocation] = useState(initialDropoffLocation);
  const [dropoffDate, setDropoffDate] = useState(initialDropoffDate);
  const [dropoffTime, setDropoffTime] = useState(initialDropoffTime);

  const [driverName, setDriverName] = useState('John Doe');
  const [driverEmail, setDriverEmail] = useState('johndoe@example.com');
  const [driverPhone, setDriverPhone] = useState('+44 7911 123456');
  const [driverAge, setDriverAge] = useState(28);

  const [insuranceType, setInsuranceType] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [additionalOptions, setAdditionalOptions] = useState({
    gps: true,
    childSeat: false,
    extraDriver: false,
    unlimitedMileage: true,
  });

  // Calculate rental duration in days
  const pDate = new Date(pickupDate);
  const dDate = new Date(dropoffDate);
  const timeDiff = Math.max(1, Math.ceil((dDate.getTime() - pDate.getTime()) / (1000 * 3600 * 24)));
  const rentalDays = isNaN(timeDiff) ? 1 : timeDiff;

  // Calculate pricing
  const basePrice = car.pricePerDay * rentalDays;
  const insurancePrice = insuranceType === 'premium' ? 25 * rentalDays : insuranceType === 'standard' ? 12 * rentalDays : 0;
  const optionsPrice = (additionalOptions.gps ? 8 * rentalDays : 0) +
                       (additionalOptions.childSeat ? 10 * rentalDays : 0) +
                       (additionalOptions.extraDriver ? 15 * rentalDays : 0) +
                       (additionalOptions.unlimitedMileage ? 14 * rentalDays : 0);
  const taxesAndFees = Math.round((basePrice + insurancePrice + optionsPrice) * 0.12);
  const totalPrice = basePrice + insurancePrice + optionsPrice + taxesAndFees;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'BA-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    onConfirmBooking({
      carId: car.id,
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffLocation,
      dropoffDate,
      dropoffTime,
      driverName,
      driverEmail,
      driverPhone,
      driverAge,
      insuranceType,
      additionalOptions,
      totalDays: rentalDays,
      totalPrice,
      bookingRef: randomRef,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/80">
          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{car.category} Rental</span>
            <h3 className="text-xl font-extrabold text-neutral-900">{car.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-8">
          
          {/* Car Overview Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Image Preview */}
            <div className="lg:col-span-6 relative aspect-[16/10] bg-neutral-100 rounded-2xl overflow-hidden shadow-inner border border-neutral-200">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                ${car.pricePerDay.toFixed(2)} / day
              </div>
            </div>

            {/* Quick Specs */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-700">{car.rating} ({car.reviewCount} reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {car.description}
              </p>

              {/* Spec Pills */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-neutral-500 font-bold block">CAPACITY</span>
                  <span className="text-xs font-bold text-neutral-900">{car.capacity} Passengers</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-neutral-500 font-bold block">GEARBOX</span>
                  <span className="text-xs font-bold text-neutral-900">{car.transmission}</span>
                </div>
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-2.5 text-center">
                  <span className="text-[10px] text-neutral-500 font-bold block">POWER</span>
                  <span className="text-xs font-bold text-neutral-900">{car.horsepower} HP</span>
                </div>
              </div>
            </div>

          </div>

          {/* Booking Config Form */}
          <form id="car-detail-booking-form" onSubmit={handleSubmitBooking} className="space-y-6 pt-4 border-t border-neutral-200">
            
            {/* Itinerary / Pick & Drop Config */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-700" />
                Pick-up & Drop-off Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
                {/* Pick up */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-700">Pick-up</span>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2 text-xs font-medium text-neutral-800"
                  >
                    {LOCATIONS.map(l => (
                      <option key={l.id} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={pickupDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="bg-white border border-neutral-300 rounded-xl p-2 text-xs font-medium text-neutral-800"
                    />
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="bg-white border border-neutral-300 rounded-xl p-2 text-xs font-medium text-neutral-800"
                    >
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Drop off */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-700">Drop-off</span>
                  <select
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-2 text-xs font-medium text-neutral-800"
                  >
                    {LOCATIONS.map(l => (
                      <option key={l.id} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={dropoffDate}
                      min={pickupDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      className="bg-white border border-neutral-300 rounded-xl p-2 text-xs font-medium text-neutral-800"
                    />
                    <select
                      value={dropoffTime}
                      onChange={(e) => setDropoffTime(e.target.value)}
                      className="bg-white border border-neutral-300 rounded-xl p-2 text-xs font-medium text-neutral-800"
                    >
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Options */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-neutral-700" />
                Insurance Protection
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'basic', name: 'Basic Cover', price: 'Included', desc: 'Standard collision damage waiver with $1,500 excess.' },
                  { id: 'standard', name: 'Standard Protection', price: '+$12/day', desc: 'Theft protection, zero glass deductible, $500 excess.' },
                  { id: 'premium', name: 'Full Peace of Mind', price: '+$25/day', desc: 'Zero excess, roadside 24/7 assistance, tire & windscreen.' },
                ].map((ins) => (
                  <div
                    key={ins.id}
                    onClick={() => setInsuranceType(ins.id as any)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      insuranceType === ins.id
                        ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-neutral-900">{ins.name}</span>
                      <span className="text-xs font-extrabold text-neutral-700">{ins.price}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-snug">{ins.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-neutral-900">Driver Contact Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={driverEmail}
                    onChange={(e) => setDriverEmail(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-600 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-600 block mb-1">Driver Age</label>
                  <input
                    type="number"
                    min={21}
                    max={85}
                    value={driverAge}
                    onChange={(e) => setDriverAge(parseInt(e.target.value) || 25)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="bg-neutral-900 text-white rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-300 pb-2 border-b border-neutral-800">
                <span>Rental Duration:</span>
                <span className="font-bold text-white">{rentalDays} Day{rentalDays > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>Base Rate (${car.pricePerDay} × {rentalDays}d)</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              {insurancePrice > 0 && (
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span>Insurance ({insuranceType})</span>
                  <span>${insurancePrice.toFixed(2)}</span>
                </div>
              )}
              {optionsPrice > 0 && (
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span>Selected Add-ons</span>
                  <span>${optionsPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>Estimated VAT & Municipal Surcharges</span>
                <span>${taxesAndFees.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-neutral-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 font-bold block">TOTAL ESTIMATED FARE</span>
                  <span className="text-2xl font-black text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 font-extrabold text-sm rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  Confirm & Reserve Now
                </button>
              </div>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
