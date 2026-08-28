export type CarCategory = 'Popular' | 'Large Car' | 'Small Car' | 'Exclusive Car';

export interface Car {
  id: string;
  name: string;
  category: CarCategory;
  type: string; // e.g., 'SUV', 'Sedan', 'Coupe', 'Hatchback'
  pricePerDay: number;
  originalPrice?: number;
  image: string;
  gasolineCapacity: string; // e.g., '90L' or 'Electric (400 mi)'
  transmission: 'Manual' | 'Automatic';
  capacity: number; // number of people, e.g., 2, 4, 5, 7
  horsepower: number;
  mpg: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isExclusive?: boolean;
  features: string[];
  description: string;
  locationAvailability: string[];
}

export interface BookingDetails {
  carId: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffLocation: string;
  dropoffDate: string;
  dropoffTime: string;
  driverName: string;
  driverEmail: string;
  driverPhone: string;
  driverAge: number;
  insuranceType: 'basic' | 'standard' | 'premium';
  additionalOptions: {
    gps: boolean;
    childSeat: boolean;
    extraDriver: boolean;
    unlimitedMileage: boolean;
  };
  totalDays: number;
  totalPrice: number;
  bookingRef: string;
  createdAt: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  avatar: string;
  comment: string;
}

export interface LocationOption {
  id: string;
  name: string;
  city: string;
  address: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
}
