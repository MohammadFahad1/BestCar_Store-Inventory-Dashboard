import { Car, BookingDetails } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

// Transform DRF Vehicle model to website Car interface
function transformVehicle(item: any): Car {
  return {
    id: `car-${item.id}`,
    name: item.name,
    type: item.category_name || 'SUV',
    pricePerDay: Number(item.price_per_day),
    seats: item.seats || 5,
    transmission: item.transmission || 'Automatic',
    fuelType: item.fuel_type || 'Petrol',
    mileageLimit: item.mileage_limit || 'Unlimited',
    image: item.image_url || item.image_file || '/cars/range_rover.jpg',
    location: item.location || 'London Heathrow',
    rating: Number(item.rating) || 4.9,
    reviewsCount: item.reviews_count || 120,
    isPopular: item.is_featured,
  };
}

export const websiteApi = {
  // Fetch vehicles catalog
  async getVehicles(category?: string): Promise<Car[]> {
    try {
      const url = new URL(`${API_BASE_URL}/fleet/vehicles/`);
      if (category && category !== 'All') {
        url.searchParams.append('category', category);
      }
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.map(transformVehicle);
    } catch (err) {
      console.warn('API connection failed, using fallback data:', err);
      return [];
    }
  },

  // Submit rental booking
  async createBooking(booking: {
    vehicleId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
    totalDays: number;
    totalPrice: number;
  }): Promise<{ success: boolean; reference?: string }> {
    try {
      const numId = parseInt(booking.vehicleId.replace('car-', ''), 10) || 1;
      const res = await fetch(`${API_BASE_URL}/bookings/rentals/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle: numId,
          customer_name: booking.customerName,
          customer_email: booking.customerEmail,
          customer_phone: booking.customerPhone,
          pickup_location: booking.pickupLocation,
          return_location: booking.returnLocation,
          pickup_date: new Date(booking.pickupDate).toISOString(),
          return_date: new Date(booking.returnDate).toISOString(),
          total_days: booking.totalDays,
          total_price: booking.totalPrice,
          status: 'Active',
        }),
      });

      if (!res.ok) throw new Error(`Booking submission failed ${res.status}`);
      const data = await res.json();
      return { success: true, reference: data.booking_reference };
    } catch (err) {
      console.error('Booking API error:', err);
      return { success: false };
    }
  },

  // Fetch wishlist from backend & local storage
  async getWishlist(): Promise<string[]> {
    try {
      const localFavsRaw = localStorage.getItem('bestcar_wishlist');
      const localFavs: string[] = localFavsRaw ? JSON.parse(localFavsRaw) : [];

      const res = await fetch(`${API_BASE_URL}/accounts/wishlist/`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      const apiFavs = data.map((item: any) => `car-${item.vehicle}`);

      // Combine both unique items for seamless persistence across reloads
      const combined = Array.from(new Set([...localFavs, ...apiFavs]));
      localStorage.setItem('bestcar_wishlist', JSON.stringify(combined));
      return combined;
    } catch (err) {
      console.warn('Wishlist API offline, using local storage:', err);
      const localFavsRaw = localStorage.getItem('bestcar_wishlist');
      return localFavsRaw ? JSON.parse(localFavsRaw) : [];
    }
  },

  // Toggle wishlist item in backend & local storage
  async toggleWishlist(carId: string, isFav: boolean): Promise<boolean> {
    try {
      const localFavsRaw = localStorage.getItem('bestcar_wishlist');
      let localFavs: string[] = localFavsRaw ? JSON.parse(localFavsRaw) : [];

      if (isFav) {
        localFavs = localFavs.filter((id) => id !== carId);
      } else {
        if (!localFavs.includes(carId)) localFavs.push(carId);
      }
      localStorage.setItem('bestcar_wishlist', JSON.stringify(localFavs));

      const numId = parseInt(carId.replace('car-', ''), 10) || 1;
      if (isFav) {
        // Remove from DRF Backend DB
        const listRes = await fetch(`${API_BASE_URL}/accounts/wishlist/?vehicle=${numId}`);
        if (listRes.ok) {
          const listData = await listRes.json();
          for (const item of listData) {
            await fetch(`${API_BASE_URL}/accounts/wishlist/${item.id}/`, {
              method: 'DELETE',
            });
          }
        }
      } else {
        // Add to DRF Backend DB
        await fetch(`${API_BASE_URL}/accounts/wishlist/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: 1, vehicle: numId }),
        });
      }
      return true;
    } catch (err) {
      console.error('Wishlist toggle API error:', err);
      return false;
    }
  },

  // Post query to AI Concierge
  async queryAiConcierge(queryText: string): Promise<{ text: string; vehicles: Car[] }> {
    try {
      const res = await fetch(`${API_BASE_URL}/automations/ai-concierge/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });
      if (!res.ok) throw new Error(`AI API error ${res.status}`);
      const data = await res.json();
      return {
        text: data.response,
        vehicles: (data.recommended_vehicles || []).map(transformVehicle),
      };
    } catch (err) {
      console.warn('AI Concierge fallback mode:', err);
      return { text: '', vehicles: [] };
    }
  },
};
