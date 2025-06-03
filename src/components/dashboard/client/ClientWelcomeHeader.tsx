
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Activity, Building2 } from 'lucide-react';

export const ClientWelcomeHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Vitajte späť, Slávka!</h1>
                <p className="text-purple-100 text-lg mt-1">
                  Prehľad vašej Beauty Plus siete
                </p>
              </div>
            </div>
            <p className="text-purple-100 max-w-2xl">
              Sledujte výkonnosť svojich kozmetických salónov, analyzujte transakcie a spravujte všetky pobočky na jednom mieste.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg" 
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nová transakcia
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Activity className="h-5 w-5 mr-2" />
              Detailný prehľad
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full"></div>
    </div>
  );
};
