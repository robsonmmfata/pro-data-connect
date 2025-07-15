import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Calendar, 
  Activity, 
  MessageSquare, 
  HelpCircle,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText
} from 'lucide-react';

const MedicoDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const sidebarItems = [
    {
      id: 'profile',
      label: 'Meu Perfil',
      icon: User,
    },
    {
      id: 'schedule',
      label: 'Agenda',
      icon: Calendar,
      badge: '3'
    },
    {
      id: 'activities',
      label: 'Atividades',
      icon: Activity,
    },
    {
      id: 'messages',
      label: 'Mensagens',
      icon: MessageSquare,
      badge: '2'
    },
    {
      id: 'support',
      label: 'Suporte',
      icon: HelpCircle,
    },
  ];

  const activities = [
    {
      type: 'profile_update',
      title: 'Perfil atualizado',
      description: 'Informações de contato atualizadas',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      type: 'document_upload',
      title: 'Documento enviado',
      description: 'Certificado CRM enviado para validação',
      date: '2024-01-14',
      status: 'pending'
    },
    {
      type: 'availability_change',
      title: 'Disponibilidade alterada',
      description: 'Horários de atendimento atualizados',
      date: '2024-01-13',
      status: 'completed'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                      Gerencie suas informações pessoais e profissionais
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={user?.name || ''}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Input
                      id="specialty"
                      value={user?.specialty || ''}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="crm">CRM</Label>
                    <Input
                      id="crm"
                      value={user?.crm || ''}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      placeholder="São Paulo"
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Sobre você</Label>
                  <Textarea
                    id="bio"
                    placeholder="Conte um pouco sobre sua experiência e especialização..."
                    disabled={!isEditing}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Conta verificada</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Documentos enviados</span>
                    <Badge variant="outline">2/3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Perfil completo</span>
                    <Badge variant="default">85%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Disponibilidade</CardTitle>
                <CardDescription>
                  Gerencie seus horários de atendimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Manhã</Label>
                    <div className="flex gap-2">
                      <Input placeholder="08:00" />
                      <Input placeholder="12:00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Tarde</Label>
                    <div className="flex gap-2">
                      <Input placeholder="13:00" />
                      <Input placeholder="18:00" />
                    </div>
                  </div>
                </div>
                <Button className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Horários
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Agendamentos</CardTitle>
                <CardDescription>
                  Visualize sua agenda da semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Funcionalidade de agendamentos será implementada em breve
                </p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'activities':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atividades</CardTitle>
              <CardDescription>
                Acompanhe todas as suas atividades no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="p-2 bg-medical-light rounded-full">
                      {activity.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : activity.status === 'pending' ? (
                        <Clock className="h-4 w-4 text-orange-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.date}
                      </p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status === 'completed' ? 'Concluído' : 'Pendente'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      
      case 'messages':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Mensagens</CardTitle>
              <CardDescription>
                Comunicações da administração e notificações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Bem-vindo ao Frontcash</span>
                    <span className="text-sm text-muted-foreground">Hoje</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sua conta foi criada com sucesso. Complete seu perfil para começar.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Atualização do Sistema</span>
                    <span className="text-sm text-muted-foreground">Ontem</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Novos recursos foram adicionados ao painel. Confira!
                  </p>
                </div>
              </div>
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

export default MedicoDashboard;