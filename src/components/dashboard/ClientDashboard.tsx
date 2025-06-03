
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getClientData } from '@/data/clientData';
import { ClientWelcomeHeader } from './client/ClientWelcomeHeader';
import { ClientMetricsCards } from './client/ClientMetricsCards';
import { ClientLocationsOverview } from './client/ClientLocationsOverview';
import { ClientRecentTransactions } from './client/ClientRecentTransactions';
import { ClientDevicesOverview } from './client/ClientDevicesOverview';

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">Načítanie...</p>
      </div>
    );
  }

  // Get client's data for Slávka Valková
  const clientData = getClientData(user.id);
  if (!clientData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">Dáta sa nenašli</p>
      </div>
    );
  }

  const { locations, devices, transactions, tickets } = clientData;

  // Calculate metrics
  const monthlyRevenue = transactions
    .filter(tx => new Date(tx.timestamp).getMonth() === new Date().getMonth())
    .reduce((sum, tx) => sum + tx.amount, 0);
  const activeDevices = devices.filter(device => device.status === 'active').length;
  const todayTransactions = transactions.filter(tx => {
    const today = new Date().toDateString();
    return new Date(tx.timestamp).toDateString() === today;
  }).length;

  // Active tickets count
  const activeTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      <ClientWelcomeHeader />
      
      <ClientMetricsCards
        monthlyRevenue={monthlyRevenue}
        activeDevices={activeDevices}
        totalDevices={devices.length}
        todayTransactions={todayTransactions}
        locationsCount={locations.length}
        activeTickets={activeTickets}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClientLocationsOverview
          locations={locations}
          devices={devices}
          transactions={transactions}
        />
        
        <ClientRecentTransactions
          transactions={transactions}
          locations={locations}
        />
      </div>

      <ClientDevicesOverview
        devices={devices}
        locations={locations}
      />
    </div>
  );
};
