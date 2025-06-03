
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { LocationData, DeviceData, TransactionData } from '@/data/demoData';

interface ClientLocationsOverviewProps {
  locations: LocationData[];
  devices: DeviceData[];
  transactions: TransactionData[];
}

export const ClientLocationsOverview: React.FC<ClientLocationsOverviewProps> = ({
  locations,
  devices,
  transactions
}) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-purple-600" />
          Prehľad pobočiek
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {locations.map((location) => {
            const locationDevices = devices.filter(d => d.locationId === location.id);
            const locationRevenue = transactions
              .filter(t => t.locationId === location.id)
              .reduce((sum, t) => sum + t.amount, 0);
            
            return (
              <div key={location.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    location.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{location.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {location.city} • {locationDevices.length} zariadení
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    €{locationRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mesačné tržby
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
