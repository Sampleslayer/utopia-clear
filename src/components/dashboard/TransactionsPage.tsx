
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Filter, CreditCard, TrendingUp, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getClientData } from '@/data/clientData';

export const TransactionsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">Načítanie...</p>
      </div>
    );
  }

  // Only clients can access transactions
  if (user?.role !== 'client') {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Nemáte oprávnenie
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Transakcie sú dostupné len pre klientov po prihlásení.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get client data
  const clientData = getClientData(user.id);
  if (!clientData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">Dáta sa nenašli</p>
      </div>
    );
  }

  const { transactions, locations } = clientData;

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const location = locations.find(l => l.id === transaction.locationId);
    const matchesSearch = transaction.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || transaction.locationId === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Dokončené';
      case 'pending': return 'Čakajúce';
      case 'failed': return 'Neúspešné';
      default: return status;
    }
  };

  // Calculate stats
  const totalRevenue = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const monthlyRevenue = filteredTransactions
    .filter(tx => new Date(tx.timestamp).getMonth() === new Date().getMonth())
    .reduce((sum, tx) => sum + tx.amount, 0);
  const completedToday = filteredTransactions.filter(tx => {
    const today = new Date().toDateString();
    return tx.status === 'completed' && new Date(tx.timestamp).toDateString() === today;
  }).length;
  const avgTransaction = filteredTransactions.length > 0 ? totalRevenue / filteredTransactions.length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Transakcie
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Prehľad vašich transakcií a platieb
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Celkové tržby</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Za celé obdobie
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mesačné tržby</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Aktuálny mesiac
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transakcie dnes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
            <p className="text-xs text-muted-foreground">
              Dokončené platby
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Priemerná platba</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{avgTransaction.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Za transakciu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter transakcií</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Vyhľadať transakcie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Stav" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky stavy</SelectItem>
                <SelectItem value="completed">Dokončené</SelectItem>
                <SelectItem value="pending">Čakajúce</SelectItem>
                <SelectItem value="failed">Neúspešné</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Pobočka" />
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

            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>História transakcií</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dátum</TableHead>
                  <TableHead>Suma</TableHead>
                  <TableHead>Spôsob platby</TableHead>
                  <TableHead>Pobočka</TableHead>
                  <TableHead>Stav</TableHead>
                  <TableHead>Číslo účtenky</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => {
                  const location = locations.find(l => l.id === transaction.locationId);
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.timestamp).toLocaleString('sk-SK')}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">€{transaction.amount.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell>{location?.name || 'Neznáma pobočka'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusLabel(transaction.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {transaction.receiptNumber}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Žiadne transakcie
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || statusFilter !== 'all' || locationFilter !== 'all'
                  ? 'Nenašli sa žiadne transakcie zodpovedajúce filtrom.'
                  : 'Zatiaľ nemáte žiadne transakcie.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
