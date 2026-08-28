export interface CarItem {
  id: string;
  name: string;
  price: number;
  salesCount: number;
  imageUrl: string;
  colorHex?: string;
  category?: string;
}

export type TransactionStatus = 'Success' | 'Cancelled' | 'Pending';

export interface Transaction {
  id: number;
  carName: string;
  carImage: string;
  timeAgo: string;
  paymentMethod: string;
  transactionCode: string;
  status: TransactionStatus;
  amount: number;
  date?: string;
}

export interface MonthlySalesData {
  month: string;
  sales: number; // in thousands e.g. 24 for 24k
  revenue: number;
  units: number;
}

export interface CountrySale {
  id: string;
  name: string;
  salesCount: number;
  percentage: number;
  highlighted?: boolean;
  highlightColor?: string;
}

export interface SidebarItem {
  id: string;
  name: string;
  iconName: string;
  badge?: string;
  hasSubmenu?: boolean;
  isOpen?: boolean;
  subItems?: string[];
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}
