import { CarItem, Transaction, MonthlySalesData, SidebarSection } from '../types';

export const bestSellersData: CarItem[] = [
  {
    id: 'bs-1',
    name: 'Range Rover',
    price: 260,
    salesCount: 6547,
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=160&q=80',
    category: 'Luxury SUV',
  },
  {
    id: 'bs-2',
    name: 'Audi S3',
    price: 1474,
    salesCount: 3474,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=160&q=80',
    category: 'Sport Sedan',
  },
  {
    id: 'bs-3',
    name: 'Blue Nissan',
    price: 8784,
    salesCount: 1478,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=160&q=80',
    category: 'Sports Coupe',
  },
  {
    id: 'bs-4',
    name: 'Toyota Corolla',
    price: 3240,
    salesCount: 987,
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=160&q=80',
    category: 'Sedan',
  },
  {
    id: 'bs-5',
    name: 'Compact car',
    price: 597,
    salesCount: 784,
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=160&q=80',
    category: 'Compact',
  },
];

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    carName: 'Range Rover',
    carImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=160&q=80',
    timeAgo: '15 Mins',
    paymentMethod: 'Paypal',
    transactionCode: '#416645453773',
    status: 'Success',
    amount: 1099.00,
    date: '2024-01-07 14:30',
  },
  {
    id: 2,
    carName: 'Red Toyota',
    carImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=160&q=80',
    timeAgo: '15 Mins',
    paymentMethod: 'Apple Pay',
    transactionCode: '#147784454554',
    status: 'Cancelled',
    amount: 600.55,
    date: '2024-01-07 14:15',
  },
  {
    id: 3,
    carName: 'blue Nissan',
    carImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=160&q=80',
    timeAgo: '15 Mins',
    paymentMethod: 'Stripe',
    transactionCode: '#147784454554',
    status: 'Pending',
    amount: 200.10,
    date: '2024-01-07 13:55',
  },
  {
    id: 4,
    carName: 'Toyota Corolla',
    carImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=160&q=80',
    timeAgo: '15 Mins',
    paymentMethod: 'PayU',
    transactionCode: '#147784454554',
    status: 'Success',
    amount: 1569.00,
    date: '2024-01-07 13:40',
  },
  {
    id: 5,
    carName: 'Range Rover',
    carImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=160&q=80',
    timeAgo: '15 Mins',
    paymentMethod: 'Paytm',
    transactionCode: '#147784454554',
    status: 'Success',
    amount: 1478.00,
    date: '2024-01-07 13:10',
  },
];

export const monthlySalesData: MonthlySalesData[] = [
  { month: 'Jan', sales: 24, revenue: 24000, units: 142 },
  { month: 'Feb', sales: 30.5, revenue: 30500, units: 198 },
  { month: 'Mar', sales: 21, revenue: 21000, units: 110 },
  { month: 'Apr', sales: 23, revenue: 23000, units: 135 },
  { month: 'May', sales: 23, revenue: 23000, units: 128 },
  { month: 'Jun', sales: 31, revenue: 31000, units: 215 },
  { month: 'July', sales: 23.2, revenue: 23200, units: 140 },
  { month: 'Aug', sales: 21.5, revenue: 21500, units: 118 },
  { month: 'Sep', sales: 21, revenue: 21000, units: 122 },
];

export const sidebarNavigation: SidebarSection[] = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', name: 'Dashboard', iconName: 'LayoutGrid', isOpen: true, hasSubmenu: true },
      { id: 'super-admin', name: 'Super Admin', iconName: 'ShieldAlert', hasSubmenu: true },
    ],
  },
  {
    title: 'Inventory',
    items: [
      { id: 'products', name: 'Products', iconName: 'Package' },
      { id: 'create-product', name: 'Create Product', iconName: 'FilePlus' },
      { id: 'expired-products', name: 'Expired Products', iconName: 'Clock' },
      { id: 'low-stocks', name: 'Low Stocks', iconName: 'TrendingDown' },
      { id: 'category', name: 'Category', iconName: 'Grid' },
      { id: 'sub-category', name: 'Sub Category', iconName: 'Network' },
      { id: 'brands', name: 'Brands', iconName: 'Tag' },
      { id: 'units', name: 'Units', iconName: 'Layers' },
      { id: 'variant-attributes', name: 'Variant Attributes', iconName: 'Sliders' },
      { id: 'warranties', name: 'Warranties', iconName: 'ShieldCheck' },
      { id: 'print-barcode', name: 'Print Barcode', iconName: 'ScanLine' },
      { id: 'print-qrcode', name: 'Print QR Code', iconName: 'QrCode' },
    ],
  },
  {
    title: 'Stock',
    items: [
      { id: 'manage-stock', name: 'Manage Stock', iconName: 'Boxes' },
      { id: 'stock-adjustment', name: 'Stock Adjustment', iconName: 'ArrowLeftRight' },
      { id: 'stock-transfer', name: 'Stock Transfer', iconName: 'Truck' },
    ],
  },
  {
    title: 'Sales',
    items: [
      { id: 'sales', name: 'Sales', iconName: 'ShoppingCart', hasSubmenu: true },
      { id: 'invoices', name: 'Invoices', iconName: 'Receipt' },
      { id: 'sales-return', name: 'Sales Return', iconName: 'RotateCcw' },
      { id: 'quotation', name: 'Quotation', iconName: 'FileText' },
      { id: 'pos', name: 'POS', iconName: 'Monitor' },
    ],
  },
  {
    title: 'Promo',
    items: [
      { id: 'coupons', name: 'Coupons', iconName: 'Percent' },
    ],
  },
];
