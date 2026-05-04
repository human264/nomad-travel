'use client';

import { useSearchParams } from 'next/navigation';
import CityCard from '@/components/ui/CityCard';
import { filterCities } from '@/lib/data';
import type { CityTag } from '@/lib/types';

export default function FeaturedCities() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const tag = (searchParams.get('tag') as CityTag) ?? 'ALL';

  const cities = filterCities(q, tag);
  const isFiltered = q !== '' || tag !== 'ALL';

  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap mb-0">
          {'╔══╡ '}
          <span className="text-[#e2e8f0] tracking-widest">FEATURED DESTINATIONS</span>
          {' ╞' + '═'.repeat(80) + '╗'}
        </div>
        <div className="border-l-2 border-r-2 border-[#1e2330] px-4 py-2 bg-[#0d1117]/30">
          <p className="text-[#4a5568] text-[10px] tracking-wide">
            {'// Top-rated cities this season — updated daily from traveler reports'}
          </p>
        </div>
        <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap">
          {'╚' + '═'.repeat(96) + '╝'}
        </div>
      </div>

      {/* Result count line */}
      {isFiltered && (
        <p className="text-[#4a5568] text-[11px] tracking-wide mb-4 font-mono">
          {'> '}
          <span className="text-[#00ffb3]">{cities.length}</span>
          {' of 8 cities'}
          {q && <span> matching &quot;{q}&quot;</span>}
          {tag !== 'ALL' && <span> tagged [{tag}]</span>}
        </p>
      )}

      {/* City Cards Grid or Empty State */}
      {cities.length === 0 ? (
        <div className="border border-[#1e2330] bg-[#0d1117] p-8 text-center space-y-2">
          <p className="text-[#00ffb3] glow-green text-[11px] tracking-widest font-mono">
            {'> NO_RESULTS_FOUND'}
          </p>
          <p className="text-[#4a5568] text-[10px] tracking-wide">
            {'// No cities match your query. Try a different search or tag.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      )}
    </section>
  );
}
