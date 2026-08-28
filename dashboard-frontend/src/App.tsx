import React, { useState } from 'react';
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

export default function App() {
  // State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');

  const [inventory, setInventory] = useState<CarItem[]>(bestSellersData);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

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
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleAddNewCar = (newCar: CarItem) => {
    setInventory((prev) => [newCar, ...prev]);
  };

  const handleCompleteSale = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

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
