import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Edit, Trash2, Users, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getClientData } from '@/data/clientData';
import { demoLocations as locations } from '@/data/demoData';

export const LocationsPage: React.FC = () => {
  const { user } = useAuth();

  // Get data based on user role
  const getLocationsData = () => {
    if (user?.role === 'admin') {
      return locations; // Admin sees all locations from demoData
    } else if (user?.role === 'client' && user?.id === 'slavka-volkova-1') {
      const clientData = getClientData(user.id);
      return clientData?.locations || [];
    }
    return [];
  };

  const locationsData = getLocationsData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktívna';
      case 'inactive': return 'Neaktívna';
      case 'maintenance': return 'Údržba';
      default: return 'Neznámy';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pobočky
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.role === 'admin' 
              ? 'Správa všetkých pobočiek v systéme'
              : 'Správa vašich pobočiek'
            }
          </p>
        </div>
        {user?.role === 'admin' && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Pridať pobočku
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locationsData.map((location) => (
          <Card key={location.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(location.status)}>
                  {getStatusText(location.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Adresa</p>
                <p className="font-medium">{location.address}</p>
                <p className="text-sm text-gray-500">{location.city}, {location.country}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{location.devicesCount} zariadení</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Activity className="h-4 w-4 text-gray-500" />
                  <span>{location.type || 'Obchod'}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                Vytvorené: {new Date(location.createdAt).toLocaleDateString('sk-SK')}
              </div>
              
              {user?.role === 'admin' && (
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Upraviť
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {locationsData.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Žiadne pobočky
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {user?.role === 'admin' 
                ? 'V systéme nie sú žiadne pobočky.'
                : 'Nemáte žiadne pobočky.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
