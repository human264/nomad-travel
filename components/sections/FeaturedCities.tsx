import CityCard from '@/components/ui/CityCard';
import { CITIES } from '@/lib/data';

export default function FeaturedCities() {
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

      {/* City Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CITIES.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </section>
  );
}
