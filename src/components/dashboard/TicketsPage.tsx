
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ticket, Plus, Search, Filter, MessageSquare, Clock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getClientData } from '@/data/clientData';
import { tickets } from '@/data/demoData';

export const TicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Get data based on user role
  const getTicketsData = () => {
    if (user?.role === 'admin') {
      return tickets; // Admin sees all tickets from demoData
    } else if (user?.role === 'client' && user?.id === 'slavka-volkova-1') {
      const clientData = getClientData(user.id);
      return clientData?.tickets || [];
    }
    return [];
  };

  const ticketsData = getTicketsData();

  // Filter tickets
  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Otvorený';
      case 'in_progress': return 'V riešení';
      case 'resolved': return 'Vyriešený';
      case 'closed': return 'Zatvorený';
      default: return 'Neznámy';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Vysoká';
      case 'medium': return 'Stredná';
      case 'low': return 'Nízka';
      default: return 'Neznáma';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tickety
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.role === 'admin' 
              ? 'Správa všetkých support ticketov'
              : 'Vaše support tickety'
            }
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nový ticket
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Hľadať tickety..."
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
                <SelectItem value="open">Otvorený</SelectItem>
                <SelectItem value="in_progress">V riešení</SelectItem>
                <SelectItem value="resolved">Vyriešený</SelectItem>
                <SelectItem value="closed">Zatvorený</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priorita" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky priority</SelectItem>
                <SelectItem value="high">Vysoká</SelectItem>
                <SelectItem value="medium">Stredná</SelectItem>
                <SelectItem value="low">Nízka</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Resetovať filtre
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{ticket.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {ticket.clientName}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(ticket.status)}>
                    {getStatusText(ticket.status)}
                  </Badge>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {getPriorityText(ticket.priority)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {ticket.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Priradený:</span>
                  </div>
                  <span className="font-medium">{ticket.assignedTo}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Kategória:</span>
                  </div>
                  <span className="font-medium">{ticket.category}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Vytvorené:</span>
                  </div>
                  <span className="font-medium">
                    {new Date(ticket.createdAt).toLocaleDateString('sk-SK')}
                  </span>
                </div>
                
                {ticket.estimatedResolution && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Očakávané riešenie:</span>
                    <span className="font-medium">
                      {new Date(ticket.estimatedResolution).toLocaleDateString('sk-SK')}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Zobraziť detail
                </Button>
                {user?.role === 'admin' && (
                  <Button size="sm" className="flex-1">
                    Upraviť
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Žiadne tickety
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Žiadne tickety nevyhovujú zadaným kritériám.'
                : user?.role === 'admin' 
                  ? 'V systéme nie sú žiadne tickety.'
                  : 'Nemáte žiadne tickety.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
