import { CarItem, Transaction } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export interface DashboardKpis {
  weeklyEarnings: number;
  weeklyEarningsGrowth: number;
  totalSalesCount: number;
  totalSalesGrowth: number;
  purchasedGoodsCount: number;
  purchasedGoodsGrowth: number;
}

export interface CountrySaleMetric {
  code: string;
  name: string;
  salesCount: number;
  revenue: number;
  colorTier: 'navy' | 'orange';
}

export interface WebhookLogItem {
  id: string;
  eventType: 'booking.created' | 'lead.qualified' | 'inventory.alert' | 'webhook.dispatched';
  title: string;
  leadScore?: number;
  leadTier?: 'High' | 'Medium' | 'Low';
  payload: Record<string, any>;
  timestamp: string;
  status: '200 OK' | 'Pending' | 'Queued';
}

export const dashboardApi = {
  // Fetch KPI cards metrics
  async getKpis(): Promise<DashboardKpis | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/kpis/`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      const first = data[0];
      if (!first) return null;
      return {
        weeklyEarnings: Number(first.weekly_earnings),
        weeklyEarningsGrowth: Number(first.weekly_earnings_growth),
        totalSalesCount: first.total_sales_count,
        totalSalesGrowth: Number(first.total_sales_growth),
        purchasedGoodsCount: first.purchased_goods_count,
        purchasedGoodsGrowth: Number(first.purchased_goods_growth),
      };
    } catch (err) {
      console.warn('KPI API offline, using local state:', err);
      return null;
    }
  },

  // Fetch Sales by Countries map data filtered by timeRange
  async getSalesByCountry(timeRange: string = 'week'): Promise<CountrySaleMetric[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/sales-by-country/?time_range=${timeRange}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.map((item: any) => ({
        code: item.country_code,
        name: item.country_name,
        salesCount: item.sales_count,
        revenue: Number(item.revenue),
        colorTier: item.color_tier || 'navy',
      }));
    } catch (err) {
      console.warn('SalesByCountry API offline, using fallback:', err);
      return [];
    }
  },

  // Fetch Best Sellers vehicle inventory
  async getBestSellers(): Promise<CarItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/fleet/vehicles/?ordering=-sales_count`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.map((item: any) => ({
        id: `car-${item.id}`,
        name: item.name,
        price: Number(item.price_per_day),
        salesCount: item.sales_count || 100,
        imageUrl: item.image_url || '/cars/range_rover.jpg',
      }));
    } catch (err) {
      console.warn('BestSellers API offline, using fallback:', err);
      return [];
    }
  },

  // Fetch Recent Transactions
  async getRecentTransactions(): Promise<Transaction[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/transactions/`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.map((item: any) => ({
        id: item.id,
        carName: item.vehicle_name || 'Range Rover Sport',
        carImage: '/cars/range_rover.jpg',
        paymentMethod: item.payment_method,
        transactionCode: item.transaction_code,
        status: item.status,
        amount: Number(item.amount),
        timeAgo: item.time_ago || 'Just now',
      }));
    } catch (err) {
      console.warn('Transactions API offline, using fallback:', err);
      return [];
    }
  },

  // POS / Dashboard Booking Creation
  async createRentalBooking(bookingData: {
    carName: string;
    amount: number;
    customerName?: string;
  }): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/rentals/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle: 1,
          customer_name: bookingData.customerName || 'Walk-in Customer (POS)',
          customer_email: 'pos@bestcar.com',
          pickup_location: 'London Heathrow Terminal 5',
          return_location: 'London Heathrow Terminal 5',
          pickup_date: new Date().toISOString(),
          return_date: new Date(Date.now() + 86400000 * 3).toISOString(),
          total_days: 3,
          total_price: bookingData.amount,
          status: 'Active',
        }),
      });
      return res.ok;
    } catch (err) {
      console.error('POS rental booking API error:', err);
      return false;
    }
  },

  // Add new vehicle to fleet inventory via API
  async createVehicle(vehicleData: {
    name: string;
    brand: string;
    pricePerDay: number;
    seats: number;
    fuelType: string;
    transmission: string;
    location: string;
  }): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/fleet/vehicles/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: vehicleData.name,
          brand: vehicleData.brand,
          price_per_day: vehicleData.pricePerDay,
          seats: vehicleData.seats,
          fuel_type: vehicleData.fuelType,
          transmission: vehicleData.transmission,
          location: vehicleData.location,
          image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
          status: 'Available',
          is_featured: true,
        }),
      });
      return res.ok;
    } catch (err) {
      console.error('Create vehicle API error:', err);
      return false;
    }
  },

  // Fetch Sales Analytics Chart Data
  async getSalesChart(year: string = '2024'): Promise<{ month: string; sales: number }[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/sales-chart/?year=${year}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.chart_data || [];
    } catch (err) {
      console.warn('SalesChart API offline, using fallback:', err);
      return [];
    }
  },

  // Fetch Webhook logs
  async getWebhookLogs(): Promise<WebhookLogItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/automations/logs/`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.map((item: any) => ({
        id: item.event_id || `evt-${item.id}`,
        eventType: item.event_type,
        title: item.title,
        leadScore: item.lead_score,
        leadTier: item.lead_tier,
        payload: item.payload,
        timestamp: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: item.status,
      }));
    } catch (err) {
      console.warn('Webhook logs API offline:', err);
      return [];
    }
  },

  // Trigger test webhook
  async triggerTestWebhook(): Promise<WebhookLogItem | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/automations/logs/trigger-test/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const item = await res.json();
      return {
        id: item.event_id,
        eventType: item.event_type,
        title: item.title,
        leadScore: item.lead_score,
        leadTier: item.lead_tier,
        payload: item.payload,
        timestamp: 'Just now',
        status: item.status,
      };
    } catch (err) {
      console.error('Trigger test webhook API error:', err);
      return null;
    }
  },
};
