'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CityCard from '@/components/ui/CityCard';
import { filterAndSortCities, BUDGET_PRESETS } from '@/lib/data';
import type { CityTag, SortOption } from '@/lib/types';
import { FILTER_TAGS } from '@/lib/types';

const BUDGET_COLORS: Record<string, string> = {
  A: '#00ffb3', B: '#ffd700', C: '#ff8c42', D: '#ff6b9d',
};

function parseTags(raw: string | null): CityTag[] {
  if (!raw) return [];
  return raw.split(',').filter((t): t is CityTag =>
    (FILTER_TAGS as string[]).includes(t)
  );
}

export default function ExploreGrid() {
  const searchParams = useSearchParams();

  const q      = searchParams.get('q')      ?? '';
  const tags   = parseTags(searchParams.get('tags'));
  const budget = searchParams.get('budget') ?? 'ALL';
  const sort   = (searchParams.get('sort')  as SortOption) ?? 'SCORE';
  const view   = searchParams.get('view')   ?? 'grid';

  const preset = BUDGET_PRESETS.find((p) => p.label === budget) ?? BUDGET_PRESETS[0];
  const cities = filterAndSortCities(q, tags, preset.label, sort);

  if (cities.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="border border-[#1e2330] bg-[#0d1117] p-12 text-center space-y-2">
          <p className="text-[#00ffb3] glow-green text-[11px] tracking-widest font-mono">
            {'> NO_RESULTS_FOUND'}
          </p>
          <p className="text-[#4a5568] text-[10px] tracking-wide">
            {'// No cities match your query. Try adjusting the filters.'}
          </p>
        </div>
      </section>
    );
  }

  if (view === 'list') {
    return (
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="border border-[#1e2330] bg-[#0d1117] overflow-x-auto">
          {/* List header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_auto] gap-4 px-4 py-2 border-b border-[#1e2330] bg-[#111218]">
            {['CITY', 'SCORE', 'BUDGET', 'TOTAL/MO', 'TAGS', ''].map((h) => (
              <span key={h} className="text-[10px] tracking-widest text-[#4a5568]">{h}</span>
            ))}
          </div>

          {cities.map((city) => {
            const budgetColor = BUDGET_COLORS[city.budgetGrade] ?? '#718096';
            return (
              <div
                key={city.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_auto] gap-4 items-center px-4 py-3 border-b border-[#1e2330] hover:bg-[#111218] transition-colors"
                style={{ borderLeftColor: city.colorTheme, borderLeftWidth: 2 }}
              >
                {/* City name */}
                <div>
                  <span className="text-xs font-bold tracking-wider" style={{ color: city.colorTheme }}>
                    {city.flag} {city.name}
                  </span>
                  <span className="block text-[10px] text-[#4a5568]">{city.country}</span>
                </div>

                {/* Nomad score */}
                <span className="text-xs font-bold text-[#00ffb3]">{city.nomadScore}</span>

                {/* Budget grade */}
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 border w-fit"
                  style={{ color: budgetColor, borderColor: budgetColor }}
                >
                  [{city.budgetGrade}]
                </span>

                {/* Monthly cost */}
                <span className="text-[11px] text-[#e2e8f0]">
                  ${city.costIndex.total.toLocaleString()}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {city.tags.map((tag) => (
                    <span key={tag} className="text-[9px] tracking-wider px-1.5 py-0.5 border border-[#1e2330] text-[#718096]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/cities/${city.id}`}
                  className="text-[10px] tracking-widest border rounded-none h-7 px-3 inline-flex items-center whitespace-nowrap transition-all hover:opacity-80"
                  style={{ borderColor: city.colorTheme, color: city.colorTheme }}
                >
                  ✈ EXPLORE →
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Grid view
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </section>
  );
}
