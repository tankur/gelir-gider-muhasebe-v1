import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { useSampleData } from './hooks/useSampleData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './components/Login';
import Customers from './components/Customers';
import Checks from './components/Checks';
import Transactions from './components/Transactions';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import OrderManagement from './components/OrderManagement';
import Settings from './components/Settings';
import RecentActivities from './components/RecentActivities';
import PriceCalculator from './components/pricing/PriceCalculator';
import OfferPage from './components/offers/OfferPage';
import PriceSettingsPage from './components/settings/pricing/PriceSettingsPage';
import EmployeesPage from './components/employees/EmployeesPage';
import PayrollPage from './components/salary/PayrollPage';
import OvertimePage from './components/salary/OvertimePage';

function AppRoutes() {
  const { currentUser } = useAuth();
  useSampleData();

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#171717]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-[#171717] p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/checks" element={<Checks />} />
            <Route path="/price-calculator" element={<PriceCalculator />} />
            <Route path="/offers" element={<OfferPage />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/prices" element={<PriceSettingsPage />} />
            <Route path="/activities" element={<RecentActivities />} />
            <Route path="/salary/employees" element={<EmployeesPage />} />
            <Route path="/salary/payroll" element={<PayrollPage />} />
            <Route path="/salary/overtime" element={<OvertimePage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}