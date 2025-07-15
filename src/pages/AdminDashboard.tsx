import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserCheck, 
  UserX, 
  BarChart3, 
  FileText, 
  Bell,
  Settings,
  Download,
  MapPin,
  Stethoscope,
  Calendar
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Total de Profissionais",
      value: "247",
      icon: Users,
      trend: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Ativos",
      value: "198",
      icon: UserCheck,
      trend: "+8%",
      color: "text-green-600"
    },
    {
      title: "Pendentes",
      value: "34",
      icon: UserX,
      trend: "-2%",
      color: "text-orange-600"
    },
    {
      title: "Novos (30 dias)",
      value: "23",
      icon: Calendar,
      trend: "+15%",
      color: "text-purple-600"
    }
  ];

  const recentProfessionals = [
    {
      name: "Dr. Ana Silva",
      specialty: "Cardiologia",
      city: "São Paulo",
      status: "active",
      date: "2024-01-15"
    },
    {
      name: "Dr. Carlos Santos",
      specialty: "Dermatologia",
      city: "Rio de Janeiro",
      status: "pending",
      date: "2024-01-14"
    },
    {
      name: "Dra. Maria Oliveira",
      specialty: "Pediatria",
      city: "Belo Horizonte",
      status: "active",
      date: "2024-01-13"
    }
  ];

  const sidebarItems = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: BarChart3,
    },
    {
      id: 'professionals',
      label: 'Profissionais',
      icon: Users,
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: FileText,
    },
    {
      id: 'notifications',
      label: 'Notificações',
      icon: Bell,
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.trend} em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Profissionais Recentes</CardTitle>
                <CardDescription>
                  Últimos profissionais cadastrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProfessionals.map((professional, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-medical-light rounded-full">
                          <Stethoscope className="h-4 w-4 text-medical-blue" />
                        </div>
                        <div>
                          <p className="font-medium">{professional.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {professional.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {professional.city}
                        </div>
                        <Badge variant={professional.status === 'active' ? 'default' : 'secondary'}>
                          {professional.status === 'active' ? 'Ativo' : 'Pendente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'professionals':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Profissionais</CardTitle>
              <CardDescription>
                Gerencie todos os profissionais cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Filtrar por Especialidade
                  </Button>
                  <Button variant="outline" size="sm">
                    Filtrar por Cidade
                  </Button>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
              <p className="text-muted-foreground">
                Lista completa de profissionais será implementada aqui
              </p>
            </CardContent>
          </Card>
        );
      
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Em Desenvolvimento</CardTitle>
              <CardDescription>
                Esta funcionalidade será implementada em breve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Conecte ao Supabase para funcionalidades completas
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <DashboardLayout
      user={user}
      sidebarItems={sidebarItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;