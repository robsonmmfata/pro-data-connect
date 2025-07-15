import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, 
  Filter, 
  Download, 
  Users, 
  TrendingUp, 
  Calendar as CalendarIcon,
  MapPin,
  Activity,
  Stethoscope,
  FileText,
  BarChart3,
  UserCheck,
  Clock,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { HealthProfessional, FilterOptions, SPECIALTIES, BRAZILIAN_STATES, AVAILABILITY_OPTIONS } from '@/types/professional';

interface ProfessionalDashboardProps {
  professionals: HealthProfessional[];
  onExportPDF: (filteredData: HealthProfessional[]) => void;
  onExportExcel: (filteredData: HealthProfessional[]) => void;
}

export const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({
  professionals,
  onExportPDF,
  onExportExcel
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredProfessionals = useMemo(() => {
    return professionals.filter(professional => {
      const matchesSearch = !searchTerm || 
        professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty = !filters.specialty || professional.specialty === filters.specialty;
      const matchesCity = !filters.city || professional.city.toLowerCase().includes(filters.city.toLowerCase());
      const matchesState = !filters.state || professional.state === filters.state;
      const matchesAvailability = !filters.availability || professional.availability === filters.availability;

      const matchesDateRange = (!filters.dateFrom || professional.createdAt >= filters.dateFrom) &&
        (!filters.dateTo || professional.createdAt <= filters.dateTo);

      return matchesSearch && matchesSpecialty && matchesCity && matchesState && matchesAvailability && matchesDateRange;
    });
  }, [professionals, searchTerm, filters]);

  const stats = useMemo(() => {
    const total = professionals.length;
    const available = professionals.filter(p => p.availability === 'available').length;
    const busy = professionals.filter(p => p.availability === 'busy').length;
    const unavailable = professionals.filter(p => p.availability === 'unavailable').length;
    const specialties = [...new Set(professionals.map(p => p.specialty))].length;

    return { total, available, busy, unavailable, specialties };
  }, [professionals]);

  const getAvailabilityBadge = (availability: string) => {
    const variants = {
      available: { variant: 'success' as const, label: 'Disponível', icon: UserCheck },
      busy: { variant: 'warning' as const, label: 'Ocupado', icon: Clock },
      unavailable: { variant: 'destructive' as const, label: 'Indisponível', icon: XCircle }
    };
    
    const config = variants[availability as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-medical-light">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Dashboard de Profissionais
              </h1>
              <p className="text-white/90 text-lg">
                Gerencie e monitore os profissionais da saúde cadastrados
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <BarChart3 className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Profissionais
                </CardTitle>
                <Users className="h-4 w-4 text-medical-blue" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Disponíveis
                </CardTitle>
                <UserCheck className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.available}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ocupados
                </CardTitle>
                <Clock className="h-4 w-4 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.busy}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Indisponíveis
                </CardTitle>
                <XCircle className="h-4 w-4 text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.unavailable}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Especialidades
                </CardTitle>
                <Stethoscope className="h-4 w-4 text-medical-green" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">{stats.specialties}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Buscar e Filtrar
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Buscar profissional</Label>
                  <Input
                    id="search"
                    placeholder="Nome, email, especialidade ou cidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => onExportPDF(filteredProfessionals)}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onExportExcel(filteredProfessionals)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Excel
                  </Button>
                </div>
              </div>

              {showFilters && (
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label>Especialidade</Label>
                      <Select 
                        value={filters.specialty || ''} 
                        onValueChange={(value) => setFilters(prev => ({ ...prev, specialty: value || undefined }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todas</SelectItem>
                          {SPECIALTIES.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Estado</Label>
                      <Select 
                        value={filters.state || ''} 
                        onValueChange={(value) => setFilters(prev => ({ ...prev, state: value || undefined }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todos</SelectItem>
                          {BRAZILIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Disponibilidade</Label>
                      <Select 
                        value={filters.availability || ''} 
                        onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value as any || undefined }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todas</SelectItem>
                          {AVAILABILITY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Cidade</Label>
                      <Input
                        placeholder="Filtrar por cidade..."
                        value={filters.city || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value || undefined }))}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" onClick={clearFilters}>
                      Limpar Filtros
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {filteredProfessionals.length} de {professionals.length} profissionais
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Professionals Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Profissionais Cadastrados
            </CardTitle>
            <CardDescription>
              Lista completa dos profissionais da saúde registrados na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>CRM</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Disponibilidade</TableHead>
                    <TableHead>Cadastrado em</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfessionals.map((professional) => (
                    <TableRow key={professional.id}>
                      <TableCell className="font-medium">
                        {professional.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-medical-light">
                          {professional.specialty}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {professional.crm}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {professional.city}/{professional.state}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{professional.email}</div>
                          <div className="text-xs text-muted-foreground">{professional.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getAvailabilityBadge(professional.availability)}
                      </TableCell>
                      <TableCell>
                        {format(professional.createdAt, 'dd/MM/yyyy', { locale: ptBR })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredProfessionals.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Nenhum profissional encontrado com os filtros aplicados
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};