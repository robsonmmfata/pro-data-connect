import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ProfessionalRegistration } from '@/components/ProfessionalRegistration';
import { ProfessionalDashboard } from '@/components/ProfessionalDashboard';
import { HealthProfessional, ProfessionalFormData } from '@/types/professional';
import { UserPlus, BarChart3, Database, Settings } from 'lucide-react';
import medicalHero from '@/assets/medical-hero.jpg';

export const HealthProfessionalApp: React.FC = () => {
  const { toast } = useToast();
  const [professionals, setProfessionals] = useState<HealthProfessional[]>([
    // Sample data for demo
    {
      id: '1',
      name: 'Dr. Ana Silva',
      email: 'ana.silva@email.com',
      phone: '(11) 99999-1234',
      cpf: '123.456.789-00',
      specialty: 'Cardiologia',
      crm: 'CRM/SP 123456',
      city: 'São Paulo',
      state: 'SP',
      availability: 'available',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Dr. Carlos Santos',
      email: 'carlos.santos@email.com',
      phone: '(21) 98888-5678',
      cpf: '987.654.321-00',
      specialty: 'Dermatologia',
      crm: 'CRM/RJ 654321',
      city: 'Rio de Janeiro',
      state: 'RJ',
      availability: 'busy',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      name: 'Dra. Maria Oliveira',
      email: 'maria.oliveira@email.com',
      phone: '(31) 97777-9012',
      cpf: '456.789.123-00',
      specialty: 'Pediatria',
      crm: 'CRM/MG 789123',
      city: 'Belo Horizonte',
      state: 'MG',
      availability: 'available',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
  ]);

  const [activeTab, setActiveTab] = useState('register');

  const handleAddProfessional = async (formData: ProfessionalFormData) => {
    const newProfessional: HealthProfessional = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProfessionals(prev => [...prev, newProfessional]);
    
    // Switch to dashboard after successful registration
    setActiveTab('dashboard');
    
    return Promise.resolve();
  };

  const handleExportPDF = (data: HealthProfessional[]) => {
    toast({
      title: "Exportação para PDF",
      description: "Para implementar a exportação para PDF, é necessário conectar ao Supabase para funcionalidades de backend.",
      variant: "default",
    });
  };

  const handleExportExcel = (data: HealthProfessional[]) => {
    toast({
      title: "Exportação para Excel",
      description: "Para implementar a exportação para Excel, é necessário conectar ao Supabase para funcionalidades de backend.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-medical-light">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Navigation */}
        <div className="bg-white shadow-soft border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    Sistema de Gestão de Profissionais da Saúde
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    MVP - Cadastro e Relatórios
                  </p>
                </div>
              </div>
              
              <TabsList className="grid w-fit grid-cols-2 bg-medical-light">
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Cadastro
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>

        {/* Content */}
        <TabsContent value="register" className="mt-0">
          <ProfessionalRegistration onSubmit={handleAddProfessional} />
        </TabsContent>

        <TabsContent value="dashboard" className="mt-0">
          <ProfessionalDashboard
            professionals={professionals}
            onExportPDF={handleExportPDF}
            onExportExcel={handleExportExcel}
          />
        </TabsContent>
      </Tabs>

      {/* Backend Integration Notice */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white border border-medical-blue/20 shadow-medical rounded-lg p-4 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-medical-light rounded-lg">
              <Settings className="h-5 w-5 text-medical-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-medical-blue">
                Backend Integration
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Para funcionalidades completas (banco de dados, exportação, etc.), conecte ao Supabase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};