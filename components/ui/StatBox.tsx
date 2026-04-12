import { HeroStat } from '@/lib/types';

export default function StatBox({ stat }: { stat: HeroStat }) {
  return (
    <div className="border border-[#1e2330] bg-[#0d1117]/80 p-4 relative">
      {/* corner accents */}
      <span className="absolute top-0 left-0 text-[#00ffb3] text-[10px] leading-none">+</span>
      <span className="absolute top-0 right-0 text-[#00ffb3] text-[10px] leading-none">+</span>
      <span className="absolute bottom-0 left-0 text-[#00ffb3] text-[10px] leading-none">+</span>
      <span className="absolute bottom-0 right-0 text-[#00ffb3] text-[10px] leading-none">+</span>

      <div className="text-[#718096] text-[10px] tracking-widest mb-1">
        {stat.icon} {stat.label}
      </div>
      <div className="text-[#00ffb3] text-2xl font-bold glow-green leading-none">
        {stat.value}
      </div>
      <div className="text-[#4a5568] text-[10px] tracking-wider mt-1">
        {stat.sublabel}
      </div>
    </div>
  );
}
