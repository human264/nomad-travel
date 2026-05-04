import { Suspense } from 'react';
import ExploreFilters from '@/components/sections/ExploreFilters';
import ExploreGrid from '@/components/sections/ExploreGrid';
import { filterAndSortCities } from '@/lib/data';
import type { CityTag, SortOption } from '@/lib/types';
import { FILTER_TAGS } from '@/lib/types';

function parseTags(raw: string | undefined): CityTag[] {
  if (!raw) return [];
  return raw.split(',').filter((t): t is CityTag =>
    (FILTER_TAGS as string[]).includes(t)
  );
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params  = await searchParams;
  const q       = params.q      ?? '';
  const tags    = parseTags(params.tags);
  const budget  = params.budget ?? 'ALL';
  const sort    = (params.sort as SortOption) ?? 'SCORE';

  const totalCount = filterAndSortCities(q, tags, budget, sort).length;

  return (
    <main className="pt-14 min-h-screen bg-[#0a0a0f]">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-2">
        <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap mb-0">
          {'╔══╡ '}
          <span className="text-[#e2e8f0] tracking-widest">EXPLORE CITIES</span>
          {' ╞' + '═'.repeat(80) + '╗'}
        </div>
        <div className="border-l-2 border-r-2 border-[#1e2330] px-4 py-2 bg-[#0d1117]/30">
          <p className="text-[#4a5568] text-[10px] tracking-wide">
            {'// Browse all destinations — use filters to narrow your search'}
          </p>
        </div>
        <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap">
          {'╚' + '═'.repeat(96) + '╝'}
        </div>
      </div>

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-8 text-[#4a5568] text-xs tracking-widest font-mono">
            {'> LOADING FILTERS...'}
          </div>
        }
      >
        <ExploreFilters totalCount={totalCount} />
      </Suspense>

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-8 text-[#4a5568] text-xs tracking-widest font-mono">
            {'> LOADING CITIES...'}
          </div>
        }
      >
        <ExploreGrid />
      </Suspense>
    </main>
  );
}
