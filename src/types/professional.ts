export interface HealthProfessional {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  specialty: string;
  crm: string;
  city: string;
  state: string;
  availability: 'available' | 'busy' | 'unavailable';
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfessionalFormData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  specialty: string;
  crm: string;
  city: string;
  state: string;
  availability: 'available' | 'busy' | 'unavailable';
}

export interface FilterOptions {
  specialty?: string;
  city?: string;
  state?: string;
  availability?: 'available' | 'busy' | 'unavailable';
  dateFrom?: Date;
  dateTo?: Date;
}

export const SPECIALTIES = [
  'Cardiologia',
  'Dermatologia',
  'Endocrinologia',
  'Gastroenterologia',
  'Geriatria',
  'Ginecologia',
  'Neurologia',
  'Oftalmologia',
  'Ortopedia',
  'Pediatria',
  'Psiquiatria',
  'Urologia',
  'Clínica Geral',
  'Medicina do Trabalho',
  'Medicina Preventiva',
  'Radiologia',
  'Anestesiologia',
  'Cirurgia Geral',
  'Medicina de Emergência',
  'Medicina Intensiva'
] as const;

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

export const AVAILABILITY_OPTIONS = [
  { value: 'available', label: 'Disponível' },
  { value: 'busy', label: 'Ocupado' },
  { value: 'unavailable', label: 'Indisponível' }
] as const;