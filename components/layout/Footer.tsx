import { FOOTER_LINKS } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-[#1e2330] bg-[#0d1117] mt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top border line */}
        <div className="text-[#1e2330] text-xs mb-6 overflow-hidden whitespace-nowrap">
          {'='.repeat(120)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#00ffb3] glow-green">✈</span>
              <span className="text-sm font-bold tracking-widest text-[#e2e8f0]">NOMAD.TRAVEL</span>
            </div>
            <div className="text-[#4a5568] text-[10px] tracking-wider leading-relaxed">
              v2.4.1<br />
              ASCII City Explorer<br />
              <br />
              Built with ♥<br />
              for digital nomads<br />
              everywhere
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[#00ffb3] text-[10px] tracking-[0.2em] font-bold mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#4a5568] text-[11px] tracking-wider hover:text-[#00ffb3] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="text-[#1e2330] text-xs mb-4 overflow-hidden whitespace-nowrap">
          {'─'.repeat(120)}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p className="text-[#4a5568] text-[10px] tracking-widest">
            © 2026 NOMAD.TRAVEL — ALL SYSTEMS NOMINAL
          </p>
          <p className="text-[#4a5568] text-[10px] tracking-wider">
            MIT Licensed · Data updated April 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
