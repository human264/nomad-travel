import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITIES } from '@/lib/data';
import AsciiSkyline from '@/components/ui/AsciiSkyline';
import NomadScoreGauge from '@/components/ui/NomadScoreGauge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export async function generateStaticParams() {
  return CITIES.map((city) => ({ id: city.id }));
}

const BUDGET_COLORS: Record<string, string> = {
  A: '#00ffb3',
  B: '#ffd700',
  C: '#ff8c42',
  D: '#ff6b9d',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  LOW: '#00ffb3',
  MEDIUM: '#ffd700',
  HIGH: '#ff6b9d',
};

function rainDaysColor(days: number): string {
  if (days <= 5) return '#00ffb3';
  if (days <= 12) return '#ffb347';
  return '#ff6b9d';
}

function SectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <div className="mb-4">
      <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap">
        {'╔══╡ '}
        <span className="tracking-widest" style={{ color }}>
          {title}
        </span>
        {' ╞' + '═'.repeat(50) + '╗'}
      </div>
    </div>
  );
}

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const city = CITIES.find((c) => c.id === id);
  if (!city) notFound();

  const { details } = city;
  const budgetColor = BUDGET_COLORS[city.budgetGrade] ?? '#718096';

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="text-[10px] tracking-widest text-[#718096] hover:text-[#00ffb3] transition-colors font-mono"
        >
          ← BACK TO EXPLORE
        </Link>
        <button
          disabled
          className="text-[10px] tracking-widest border border-[#ff6b9d] text-[#ff6b9d] px-4 py-1.5 opacity-50 cursor-not-allowed font-mono"
        >
          [ ♡ SAVE CITY ]
        </button>
      </div>

      {/* Hero */}
      <section className="mb-8">
        <SectionHeader title={city.name} color={city.colorTheme} />
        <div className="border border-[#1e2330] bg-[#0d1117]">
          {/* City meta */}
          <div className="px-6 pt-5 pb-3 flex flex-wrap gap-x-6 gap-y-1">
            <span className="text-2xl">{city.flag}</span>
            <span className="text-[11px] text-[#718096] self-center">
              <span className="text-[#4a5568]">country</span>{' '}
              <span className="text-[#e2e8f0]">{city.country}</span>
            </span>
            <span className="text-[11px] text-[#718096] self-center">
              <span className="text-[#4a5568]">tz</span>{' '}
              <span className="text-[#e2e8f0]">{city.timezone}</span>
            </span>
            <span className="text-[11px] text-[#718096] self-center">
              <span className="text-[#4a5568]">lang</span>{' '}
              <span className="text-[#e2e8f0]">{city.language}</span>
            </span>
            <span className="text-[11px] text-[#718096] self-center">
              <span className="text-[#4a5568]">currency</span>{' '}
              <span className="text-[#e2e8f0]">{city.currency}</span>
            </span>
          </div>

          {/* ASCII Skyline */}
          <div className="px-6 py-4 bg-[#0a0a0f] border-t border-b border-[#1e2330]">
            <AsciiSkyline lines={city.asciiSkyline} color={city.colorTheme} />
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#1e2330]">
            <div className="px-6 py-4">
              <p className="text-[10px] text-[#4a5568] tracking-widest mb-2">NOMAD SCORE</p>
              <NomadScoreGauge score={city.nomadScore} color={city.colorTheme} />
            </div>
            <div className="px-6 py-4">
              <p className="text-[10px] text-[#4a5568] tracking-widest mb-2">BUDGET GRADE</p>
              <div className="flex items-center gap-2">
                <span
                  className="text-lg font-bold border px-2 py-0.5"
                  style={{ color: budgetColor, borderColor: budgetColor }}
                >
                  [{city.budgetGrade}]
                </span>
                <span className="text-[11px] text-[#718096]">{city.budgetLabel}</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-[10px] text-[#4a5568] tracking-widest mb-2">INTERNET SPEED</p>
              <p className="text-[#e2e8f0] text-lg font-bold font-mono">
                ⚡ {city.internetSpeed}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="mb-8">
        <SectionHeader title="COST INDEX — MONTHLY (USD)" color={city.colorTheme} />
        <div className="border border-[#1e2330] bg-[#0d1117]">
          <div className="grid grid-cols-3 divide-x divide-[#1e2330]">
            {[
              { label: 'RENT', value: city.costIndex.rent },
              { label: 'FOOD', value: city.costIndex.food },
              { label: 'TRANSPORT', value: city.costIndex.transport },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 py-5 text-center">
                <p className="text-[10px] text-[#4a5568] tracking-widest mb-1">{label}</p>
                <p className="text-xl font-bold font-mono" style={{ color: city.colorTheme }}>
                  ${value.toLocaleString()}
                </p>
                <p className="text-[10px] text-[#4a5568]">/mo</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1e2330] px-6 py-3 flex items-center justify-between">
            <span className="text-[10px] text-[#718096] tracking-widest">ESTIMATED TOTAL</span>
            <span className="text-lg font-bold font-mono" style={{ color: city.colorTheme }}>
              ${city.costIndex.total.toLocaleString()}<span className="text-[11px] text-[#4a5568]">/mo</span>
            </span>
          </div>
        </div>
      </section>

      {/* Coworking Spaces */}
      <section className="mb-8">
        <SectionHeader title="COWORKING SPACES" color={city.colorTheme} />
        <div className="border border-[#1e2330] bg-[#0d1117] overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#1e2330] hover:bg-transparent">
                <TableHead className="text-[10px] tracking-widest h-9 pl-4" style={{ color: city.colorTheme }}>
                  NAME
                </TableHead>
                <TableHead className="text-[10px] tracking-widest h-9" style={{ color: city.colorTheme }}>
                  $/DAY
                </TableHead>
                <TableHead className="text-[10px] tracking-widest h-9 pr-4" style={{ color: city.colorTheme }}>
                  SPEED
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.coworkingSpaces.map((space) => (
                <TableRow key={space.name} className="border-b border-[#1e2330]/50 hover:bg-[#111218]/50">
                  <TableCell className="text-[#e2e8f0] text-[11px] h-10 pl-4">{space.name}</TableCell>
                  <TableCell className="text-[11px] h-10 font-mono" style={{ color: city.colorTheme }}>
                    ${space.pricePerDay}
                  </TableCell>
                  <TableCell className="text-[#718096] text-[11px] h-10 pr-4">
                    {space.speedMbps} Mbps
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Monthly Weather */}
      <section className="mb-8">
        <SectionHeader title="WEATHER PATTERNS" color={city.colorTheme} />
        <div className="border border-[#1e2330] bg-[#0d1117] overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#1e2330] hover:bg-transparent">
                <TableHead className="text-[10px] tracking-widest h-9 pl-4" style={{ color: city.colorTheme }}>
                  MONTH
                </TableHead>
                <TableHead className="text-[10px] tracking-widest h-9" style={{ color: city.colorTheme }}>
                  TEMP RANGE
                </TableHead>
                <TableHead className="text-[10px] tracking-widest h-9 pr-4" style={{ color: city.colorTheme }}>
                  RAIN DAYS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.monthlyWeather.map((w) => (
                <TableRow key={w.month} className="border-b border-[#1e2330]/50 hover:bg-[#111218]/50">
                  <TableCell className="text-[#e2e8f0] text-[11px] h-9 pl-4 font-mono">
                    {w.month}
                  </TableCell>
                  <TableCell className="text-[#718096] text-[11px] h-9 font-mono">
                    {w.tempLow}°C – {w.tempHigh}°C
                  </TableCell>
                  <TableCell
                    className="text-[11px] h-9 pr-4 font-mono font-bold"
                    style={{ color: rainDaysColor(w.rainDays) }}
                  >
                    {w.rainDays}d
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="px-4 py-2 border-t border-[#1e2330]">
            <p className="text-[10px] text-[#4a5568]">
              {'* Rain days color: '}
              <span className="text-[#00ffb3]">green ≤5</span>
              {' | '}
              <span className="text-[#ffb347]">amber 6–12</span>
              {' | '}
              <span className="text-[#ff6b9d]">pink 13+</span>
            </p>
          </div>
        </div>
      </section>

      {/* Visa Info */}
      <section className="mb-8">
        <SectionHeader title="VISA & PERMITS" color={city.colorTheme} />
        <div className="border border-[#1e2330] bg-[#0d1117] px-6 py-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1e2330] pb-3">
            <span className="text-[10px] text-[#718096] tracking-widest">VISA-FREE STAY</span>
            <span className="text-[#e2e8f0] text-[13px] font-bold font-mono">
              {details.visa.visaFreeDays > 0
                ? `${details.visa.visaFreeDays} DAYS`
                : 'VISA REQUIRED'}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-[#1e2330] pb-3">
            <span className="text-[10px] text-[#718096] tracking-widest">DIGITAL NOMAD VISA</span>
            <span
              className="text-[13px] font-bold font-mono border px-2 py-0.5"
              style={{
                color: details.visa.digitalNomadVisa ? '#00ffb3' : '#ff6b9d',
                borderColor: details.visa.digitalNomadVisa ? '#00ffb3' : '#ff6b9d',
              }}
            >
              {details.visa.digitalNomadVisa ? '[ YES ]' : '[ NO ]'}
            </span>
          </div>
          {details.visa.digitalNomadVisaNote && (
            <p className="text-[10px] text-[#4a5568] pb-3 border-b border-[#1e2330]">
              {'// '}{details.visa.digitalNomadVisaNote}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#718096] tracking-widest">WORK PERMIT</span>
            <span
              className="text-[11px] font-bold tracking-widest font-mono"
              style={{ color: DIFFICULTY_COLORS[details.visa.workPermitDifficulty] }}
            >
              {details.visa.workPermitDifficulty}
            </span>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="mb-8">
        <SectionHeader title="NEIGHBORHOODS" color={city.colorTheme} />
        <div className="border border-[#1e2330] bg-[#0d1117] divide-y divide-[#1e2330]">
          {details.neighborhoods.map((n) => (
            <div key={n.name} className="px-6 py-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[10px]" style={{ color: city.colorTheme }}>{'>'}</span>
              <span className="text-[#e2e8f0] text-[12px] font-bold tracking-wider">{n.name}</span>
              <span className="text-[#4a5568] text-[10px]">—</span>
              <span className="text-[#718096] text-[11px]">{n.vibe}</span>
              <span className="text-[#4a5568] text-[10px] ml-auto">
                avg{' '}
                <span className="text-[#e2e8f0] font-mono">${n.avgRent.toLocaleString()}</span>
                /mo
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="mb-4">
        <SectionHeader title="ANALYSIS" color={city.colorTheme} />
        <div className="border border-[#1e2330] bg-[#0d1117]">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#1e2330]">
            <div className="px-6 py-5">
              <p className="text-[10px] tracking-widest text-[#00ffb3] mb-3 font-mono">[+] ADVANTAGES</p>
              {details.pros.map((pro, i) => (
                <p key={i} className="text-[#718096] text-[11px] mb-2">
                  <span className="text-[#00ffb3] mr-1">{'>'}</span>
                  {pro}
                </p>
              ))}
            </div>
            <div className="px-6 py-5">
              <p className="text-[10px] tracking-widest text-[#ff6b9d] mb-3 font-mono">[-] DISADVANTAGES</p>
              {details.cons.map((con, i) => (
                <p key={i} className="text-[#718096] text-[11px] mb-2">
                  <span className="text-[#ff6b9d] mr-1">{'>'}</span>
                  {con}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
