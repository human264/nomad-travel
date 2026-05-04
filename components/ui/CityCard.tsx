import Link from 'next/link';
import { CityData } from '@/lib/types';
import AsciiSkyline from './AsciiSkyline';
import NomadScoreGauge from './NomadScoreGauge';
import { Button } from '@/components/ui/button';

const BUDGET_COLORS: Record<string, string> = {
  A: '#00ffb3',
  B: '#ffd700',
  C: '#ff8c42',
  D: '#ff6b9d',
};

export default function CityCard({ city }: { city: CityData }) {
  const budgetColor = BUDGET_COLORS[city.budgetGrade] ?? '#718096';

  return (
    <div
      className={`city-card bg-[#111218] border border-[#1e2330] flex flex-col overflow-hidden hover:${city.shadowClass}`}
      style={{ borderTopColor: city.colorTheme, borderTopWidth: 2 }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <span
          className="text-xs font-bold tracking-widest"
          style={{ color: city.colorTheme }}
        >
          {city.name}
        </span>
        <span className="text-lg" title={city.country}>
          {city.flag}
        </span>
      </div>

      {/* Country */}
      <div className="px-4 pb-2">
        <span className="text-[10px] tracking-wider text-[#4a5568]">
          // {city.country.toUpperCase()}
        </span>
      </div>

      {/* ASCII Skyline */}
      <div className="px-4 py-2 bg-[#0d1117]/50 border-t border-b border-[#1e2330]">
        <AsciiSkyline lines={city.asciiSkyline} color={city.colorTheme} />
      </div>

      {/* Info rows */}
      <div className="px-4 py-3 space-y-2 flex-1">
        {/* Weather */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#718096]">
            {city.weatherIcon} {city.temperature}
          </span>
          <span className="text-[10px] text-[#4a5568] tracking-wide">{city.weatherDesc}</span>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#718096]">BUDGET</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 border"
            style={{ color: budgetColor, borderColor: budgetColor }}
          >
            [{city.budgetGrade}]
          </span>
          <span className="text-[10px] text-[#4a5568]">{city.budgetLabel}</span>
        </div>

        <div className="border-t border-[#1e2330] pt-2 space-y-1.5">
          {/* Population & Timezone */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#718096]">👥 {city.population}</span>
            <span className="text-[10px] text-[#718096]">⏰ {city.timezone}</span>
          </div>
          {/* Language & Currency */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#718096]">🗣 {city.language}</span>
            <span className="text-[10px] text-[#718096]">💱 {city.currency}</span>
          </div>
          {/* Internet */}
          <div className="text-[10px] text-[#718096]">
            ⚡ {city.internetSpeed} avg
          </div>
        </div>

        {/* Score gauge */}
        <div className="border-t border-[#1e2330] pt-2">
          <NomadScoreGauge score={city.nomadScore} color={city.colorTheme} />
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-4 pb-4 pt-2 border-t border-[#1e2330] flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-[10px] tracking-widest border border-[#1e2330] text-[#718096] hover:border-[#ff6b9d] hover:text-[#ff6b9d] rounded-none h-7 transition-all"
        >
          ♡ SAVE
        </Button>
        <Link
          href={`/cities/${city.id}`}
          className="flex-1 inline-flex items-center justify-center text-[10px] tracking-widest border rounded-none h-7 transition-all hover:opacity-80"
          style={{ borderColor: city.colorTheme, color: city.colorTheme }}
        >
          ✈ EXPLORE →
        </Link>
      </div>
    </div>
  );
}
