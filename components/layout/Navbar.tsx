'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAV_LINKS } from '@/lib/data';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1e2330]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-[#00ffb3] glow-green text-lg group-hover:animate-pulse">✈</span>
          <span className="text-sm font-bold tracking-widest text-[#e2e8f0] group-hover:text-[#00ffb3] transition-colors">
            NOMAD.TRAVEL
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3 py-1.5 text-xs tracking-widest text-[#718096] hover:text-[#00ffb3] hover:glow-green transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Login */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-[#4a5568] text-xs">|</span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs tracking-widest border-[#00ffb3] text-[#00ffb3] bg-transparent hover:bg-[#00ffb3]/10 hover:shadow-[0_0_8px_#00ffb3] rounded-none h-7 px-3 transition-all"
          >
            LOGIN &gt;
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <button className="text-[#718096] hover:text-[#00ffb3] p-2 transition-colors">
              <Menu className="w-4 h-4" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#0d1117] border-l border-[#1e2330] w-64 p-0"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <span className="text-[#00ffb3] glow-green">✈</span>
                <span className="text-sm font-bold tracking-widest text-[#e2e8f0]">NOMAD.TRAVEL</span>
              </div>
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block px-3 py-2 text-xs tracking-widest text-[#718096] hover:text-[#00ffb3] hover:bg-[#00ffb3]/5 transition-colors"
                    >
                      &gt; {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#1e2330]">
                <Button
                  variant="outline"
                  className="w-full text-xs tracking-widest border-[#00ffb3] text-[#00ffb3] bg-transparent hover:bg-[#00ffb3]/10 rounded-none"
                >
                  LOGIN &gt;
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
