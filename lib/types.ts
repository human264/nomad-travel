export type WeatherType = 'SUNNY' | 'PARTLY_CLOUDY' | 'CLOUDY' | 'RAINY' | 'TROPICAL';
export type BudgetGrade = 'A' | 'B' | 'C' | 'D';
export type CityTag =
  | 'ALL'
  | 'WARM'
  | 'COLD'
  | 'BEACH'
  | 'MOUNTAIN'
  | 'METROPOLIS'
  | 'BUDGET'
  | 'LUXURY'
  | 'ASIA'
  | 'EUROPE'
  | 'AMERICAS';

export interface CostIndex {
  rent: number;
  food: number;
  transport: number;
  total: number;
  nomadScore: number;
}

export interface CoworkingSpace {
  name: string;
  pricePerDay: number;
  speedMbps: number;
}

export interface Neighborhood {
  name: string;
  vibe: string;
  avgRent: number;
}

export interface VisaInfo {
  visaFreeDays: number;
  digitalNomadVisa: boolean;
  digitalNomadVisaNote: string;
  workPermitDifficulty: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface MonthlyWeather {
  month: string;
  tempLow: number;
  tempHigh: number;
  rainDays: number;
}

export interface CityDetails {
  coworkingSpaces: CoworkingSpace[];
  neighborhoods: Neighborhood[];
  visa: VisaInfo;
  monthlyWeather: MonthlyWeather[];
  pros: string[];
  cons: string[];
}

export interface CityData {
  id: string;
  name: string;
  country: string;
  flag: string;
  colorTheme: string;
  glowClass: string;
  shadowClass: string;
  asciiSkyline: string[];
  weather: WeatherType;
  weatherIcon: string;
  weatherDesc: string;
  temperature: string;
  budgetGrade: BudgetGrade;
  budgetLabel: string;
  population: string;
  timezone: string;
  language: string;
  currency: string;
  nomadScore: number;
  tags: CityTag[];
  internetSpeed: string;
  costIndex: CostIndex;
  details: CityDetails;
}

export interface HeroStat {
  label: string;
  value: string;
  icon: string;
  sublabel: string;
}

export const FILTER_TAGS: CityTag[] = [
  'ALL',
  'WARM',
  'COLD',
  'BEACH',
  'MOUNTAIN',
  'METROPOLIS',
  'BUDGET',
  'LUXURY',
  'ASIA',
  'EUROPE',
  'AMERICAS',
];
