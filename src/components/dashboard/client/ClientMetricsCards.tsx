
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Activity, CreditCard, MapPin, Ticket } from 'lucide-react';

interface ClientMetricsCardsProps {
  monthlyRevenue: number;
  activeDevices: number;
  totalDevices: number;
  todayTransactions: number;
  locationsCount: number;
  activeTickets: number;
}

export const ClientMetricsCards: React.FC<ClientMetricsCardsProps> = ({
  monthlyRevenue,
  activeDevices,
  totalDevices,
  todayTransactions,
  locationsCount,
  activeTickets
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Mesačné tržby
          </CardTitle>
          <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            €{monthlyRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600 font-medium">
              +15% oproti minulému mesiacu
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Aktívne zariadenia
          </CardTitle>
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {activeDevices}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            z {totalDevices} celkom
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Transakcie dnes
          </CardTitle>
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {todayTransactions}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Posledných 24 hodín
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Pobočky
          </CardTitle>
          <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
            <MapPin className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {locationsCount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Aktívnych lokácií
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Aktívne tikety
          </CardTitle>
          <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600">
            <Ticket className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {activeTickets}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Potrebujú pozornosť
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
