'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FILTER_TAGS } from '@/lib/data';
import type { CityTag } from '@/lib/types';

const TAG_ICONS: Record<string, string> = {
  ALL: '◈',
  WARM: '☀',
  COLD: '❄',
  BEACH: '🏖',
  MOUNTAIN: '🏔',
  METROPOLIS: '🏙',
  BUDGET: '💸',
  LUXURY: '💎',
  ASIA: '🎌',
  EUROPE: '🗺',
  AMERICAS: '🌎',
};

export default function SearchTerminal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  // Derived directly from URL — no separate state needed, always in sync
  const activeFilter = (searchParams.get('tag') as CityTag) ?? 'ALL';

  function pushParams(q: string, tag: CityTag) {
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (tag !== 'ALL') params.set('tag', tag);
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : '/');
  }

  function handleTagClick(tag: CityTag) {
    pushParams(query, tag);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') pushParams(query, activeFilter);
  }

  function handleExecute() {
    pushParams(query, activeFilter);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Terminal window */}
      <div className="border border-[#1e2330] bg-[#0d1117]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1e2330] bg-[#111218]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 text-[#4a5568] text-[10px] tracking-widest">
            SEARCH TERMINAL — nomad-search v2.4.1
          </span>
        </div>

        <div className="p-4 space-y-4">
          {/* Description line */}
          <p className="text-[#4a5568] text-[11px] tracking-wide">
            {'// Enter city name, country, or region to begin exploration...'}
          </p>

          {/* Command line */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <span className="text-[#00ffb3] glow-green text-xs whitespace-nowrap">root@nomad</span>
            <span className="text-[#718096] text-xs">:~$</span>
            <span className="text-[#718096] text-xs whitespace-nowrap">search --city</span>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="bangkok, lisbon, bali..."
              className="bg-transparent border-0 border-b border-[#1e2330] rounded-none text-xs text-[#e2e8f0] placeholder:text-[#4a5568] focus-visible:ring-0 focus-visible:border-[#00ffb3] h-7 px-1 flex-1 min-w-[120px]"
            />
            <Button
              size="sm"
              onClick={handleExecute}
              className="text-[10px] tracking-widest border border-[#00ffb3] text-[#00ffb3] bg-transparent hover:bg-[#00ffb3]/10 hover:shadow-[0_0_8px_#00ffb3] rounded-none h-7 px-3 whitespace-nowrap transition-all"
            >
              [ EXECUTE ]
            </Button>
          </div>

          {/* Filter tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`text-[10px] tracking-wider px-2 py-1 border transition-all ${
                  activeFilter === tag
                    ? 'border-[#00ffb3] text-[#00ffb3] bg-[#00ffb3]/10 shadow-[0_0_6px_rgba(0,255,179,0.3)]'
                    : 'border-[#1e2330] text-[#718096] hover:border-[#00ffb3]/50 hover:text-[#e2e8f0]'
                }`}
              >
                {TAG_ICONS[tag]} {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
