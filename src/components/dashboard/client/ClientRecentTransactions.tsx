
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import { LocationData, TransactionData } from '@/data/demoData';

interface ClientRecentTransactionsProps {
  transactions: TransactionData[];
  locations: LocationData[];
}

export const ClientRecentTransactions: React.FC<ClientRecentTransactionsProps> = ({
  transactions,
  locations
}) => {
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-green-600" />
          Posledné transakcie
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {recentTransactions.map((transaction) => {
            const location = locations.find(l => l.id === transaction.locationId);
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    transaction.status === 'completed' ? 'bg-green-500' :
                    transaction.status === 'pending' ? 'bg-yellow-500' :
                    transaction.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      €{transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(transaction.timestamp).toLocaleString('sk-SK')}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {location?.name || 'Neznáma pobočka'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }>
                    {transaction.status === 'completed' ? 'Dokončené' :
                     transaction.status === 'pending' ? 'Čakajúce' : 'Neúspešné'}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
