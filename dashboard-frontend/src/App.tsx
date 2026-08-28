import React, { useState, useEffect } from 'react';
import { bestSellersData, initialTransactions } from './data/mockData';
import { CarItem, Transaction } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GreetingBar } from './components/GreetingBar';
import { KpiCards } from './components/KpiCards';
import { BestSellerCard } from './components/BestSellerCard';
import { RecentTransactionsTable } from './components/RecentTransactionsTable';
import { SalesAnalyticsChart } from './components/SalesAnalyticsChart';
import { SalesByCountriesCard } from './components/SalesByCountriesCard';
import { Footer } from './components/Footer';
import { AddNewModal } from './components/AddNewModal';
import { PosDrawer } from './components/PosDrawer';
import { SearchModal } from './components/SearchModal';
import { TransactionsModal } from './components/TransactionsModal';
import { BestSellersModal } from './components/BestSellersModal';
import { NotificationsPopover } from './components/NotificationsPopover';
import { AutomationLogsModal } from './components/AutomationLogsModal';
import { AdminLoginScreen } from './components/AdminLoginScreen';
import { dashboardApi, DashboardKpis } from './services/api';

export default function App() {
  // Authentication Guard
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bestcar_admin_token') !== null;
  });

  // State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');

  // State - 100% Dynamic from DRF Backend API
  const [inventory, setInventory] = useState<CarItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [kpis, setKpis] = useState<DashboardKpis | null>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('01 Jan 2024 - 07 Jan 2024');
  const [isStatsCollapsed, setIsStatsCollapsed] = useState(false);

  // Modals & Drawers
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [isPosOpen, setIsPosOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [isBestSellersModalOpen, setIsBestSellersModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAutomationLogsOpen, setIsAutomationLogsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch live API metrics on mount and poll every 3 seconds for real-time website updates
  useEffect(() => {
    const fetchLiveData = () => {
      dashboardApi.getKpis().then((data) => {
        if (data) setKpis(data);
      });

      dashboardApi.getBestSellers().then((apiBestSellers) => {
        if (apiBestSellers && apiBestSellers.length > 0) {
          setInventory(apiBestSellers);
        }
      });

      dashboardApi.getRecentTransactions().then((apiTransactions) => {
        if (apiTransactions && apiTransactions.length > 0) {
          setTransactions(apiTransactions);
        }
      });
    };

    fetchLiveData();
    const intervalId = setInterval(fetchLiveData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Handlers
  const handleToggleSidebar = () => {
    // If mobile viewport
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    dashboardApi.getKpis().then((data) => data && setKpis(data));
    dashboardApi.getBestSellers().then((apiCars) => apiCars.length && setInventory(apiCars));
    dashboardApi.getRecentTransactions().then((apiTx) => apiTx.length && setTransactions(apiTx));
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleAddNewCar = async (newCar: CarItem) => {
    setInventory((prev) => [newCar, ...prev]);
    // Persist to DRF Backend API
    await dashboardApi.createVehicle({
      name: newCar.name,
      brand: newCar.name.split(' ')[0] || 'BMW',
      pricePerDay: newCar.price,
      seats: 5,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      location: 'London Central',
    });
    // Refetch latest inventory from backend
    const updated = await dashboardApi.getBestSellers();
    if (updated.length > 0) setInventory(updated);
  };

  const handleCompleteSale = async (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
    // Persist POS sale to DRF Backend API
    await dashboardApi.createRentalBooking({
      carName: newTx.carName,
      amount: newTx.amount,
    });
    const updatedTx = await dashboardApi.getRecentTransactions();
    if (updatedTx.length > 0) setTransactions(updatedTx);
  };

  const handleLogout = () => {
    localStorage.removeItem('bestcar_admin_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLoginScreen
        onLoginSuccess={(token) => {
          localStorage.setItem('bestcar_admin_token', token);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      {/* Top Header Navigation */}
      <Header
        onToggleSidebar={handleToggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
        onOpenAddNew={() => setIsAddNewOpen(true)}
        onOpenPos={() => setIsPosOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAutomations={() => setIsAutomationLogsOpen(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex relative items-start">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          activeItem={activeSidebarItem}
          setActiveItem={setActiveSidebarItem}
        />

        {/* Scrollable Dashboard View */}
        <main className="flex-1 min-w-0 p-3.5 sm:p-5 md:p-6 lg:p-7">
          <div className="max-w-[1600px] mx-auto space-y-4 md:space-y-6">
            {/* Top Greeting & Date Filter Bar */}
            <GreetingBar
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
              selectedRange={selectedDateRange}
              setSelectedRange={setSelectedDateRange}
              isStatsCollapsed={isStatsCollapsed}
              setIsStatsCollapsed={setIsStatsCollapsed}
            />

            {/* Row 1: Top 3 KPI Cards (Weekly Earning, Total Sales, Purchased Goods) */}
            {!isStatsCollapsed && (
              <KpiCards
                kpis={kpis}
                onRefreshSales={handleRefresh}
                onRefreshPurchases={handleRefresh}
              />
            )}

            {/* Row 2: Best Seller (Left ~40%) & Recent Transactions (Right ~60%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-stretch">
              {/* Best Seller Card */}
              <div className="lg:col-span-5 flex flex-col">
                <BestSellerCard
                  items={inventory.slice(0, 5)}
                  onViewAll={() => setIsBestSellersModalOpen(true)}
                  onSelectItem={() => setIsBestSellersModalOpen(true)}
                />
              </div>

              {/* Recent Transactions Card */}
              <div className="lg:col-span-7 flex flex-col">
                <RecentTransactionsTable
                  transactions={transactions.slice(0, 5)}
                  onViewAll={() => setIsTransactionsModalOpen(true)}
                  onSelectTransaction={() => setIsTransactionsModalOpen(true)}
                />
              </div>
            </div>

            {/* Row 3: Sales Analytics Chart (Left ~65%) & Sales by Countries Map (Right ~35%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-stretch">
              {/* Sales Analytics Area Chart */}
              <div className="lg:col-span-8 flex flex-col">
                <SalesAnalyticsChart />
              </div>

              {/* Sales by Countries World Map Card */}
              <div className="lg:col-span-4 flex flex-col">
                <SalesByCountriesCard />
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </main>
      </div>

      {/* Modals and Interactive Drawers */}
      <AddNewModal
        isOpen={isAddNewOpen}
        onClose={() => setIsAddNewOpen(false)}
        onAddCar={handleAddNewCar}
      />

      <PosDrawer
        isOpen={isPosOpen}
        onClose={() => setIsPosOpen(false)}
        inventory={inventory}
        onCompleteSale={handleCompleteSale}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        inventory={inventory}
        transactions={transactions}
        onSelectCar={() => setIsBestSellersModalOpen(true)}
        onSelectTransaction={() => setIsTransactionsModalOpen(true)}
      />

      <TransactionsModal
        isOpen={isTransactionsModalOpen}
        onClose={() => setIsTransactionsModalOpen(false)}
        transactions={transactions}
      />

      <BestSellersModal
        isOpen={isBestSellersModalOpen}
        onClose={() => setIsBestSellersModalOpen(false)}
        items={inventory}
      />

      <NotificationsPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <AutomationLogsModal
        isOpen={isAutomationLogsOpen}
        onClose={() => setIsAutomationLogsOpen(false)}
      />
    </div>
  );
}
