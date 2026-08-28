import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchBookingBar } from './components/SearchBookingBar';
import { HowItWorks } from './components/HowItWorks';
import { PopularCarDeals } from './components/PopularCarDeals';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PromoBanners } from './components/PromoBanners';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { CarDetailModal } from './components/CarDetailModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { AuthModal } from './components/AuthModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast, ToastMessage } from './components/Toast';
import { AiAssistantWidget } from './components/AiAssistantWidget';

import { CARS_DATA } from './data/cars';
import { Car, BookingDetails, UserProfile } from './types';

export default function App() {
  // Application State
  const [cars] = useState<Car[]>(CARS_DATA);
  const [favorites, setFavorites] = useState<string[]>(['car-1', 'car-4']);
  const [selectedCarForRental, setSelectedCarForRental] = useState<Car | null>(null);
  const [completedBooking, setCompletedBooking] = useState<BookingDetails | null>(null);
  const [bookedCar, setBookedCar] = useState<Car | null>(null);

  // Search filter criteria
  const [searchFilterLocation, setSearchFilterLocation] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<{
    pickupLocation: string;
    pickupDate: string;
    pickupTime: string;
    dropoffLocation: string;
    dropoffDate: string;
    dropoffTime: string;
  }>({
    pickupLocation: 'London Central (King\'s Cross)',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '10:00 AM',
    dropoffLocation: 'London Heathrow Airport (LHR)',
    dropoffDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dropoffTime: '10:00 AM',
  });

  // Modal controls
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [wishlistOpen, setWishlistOpen] = useState(false);
  
  // User Profile
  const [user, setUser] = useState<UserProfile>({
    name: 'Fahad',
    email: 'fahad@bestauto.co.uk',
    isLoggedIn: false,
  });

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', text: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle favorite
  const handleToggleFavorite = (carId: string) => {
    const isCurrentlyFav = favorites.includes(carId);
    const car = cars.find(c => c.id === carId);
    if (isCurrentlyFav) {
      setFavorites((prev) => prev.filter((id) => id !== carId));
      addToast('info', `Removed ${car?.name || 'car'} from your saved favorites.`);
    } else {
      setFavorites((prev) => [...prev, carId]);
      addToast('success', `Saved ${car?.name || 'car'} to your wishlist!`);
    }
  };

  // Search handler from the search bar
  const handleSearch = (criteria: typeof searchCriteria) => {
    setSearchCriteria(criteria);
    setSearchFilterLocation(criteria.pickupLocation);
    addToast('info', `Searching available cars near ${criteria.pickupLocation.split('(')[0]}...`);
    
    // Smooth scroll to the deals section
    const dealsElement = document.querySelector('#rental-deals');
    if (dealsElement) {
      dealsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Booking handlers
  const handleStartBooking = (car: Car) => {
    setSelectedCarForRental(car);
  };

  const handleBookingConfirmed = (booking: BookingDetails) => {
    setSelectedCarForRental(null);
    setBookedCar(cars.find(c => c.id === booking.carId) || null);
    setCompletedBooking(booking);
    addToast('success', `Booking ${booking.bookingRef} confirmed successfully!`);
  };

  // Navigation handlers
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar
        user={user}
        favoritesCount={favorites.length}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode);
          setAuthModalOpen(true);
        }}
        onLogout={() => {
          setUser({ ...user, isLoggedIn: false });
          addToast('info', 'You have been logged out.');
        }}
        onOpenFavorites={() => setWishlistOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onBookingNowClick={() => {
            const firstCar = cars[0];
            if (firstCar) handleStartBooking(firstCar);
          }}
          onSeeAllCarsClick={() => scrollToSection('rental-deals')}
        />

        <SearchBookingBar onSearch={handleSearch} />

        <HowItWorks />

        <PopularCarDeals
          cars={cars}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectCar={handleStartBooking}
          searchFilterLocation={searchFilterLocation}
        />

        <WhyChooseUs />

        <PromoBanners
          onPromoClick={(promoId) => {
            scrollToSection('rental-deals');
            addToast('info', 'Explore our current exclusive rental options below.');
          }}
        />

        <Testimonials />
      </main>

      <Footer onLinkClick={scrollToSection} />

      {/* Modals and Overlays */}
      {selectedCarForRental && (
        <CarDetailModal
          car={selectedCarForRental}
          onClose={() => setSelectedCarForRental(null)}
          onConfirmBooking={handleBookingConfirmed}
          initialPickupLocation={searchCriteria.pickupLocation}
          initialPickupDate={searchCriteria.pickupDate}
          initialPickupTime={searchCriteria.pickupTime}
          initialDropoffLocation={searchCriteria.dropoffLocation}
          initialDropoffDate={searchCriteria.dropoffDate}
          initialDropoffTime={searchCriteria.dropoffTime}
        />
      )}

      {completedBooking && (
        <BookingSuccessModal
          booking={completedBooking}
          car={bookedCar}
          onClose={() => setCompletedBooking(null)}
        />
      )}

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          addToast('success', `Welcome back, ${loggedUser.name}!`);
        }}
      />

      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        favorites={favorites}
        allCars={cars}
        onRemoveFavorite={handleToggleFavorite}
        onSelectCar={handleStartBooking}
      />

      {/* Toast Notification Manager */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Floating AI Concierge Assistant */}
      <AiAssistantWidget cars={cars} onSelectCar={handleStartBooking} />

    </div>
  );
}
