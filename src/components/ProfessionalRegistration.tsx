import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Stethoscope, Shield, CheckCircle, Heart, Users } from 'lucide-react';
import { ProfessionalFormData, SPECIALTIES, BRAZILIAN_STATES, AVAILABILITY_OPTIONS } from '@/types/professional';

interface ProfessionalRegistrationProps {
  onSubmit: (data: ProfessionalFormData) => void;
}

export const ProfessionalRegistration: React.FC<ProfessionalRegistrationProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProfessionalFormData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    specialty: '',
    crm: '',
    city: '',
    state: '',
    availability: 'available'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ProfessionalFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCPF = (cpf: string) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (phone: string) => {
    return phone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'cpf', 'specialty', 'crm', 'city', 'state'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof ProfessionalFormData]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Email inválido",
          description: "Por favor, insira um email válido.",
          variant: "destructive",
        });
        return;
      }

      // Validate CPF format (basic validation)
      if (formData.cpf.replace(/\D/g, '').length !== 11) {
        toast({
          title: "CPF inválido",
          description: "Por favor, insira um CPF válido.",
          variant: "destructive",
        });
        return;
      }

      await onSubmit(formData);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Profissional cadastrado no sistema.",
        variant: "default",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        specialty: '',
        crm: '',
        city: '',
        state: '',
        availability: 'available'
      });

    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao cadastrar o profissional. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-medical-light">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-full">
                <Stethoscope className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cadastro de Profissionais da Saúde
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Plataforma segura e confiável para registro de profissionais da saúde
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full w-fit">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-medical-blue">Segurança Garantida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Dados criptografados e protegidos seguindo as melhores práticas de segurança
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-gradient-to-r from-secondary to-primary text-white rounded-full w-fit">
                <CheckCircle className="h-8 w-8" />
              </div>
              <CardTitle className="text-medical-green">Validação Automática</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Sistema inteligente com validações automáticas para garantir dados precisos
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full w-fit">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="text-medical-blue">Gestão Eficiente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Painel completo com relatórios e filtros para uma gestão eficiente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <Card className="max-w-4xl mx-auto shadow-medical">
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-gradient-to-r from-medical-blue to-medical-green text-white rounded-full w-fit mb-4">
              <UserPlus className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl text-medical-blue">Cadastro de Profissional</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para registrar um novo profissional da saúde
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5 text-medical-blue" />
                  <h3 className="text-lg font-semibold text-medical-blue">Informações Pessoais</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Digite o nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="exemplo@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="h-5 w-5 text-medical-green" />
                  <h3 className="text-lg font-semibold text-medical-green">Informações Profissionais</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade *</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPECIALTIES.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crm">CRM *</Label>
                    <Input
                      id="crm"
                      type="text"
                      value={formData.crm}
                      onChange={(e) => handleInputChange('crm', e.target.value.toUpperCase())}
                      placeholder="CRM/UF 000000"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Digite a cidade"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRAZILIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Disponibilidade *</Label>
                    <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABILITY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  variant="medical"
                  size="xl"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" />
                      Cadastrar Profissional
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};