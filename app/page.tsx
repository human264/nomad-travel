import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import SearchTerminal from '@/components/sections/SearchTerminal';
import FeaturedCities from '@/components/sections/FeaturedCities';
import CostOfLivingTable from '@/components/sections/CostOfLivingTable';
import CtaSection from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={null}>
        <SearchTerminal />
      </Suspense>
      <Suspense fallback={null}>
        <FeaturedCities />
      </Suspense>
      <Suspense fallback={null}>
        <CostOfLivingTable />
      </Suspense>
      <CtaSection />
    </>
  );
}
