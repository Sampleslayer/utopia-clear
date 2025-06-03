import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Search, Filter, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getClientData } from '@/data/clientData';
import { demoTransactions as transactions, demoLocations as locations } from '@/data/demoData';

export const TransactionsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Get data based on user role
  const getTransactionsData = () => {
    if (user?.role === 'admin') {
      return { transactions, locations }; // Admin sees all transactions from demoData
    } else if (user?.role === 'client' && user?.id === 'slavka-volkova-1') {
      const clientData = getClientData(user.id);
      return {
        transactions: clientData?.transactions || [],
        locations: clientData?.locations || []
      };
    }
    return { transactions: [], locations: [] };
  };

  const { transactions: transactionsData, locations: locationsData } = getTransactionsData();

  // Filter transactions
  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = transaction.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.amount.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Dokončené';
      case 'pending': return 'Čakajúce';
      case 'failed': return 'Neúspešné';
      case 'cancelled': return 'Zrušené';
      default: return 'Neznámy';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'card_payment': return 'Karta';
      case 'contactless': return 'Bezkontaktné';
      case 'cash': return 'Hotovosť';
      case 'online': return 'Online';
      default: return 'Iné';
    }
  };

  const getLocationName = (locationId: string) => {
    const location = locationsData.find(l => l.id === locationId);
    return location?.name || 'Neznáma pobočka';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transakcie
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.role === 'admin' 
              ? 'Prehľad všetkých transakcií v systéme'
              : 'História vašich transakcií'
            }
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportovať
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Hľadať transakcie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Stav" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky stavy</SelectItem>
                <SelectItem value="completed">Dokončené</SelectItem>
                <SelectItem value="pending">Čakajúce</SelectItem>
                <SelectItem value="failed">Neúspešné</SelectItem>
                <SelectItem value="cancelled">Zrušené</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Typ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky typy</SelectItem>
                <SelectItem value="card_payment">Karta</SelectItem>
                <SelectItem value="contactless">Bezkontaktné</SelectItem>
                <SelectItem value="cash">Hotovosť</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Resetovať filtre
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Transakcie ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-500' :
                    transaction.status === 'pending' ? 'bg-yellow-500' :
                    transaction.status === 'failed' ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-lg">
                        €{transaction.amount.toFixed(2)}
                      </span>
                      <Badge variant="outline">
                        {getTypeText(transaction.type)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.merchantName} • {getLocationName(transaction.locationId)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.timestamp).toLocaleString('sk-SK')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(transaction.status)}>
                    {getStatusText(transaction.status)}
                  </Badge>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {transaction.paymentMethod}
                  </div>
                  {transaction.receiptNumber && (
                    <div className="text-xs text-gray-500">
                      {transaction.receiptNumber}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Žiadne transakcie
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Žiadne transakcie nevyhovujú zadaným kritériám.'
                  : user?.role === 'admin' 
                    ? 'V systéme nie sú žiadne transakcie.'
                    : 'Nemáte žiadne transakcie.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
