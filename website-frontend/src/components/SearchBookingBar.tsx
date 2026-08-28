import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Search, ChevronDown, ArrowRightLeft } from 'lucide-react';
import { LOCATIONS, TIME_SLOTS } from '../data/mockData';

interface SearchBookingBarProps {
  onSearch: (criteria: {
    pickupLocation: string;
    pickupDate: string;
    pickupTime: string;
    dropoffLocation: string;
    dropoffDate: string;
    dropoffTime: string;
  }) => void;
}

export const SearchBookingBar: React.FC<SearchBookingBarProps> = ({ onSearch }) => {
  // Default values
  const today = new Date().toISOString().split('T')[0];
  const nextThreeDays = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [pickupLocation, setPickupLocation] = useState('London Central (King\'s Cross)');
  const [pickupDate, setPickupDate] = useState(today);
  const [pickupTime, setPickupTime] = useState('10:00 AM');

  const [dropoffLocation, setDropoffLocation] = useState('London Heathrow Airport (LHR)');
  const [dropoffDate, setDropoffDate] = useState(nextThreeDays);
  const [dropoffTime, setDropoffTime] = useState('10:00 AM');

  const [pickupMode, setPickupMode] = useState<'pickup' | 'custom'>('pickup');
  const [dropoffMode, setDropoffMode] = useState<'dropoff' | 'custom'>('dropoff');

  const handleSwapLocations = () => {
    const tempLoc = pickupLocation;
    setPickupLocation(dropoffLocation);
    setDropoffLocation(tempLoc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      pickupLocation,
      pickupDate,
      pickupTime,
      dropoffLocation,
      dropoffDate,
      dropoffTime,
    });
  };

  return (
    <div className="relative -mt-10 sm:-mt-14 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        id="search-booking-bar-form"
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl shadow-neutral-900/5 border border-neutral-200/90 p-5 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
      >
        {/* Pick-Up Column */}
        <div className="lg:col-span-5 space-y-3">
          {/* Radio indicator matching wireframe */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="pickup-radio"
              name="pickup-radio"
              checked={true}
              readOnly
              className="w-4 h-4 text-neutral-900 focus:ring-neutral-900 accent-neutral-900"
            />
            <label htmlFor="pickup-radio" className="text-sm font-bold text-neutral-900 tracking-tight">
              Pick - Up
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Locations */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-900 mb-1">Locations</label>
              <div className="relative">
                <select
                  id="pickup-location-select"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer appearance-none pr-6 truncate"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.city} - {loc.name.split('(')[0]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-900 mb-1">Date</label>
              <input
                id="pickup-date-input"
                type="date"
                value={pickupDate}
                min={today}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-900 mb-1">Time</label>
              <div className="relative">
                <select
                  id="pickup-time-select"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer appearance-none pr-6"
                >
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Swap locations icon for responsive convenience */}
        <div className="hidden lg:flex lg:col-span-1 justify-center items-center">
          <button
            type="button"
            onClick={handleSwapLocations}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-transform hover:rotate-180"
            title="Swap Locations"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Drop-Off Column */}
        <div className="lg:col-span-5 space-y-3">
          {/* Radio indicator matching wireframe */}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="dropoff-radio"
              name="dropoff-radio"
              checked={true}
              readOnly
              className="w-4 h-4 text-neutral-900 focus:ring-neutral-900 accent-neutral-900"
            />
            <label htmlFor="dropoff-radio" className="text-sm font-bold text-neutral-900 tracking-tight">
              Drop - Off
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Locations */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-900 mb-1">Locations</label>
              <div className="relative">
                <select
                  id="dropoff-location-select"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer appearance-none pr-6 truncate"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.city} - {loc.name.split('(')[0]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-900 mb-1">Date</label>
              <input
                id="dropoff-date-input"
                type="date"
                value={dropoffDate}
                min={pickupDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-neutral-900 mb-1">Time</label>
              <div className="relative">
                <select
                  id="dropoff-time-select"
                  value={dropoffTime}
                  onChange={(e) => setDropoffTime(e.target.value)}
                  className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer appearance-none pr-6"
                >
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Button Column matching wireframe */}
        <div className="lg:col-span-1 flex items-end justify-center w-full pt-1 lg:pt-5">
          <button
            id="search-booking-submit-btn"
            type="submit"
            className="w-full h-11 lg:h-12 bg-neutral-100 hover:bg-neutral-900 text-neutral-900 hover:text-white font-semibold text-sm rounded-xl border border-neutral-300 hover:border-neutral-900 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Search
          </button>
        </div>

      </form>
    </div>
  );
};
