
import { LocationData, DeviceData, TransactionData, ContractData, TicketData } from './demoData';

// Slávka Valková - Beauty Plus s.r.o. specific data
export const slavkaClientData = {
  // Client info
  clientId: 'slavka-volkova-1',
  organizationId: 'beauty-plus-org',
  companyName: 'Beauty Plus s.r.o.',
  
  // Locations for Beauty Plus
  locations: [
    {
      id: 'beauty-plus-main',
      name: 'Beauty Plus - Hlavná pobočka',
      address: 'Obchodná 25, 811 06 Bratislava',
      city: 'Bratislava',
      country: 'Slovensko',
      clientId: 'slavka-volkova-1',
      devicesCount: 3,
      status: 'active' as const,
      createdAt: '2023-03-01',
      type: 'kozmetika',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-plus-mall',
      name: 'Beauty Plus - Aupark',
      address: 'Einsteinova 18, 851 01 Bratislava',
      city: 'Bratislava',
      country: 'Slovensko',
      clientId: 'slavka-volkova-1',
      devicesCount: 2,
      status: 'active' as const,
      createdAt: '2023-06-15',
      type: 'kozmetika',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-plus-nitra',
      name: 'Beauty Plus - Nitra',
      address: 'Štefánikova trieda 61, 949 01 Nitra',
      city: 'Nitra',
      country: 'Slovensko',
      clientId: 'slavka-volkova-1',
      devicesCount: 2,
      status: 'active' as const,
      createdAt: '2024-01-10',
      type: 'kozmetika',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    }
  ] as LocationData[],

  // Devices for Beauty Plus
  devices: [
    {
      id: 'beauty-device-1',
      name: 'Terminál Beauty Plus Hlavná',
      serialNumber: 'PAX123789',
      model: 'A920',
      brand: 'PAX Technology',
      status: 'active' as const,
      locationId: 'beauty-plus-main',
      lastActivity: '2024-11-26T15:45:00Z',
      firmwareVersion: '2.1.5',
      tid: 'TID123789',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-device-2',
      name: 'Terminál Beauty Plus Aupark - Pokladňa 1',
      serialNumber: 'ING567890',
      model: 'Move 5000',
      brand: 'Ingenico',
      status: 'active' as const,
      locationId: 'beauty-plus-mall',
      lastActivity: '2024-11-26T14:20:00Z',
      firmwareVersion: '1.8.2',
      tid: 'TID567890',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-device-3',
      name: 'Terminál Beauty Plus Aupark - Pokladňa 2',
      serialNumber: 'PAX345678',
      model: 'A920',
      brand: 'PAX Technology',
      status: 'active' as const,
      locationId: 'beauty-plus-mall',
      lastActivity: '2024-11-26T16:10:00Z',
      firmwareVersion: '2.1.5',
      tid: 'TID345678',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-device-4',
      name: 'Terminál Beauty Plus Nitra - Recepcia',
      serialNumber: 'VER789012',
      model: 'VX520',
      brand: 'Verifone',
      status: 'active' as const,
      locationId: 'beauty-plus-nitra',
      lastActivity: '2024-11-26T13:30:00Z',
      firmwareVersion: '3.2.1',
      tid: 'TID789012',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-device-5',
      name: 'Terminál Beauty Plus Nitra - Ošetrovna',
      serialNumber: 'ING234567',
      model: 'Desk 5000',
      brand: 'Ingenico',
      status: 'maintenance' as const,
      locationId: 'beauty-plus-nitra',
      lastActivity: '2024-11-25T10:15:00Z',
      firmwareVersion: '1.9.1',
      tid: 'TID234567',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    }
  ] as DeviceData[],

  // Transactions for Beauty Plus
  transactions: [
    {
      id: 'beauty-trans-1',
      merchantId: 'slavka-volkova-1',
      merchantName: 'Beauty Plus s.r.o.',
      amount: 85.00,
      currency: 'EUR',
      status: 'completed' as const,
      type: 'card_payment' as const,
      timestamp: '2024-11-26T15:30:00Z',
      paymentMethod: 'Visa **** 4321',
      terminalId: 'PAX123789',
      receiptNumber: 'RCP-BP001',
      locationId: 'beauty-plus-main',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-trans-2',
      merchantId: 'slavka-volkova-1',
      merchantName: 'Beauty Plus s.r.o.',
      amount: 120.00,
      currency: 'EUR',
      status: 'completed' as const,
      type: 'contactless' as const,
      timestamp: '2024-11-26T14:15:00Z',
      paymentMethod: 'Mastercard Contactless',
      terminalId: 'ING567890',
      receiptNumber: 'RCP-BP002',
      locationId: 'beauty-plus-mall',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-trans-3',
      merchantId: 'slavka-volkova-1',
      merchantName: 'Beauty Plus s.r.o.',
      amount: 45.50,
      currency: 'EUR',
      status: 'completed' as const,
      type: 'card_payment' as const,
      timestamp: '2024-11-26T13:45:00Z',
      paymentMethod: 'Visa **** 8765',
      terminalId: 'VER789012',
      receiptNumber: 'RCP-BP003',
      locationId: 'beauty-plus-nitra',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-trans-4',
      merchantId: 'slavka-volkova-1',
      merchantName: 'Beauty Plus s.r.o.',
      amount: 95.00,
      currency: 'EUR',
      status: 'completed' as const,
      type: 'contactless' as const,
      timestamp: '2024-11-26T12:20:00Z',
      paymentMethod: 'Apple Pay',
      terminalId: 'PAX345678',
      receiptNumber: 'RCP-BP004',
      locationId: 'beauty-plus-mall',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-trans-5',
      merchantId: 'slavka-volkova-1',
      merchantName: 'Beauty Plus s.r.o.',
      amount: 67.80,
      currency: 'EUR',
      status: 'completed' as const,
      type: 'card_payment' as const,
      timestamp: '2024-11-26T11:30:00Z',
      paymentMethod: 'Mastercard **** 2468',
      terminalId: 'PAX123789',
      receiptNumber: 'RCP-BP005',
      locationId: 'beauty-plus-main',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-trans-6',
      merchantId: 'slavka-volkova-1',
      merchantName: 'Beauty Plus s.r.o.',
      amount: 156.00,
      currency: 'EUR',
      status: 'failed' as const,
      type: 'card_payment' as const,
      timestamp: '2024-11-26T10:45:00Z',
      paymentMethod: 'Visa **** 1357',
      terminalId: 'ING567890',
      receiptNumber: 'RCP-BP006',
      locationId: 'beauty-plus-mall',
      errorCode: 'insufficient_funds',
      clientId: 'slavka-volkova-1',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    }
  ] as TransactionData[],

  // Contracts for Beauty Plus
  contracts: [
    {
      id: 'beauty-contract-1',
      clientId: 'slavka-volkova-1',
      clientName: 'Beauty Plus s.r.o.',
      contractNumber: 'CON-BP-2024-001',
      type: 'Kompletné POS riešenie',
      status: 'active' as const,
      startDate: '2023-03-01',
      endDate: '2025-02-28',
      value: 18600,
      monthlyFee: 78,
      commissionRate: 2.3,
      devices: ['PAX A920 (3x)', 'Ingenico Move 5000 (2x)'],
      signedBy: 'Peter Fekiač',
      notes: 'Kompletné riešenie pre kozmetické salóny s možnosťou rozšírenia',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-contract-2',
      clientId: 'slavka-volkova-1',
      clientName: 'Beauty Plus s.r.o.',
      contractNumber: 'CON-BP-2024-002',
      type: 'Rozšírenie - Nitra pobočka',
      status: 'active' as const,
      startDate: '2024-01-10',
      endDate: '2026-01-09',
      value: 8400,
      monthlyFee: 35,
      commissionRate: 2.3,
      devices: ['Verifone VX520', 'Ingenico Desk 5000'],
      signedBy: 'Ladislav Mathis',
      notes: 'Rozšírenie o novú pobočku v Nitre',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    }
  ] as ContractData[],

  // Tickets for Beauty Plus
  tickets: [
    {
      id: 'beauty-ticket-1',
      title: 'Problém s terminálom v Nitre',
      description: 'Terminál v ošetrovaní sa náhodne reštartuje, potrebujeme opravu',
      clientId: 'slavka-volkova-1',
      clientName: 'Beauty Plus s.r.o.',
      status: 'in_progress' as const,
      priority: 'high' as const,
      assignedTo: 'Richie Plichta',
      createdAt: '2024-11-25T14:30:00Z',
      updatedAt: '2024-11-26T09:15:00Z',
      category: 'Technical Issue',
      estimatedResolution: '2024-11-27T12:00:00Z',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-ticket-2',
      title: 'Žiadosť o zaškolenie nových zamestnancov',
      description: 'Potrebujeme zaškoliť 2 nových zamestnancov na prácu s POS terminálmi',
      clientId: 'slavka-volkova-1',
      clientName: 'Beauty Plus s.r.o.',
      status: 'open' as const,
      priority: 'medium' as const,
      assignedTo: 'Peter Fekiač',
      createdAt: '2024-11-24T11:20:00Z',
      updatedAt: '2024-11-24T11:20:00Z',
      category: 'Training',
      estimatedResolution: '2024-11-28T16:00:00Z',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    },
    {
      id: 'beauty-ticket-3',
      title: 'Žiadosť o mesačný report',
      description: 'Prosím o vygenerovanie mesačného reportu transakcií za október 2024',
      clientId: 'slavka-volkova-1',
      clientName: 'Beauty Plus s.r.o.',
      status: 'resolved' as const,
      priority: 'low' as const,
      assignedTo: 'Ladislav Mathis',
      createdAt: '2024-11-01T10:00:00Z',
      updatedAt: '2024-11-03T14:30:00Z',
      category: 'Reporting',
      estimatedResolution: '2024-11-03T14:30:00Z',
      businessPartnerId: 'bp-1',
      organizationId: 'beauty-plus-org'
    }
  ] as TicketData[]
};

export const getClientData = (clientId: string) => {
  if (clientId === 'slavka-volkova-1') {
    return slavkaClientData;
  }
  return null;
};

export const getClientLocations = (clientId: string) => {
  const clientData = getClientData(clientId);
  return clientData?.locations || [];
};

export const getClientDevices = (clientId: string) => {
  const clientData = getClientData(clientId);
  return clientData?.devices || [];
};

export const getClientTransactions = (clientId: string) => {
  const clientData = getClientData(clientId);
  return clientData?.transactions || [];
};

export const getClientContracts = (clientId: string) => {
  const clientData = getClientData(clientId);
  return clientData?.contracts || [];
};

export const getClientTickets = (clientId: string) => {
  const clientData = getClientData(clientId);
  return clientData?.tickets || [];
};
