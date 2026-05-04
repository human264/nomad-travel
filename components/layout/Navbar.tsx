'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAV_LINKS } from '@/lib/data';
import { Menu } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { logout } from '@/app/auth/actions';

export default function Navbar({ user }: { user: User | null }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-[#00ffb3] glow-green text-lg group-hover:animate-pulse">✈</span>
          <span className="text-sm font-bold tracking-widest text-[#e2e8f0] group-hover:text-[#00ffb3] transition-colors">
            NOMAD.TRAVEL
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`px-3 py-1.5 text-xs tracking-widest transition-colors ${
                    isActive
                      ? 'text-[#00ffb3] glow-green'
                      : 'text-[#718096] hover:text-[#00ffb3] hover:glow-green'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-[#4a5568] text-xs">|</span>
          {user ? (
            <form action={logout}>
              <button
                type="submit"
                className="text-xs tracking-widest border border-[#4a5568] text-[#718096] bg-transparent hover:border-red-500/50 hover:text-red-400 h-7 px-3 transition-all"
              >
                LOGOUT
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="text-xs tracking-widest border border-[#00ffb3] text-[#00ffb3] bg-transparent hover:bg-[#00ffb3]/10 hover:shadow-[0_0_8px_#00ffb3] h-7 px-3 transition-all inline-flex items-center"
            >
              LOGIN &gt;
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <Sheet>
          <SheetTrigger className="md:hidden text-[#718096] hover:text-[#00ffb3] p-2 transition-colors bg-transparent border-none cursor-pointer">
            <Menu className="w-4 h-4" />
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
                {NAV_LINKS.map((link) => {
                  const isActive = link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`block px-3 py-2 text-xs tracking-widest transition-colors hover:bg-[#00ffb3]/5 ${
                          isActive
                            ? 'text-[#00ffb3] glow-green'
                            : 'text-[#718096] hover:text-[#00ffb3]'
                        }`}
                      >
                        &gt; {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#1e2330]">
                {user ? (
                  <form action={logout}>
                    <button
                      type="submit"
                      className="w-full text-xs tracking-widest border border-[#4a5568] text-[#718096] bg-transparent hover:border-red-500/50 hover:text-red-400 py-2 transition-all"
                    >
                      LOGOUT
                    </button>
                  </form>
                ) : (
                  <Link
                    href="/login"
                    className="w-full text-xs tracking-widest border border-[#00ffb3] text-[#00ffb3] bg-transparent hover:bg-[#00ffb3]/10 py-2 transition-all flex items-center justify-center"
                  >
                    LOGIN &gt;
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
