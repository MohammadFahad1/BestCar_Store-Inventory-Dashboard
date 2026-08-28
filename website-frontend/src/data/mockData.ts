import { LocationOption, TestimonialItem } from '../types';

export const LOCATIONS: LocationOption[] = [
  { id: 'loc-1', name: 'London Central (King\'s Cross)', city: 'London', address: 'Euston Rd, London N1 9AL' },
  { id: 'loc-2', name: 'London Heathrow Airport (LHR)', city: 'London', address: 'Terminal 2 & 3, Hounslow TW6 1AP' },
  { id: 'loc-3', name: 'London Gatwick Airport (LGW)', city: 'London', address: 'South Terminal, Horley RH6 0NP' },
  { id: 'loc-4', name: 'Manchester City Center', city: 'Manchester', address: 'Piccadilly Station Approach, M1 2GH' },
  { id: 'loc-5', name: 'Birmingham New Street', city: 'Birmingham', address: 'Station St, Birmingham B2 4QA' },
  { id: 'loc-6', name: 'Edinburgh Waverley', city: 'Edinburgh', address: 'Princes St, Edinburgh EH1 1BB' },
  { id: 'loc-7', name: 'Bristol Temple Meads', city: 'Bristol', address: 'Redcliffe, Bristol BS1 6QF' },
  { id: 'loc-8', name: 'Leeds City Station', city: 'Leeds', address: 'New Station St, Leeds LS1 4DY' },
];

export const TIME_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Viezh Robert',
    location: 'Warsaw, Poland',
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    comment: '“Wow... I am very happy to use this car rental service, it turned out to be more than my expectations and so far there have been no problems. Best Auto is always the best”.'
  },
  {
    id: 't-2',
    name: 'Yessica Christy',
    location: 'Shanxi, China',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
    comment: '“I like it because I like to travel far and still can make my trip very comfortable and peaceful without any vehicle breakdown or hidden charges”.'
  },
  {
    id: 't-3',
    name: 'Kim Young Jou',
    location: 'Seoul, South Korea',
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    comment: '“This is very unusual for my business trip. Everything was ready within 5 minutes at Heathrow Airport. Highly recommend their clean luxury fleet”.'
  },
  {
    id: 't-4',
    name: 'Alexander Wright',
    location: 'London, United Kingdom',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    comment: '“Seamless experience from online reservation to drop-off. The Range Rover Sport was immaculate, and customer service went above and beyond”.'
  },
  {
    id: 't-5',
    name: 'Sophia Martinez',
    location: 'Madrid, Spain',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    comment: '“Great transparent rates with zero unexpected surcharges. The pick-up at Manchester station was lightning-fast and courteous”.'
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    id: 'wc-1',
    title: 'Customer Support',
    description: 'Extremely responsive customer support provided by the team at best car rental UK 24/7.',
    iconName: 'PhoneCall'
  },
  {
    id: 'wc-2',
    title: 'Best Price Guaranteed',
    description: 'Extremely best prices for all category people offered at the best car rental UK with price-match promise.',
    iconName: 'Tag'
  },
  {
    id: 'wc-3',
    title: 'Many Location',
    description: 'Extremely the best location and available near the big cities and major airport terminals. Just visit best car rental UK.',
    iconName: 'MapPin'
  }
];

export const PROMO_BANNERS = [
  {
    id: 'promo-1',
    badge: 'Special Weekend Offer',
    title: 'The Best Platform for Car Rental',
    description: 'Ease of doing a car rental safely and reliably. Of course at a simplified low price.',
    cta: 'Rental Car',
    tagColor: 'bg-neutral-900 text-white',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    accent: 'from-neutral-900 to-neutral-800'
  },
  {
    id: 'promo-2',
    badge: 'Exclusive Experience',
    title: 'Easy way to rent a car at a low price',
    description: 'Providing cheap car rental services and safe and comfortable facilities for long journeys.',
    cta: 'Explore Fleet',
    tagColor: 'bg-neutral-800 text-white',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    accent: 'from-neutral-800 to-neutral-700'
  }
];
