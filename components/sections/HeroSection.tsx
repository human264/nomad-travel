import StatBox from '@/components/ui/StatBox';
import { HERO_STATS } from '@/lib/data';

const ASCII_GLOBE = `
 ██████╗ ██╗      ██████╗ ██████╗ ███████╗
██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔════╝
██║  ███╗██║     ██║   ██║██████╔╝█████╗
██║   ██║██║     ██║   ██║██╔══██╗██╔══╝
╚██████╔╝███████╗╚██████╔╝██████╔╝███████╗
 ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝`.trim();

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-14 grid-bg overflow-hidden">
      {/* Radial gradient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,255,179,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">

          {/* Left: ASCII Art + tagline */}
          <div className="flex-1 text-center lg:text-left">
            {/* ASCII Logo */}
            <pre className="text-[#00ffb3] glow-green text-[6px] sm:text-[8px] md:text-[10px] leading-tight mb-6 overflow-hidden select-none">
              {ASCII_GLOBE}
            </pre>

            {/* Decorative line */}
            <div className="text-[#1e2330] text-xs mb-4 hidden lg:block">
              {'·:\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\'\':\'.'}
            </div>

            <p className="text-[#718096] text-xs tracking-[0.3em] uppercase mb-2">
              🌍 THE WORLD IS YOUR MAP
            </p>
          </div>

          {/* Right: Terminal box */}
          <div className="w-full lg:w-auto lg:min-w-[340px]">
            {/* Terminal card */}
            <div className="border border-[#1e2330] bg-[#0d1117]/90 p-6 relative">
              <span className="absolute top-0 left-0 text-[#00ffb3] text-[10px]">+</span>
              <span className="absolute top-0 right-0 text-[#00ffb3] text-[10px]">+</span>
              <span className="absolute bottom-0 left-0 text-[#00ffb3] text-[10px]">+</span>
              <span className="absolute bottom-0 right-0 text-[#00ffb3] text-[10px]">+</span>

              <div className="text-center space-y-3">
                <p className="text-[10px] tracking-[0.2em] text-[#718096]">
                  D I S C O V E R &nbsp; T H E &nbsp; W O R L D
                </p>
                <p className="text-[10px] tracking-[0.2em] text-[#718096]">
                  O N E &nbsp; C I T Y &nbsp; A T &nbsp; A &nbsp; T I M E
                </p>
                <div className="border-t border-[#1e2330] pt-3">
                  <p className="text-[#4a5568] text-[10px] tracking-widest">
                    &gt; TYPE YOUR DESTINATION
                    <span className="cursor-blink" />
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {HERO_STATS.map((stat) => (
                <StatBox key={stat.label} stat={stat} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 text-center">
          <p className="text-[#1e2330] text-[10px] tracking-widest animate-bounce">
            ▼ SCROLL TO EXPLORE ▼
          </p>
        </div>
      </div>
    </section>
  );
}
