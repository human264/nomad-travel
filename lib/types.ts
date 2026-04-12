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
