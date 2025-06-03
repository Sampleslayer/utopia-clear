
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity } from 'lucide-react';
import { LocationData, DeviceData } from '@/data/demoData';

interface ClientDevicesOverviewProps {
  devices: DeviceData[];
  locations: LocationData[];
}

export const ClientDevicesOverview: React.FC<ClientDevicesOverviewProps> = ({
  devices,
  locations
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const filteredDevices = selectedLocation === 'all' 
    ? devices 
    : devices.filter(device => device.locationId === selectedLocation);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktívne';
      case 'inactive': return 'Neaktívne';
      case 'maintenance': return 'Údržba';
      case 'error': return 'Chyba';
      default: return status;
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Stav zariadení
          </CardTitle>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Všetky pobočky" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všetky pobočky</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => {
            const location = locations.find(l => l.id === device.locationId);
            return (
              <div key={device.id} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      device.status === 'active' ? 'bg-green-500' :
                      device.status === 'inactive' ? 'bg-red-500' : 
                      device.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <Badge className={getStatusColor(device.status)}>
                      {getStatusLabel(device.status)}
                    </Badge>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {device.brand} {device.model}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {location?.name}
                </p>
                
                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <p>TID: {device.tid}</p>
                  <p>Posledná aktivita: {new Date(device.lastActivity).toLocaleString('sk-SK')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
