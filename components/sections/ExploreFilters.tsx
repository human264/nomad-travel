'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FILTER_TAGS, BUDGET_PRESETS, SORT_OPTIONS } from '@/lib/data';
import type { CityTag, SortOption } from '@/lib/types';

const TAG_ICONS: Record<string, string> = {
  ALL: '◈', WARM: '☀', COLD: '❄', BEACH: '🏖', MOUNTAIN: '🏔',
  METROPOLIS: '🏙', BUDGET: '💸', LUXURY: '💎', ASIA: '🎌', EUROPE: '🗺', AMERICAS: '🌎',
};

function parseTags(raw: string | null): CityTag[] {
  if (!raw) return [];
  return raw.split(',').filter((t): t is CityTag =>
    (FILTER_TAGS as string[]).includes(t)
  );
}

export default function ExploreFilters({ totalCount }: { totalCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const selectedTags = parseTags(searchParams.get('tags'));
  const budget = searchParams.get('budget') ?? 'ALL';
  const sort = (searchParams.get('sort') as SortOption) ?? 'SCORE';
  const view = searchParams.get('view') ?? 'grid';

  function buildParams(overrides: Record<string, string | string[]>) {
    const base: Record<string, string> = {
      q:      searchParams.get('q')      ?? '',
      tags:   searchParams.get('tags')   ?? '',
      budget: searchParams.get('budget') ?? 'ALL',
      sort:   searchParams.get('sort')   ?? 'SCORE',
      view:   searchParams.get('view')   ?? 'grid',
      ...Object.fromEntries(
        Object.entries(overrides).map(([k, v]) => [k, Array.isArray(v) ? v.join(',') : v])
      ),
    };
    const params = new URLSearchParams();
    if (base.q.trim())           params.set('q', base.q.trim());
    if (base.tags)               params.set('tags', base.tags);
    if (base.budget !== 'ALL')   params.set('budget', base.budget);
    if (base.sort !== 'SCORE')   params.set('sort', base.sort);
    if (base.view !== 'grid')    params.set('view', base.view);
    const qs = params.toString();
    router.push(qs ? `/explore?${qs}` : '/explore');
  }

  function handleExecute() {
    buildParams({ q: query });
  }

  function handleTagClick(tag: CityTag) {
    if (tag === 'ALL') {
      buildParams({ tags: '' });
      return;
    }
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    buildParams({ tags: next.join(',') });
  }

  function handleBudget(label: string) {
    buildParams({ budget: label });
  }

  function handleSort(value: SortOption) {
    buildParams({ sort: value });
  }

  function handleView(v: string) {
    buildParams({ view: v });
  }

  function handleReset() {
    setQuery('');
    router.push('/explore');
  }

  const isAllTags = selectedTags.length === 0;
  const hasActiveFilters =
    query.trim() !== '' || selectedTags.length > 0 || budget !== 'ALL';

  const activeFilterLabels = [
    ...selectedTags,
    budget !== 'ALL' ? budget : null,
  ].filter(Boolean);

  return (
    <section className="max-w-7xl mx-auto px-4 pt-8 pb-4">
      <div className="border border-[#1e2330] bg-[#0d1117]">
        {/* Terminal title bar */}
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-[#1e2330] bg-[#111218]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 text-[#4a5568] text-[10px] tracking-widest">
              EXPLORE TERMINAL — city-browser v3.0.0
            </span>
          </div>
          {/* View toggle */}
          <div className="flex gap-1">
            {(['grid', 'list'] as const).map((v) => (
              <button
                key={v}
                onClick={() => handleView(v)}
                className={`text-[10px] tracking-widest px-2 py-0.5 border transition-all ${
                  view === v
                    ? 'border-[#00ffb3] text-[#00ffb3] bg-[#00ffb3]/10'
                    : 'border-[#1e2330] text-[#4a5568] hover:border-[#00ffb3]/50 hover:text-[#e2e8f0]'
                }`}
              >
                [ {v.toUpperCase()} ]
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Search row */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <span className="text-[#00ffb3] glow-green text-xs whitespace-nowrap">root@nomad</span>
            <span className="text-[#718096] text-xs">:~$</span>
            <span className="text-[#718096] text-xs whitespace-nowrap">explore --city</span>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleExecute(); }}
              placeholder="search city or country..."
              className="bg-transparent border-0 border-b border-[#1e2330] rounded-none text-xs text-[#e2e8f0] placeholder:text-[#4a5568] focus-visible:ring-0 focus-visible:border-[#00ffb3] h-7 px-1 flex-1 min-w-[120px]"
            />
            <Button
              size="sm"
              onClick={handleExecute}
              className="text-[10px] tracking-widest border border-[#00ffb3] text-[#00ffb3] bg-transparent hover:bg-[#00ffb3]/10 hover:shadow-[0_0_8px_#00ffb3] rounded-none h-7 px-3 whitespace-nowrap transition-all"
            >
              [ EXECUTE ]
            </Button>
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="text-[10px] tracking-widest px-2 py-1 border border-red-500/40 text-red-400/70 hover:border-red-400 hover:text-red-400 transition-all whitespace-nowrap"
              >
                RESET
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <p className="text-[#4a5568] text-[10px] tracking-wider">{'// TAG FILTER (multi-select)'}</p>
            <div className="flex flex-wrap gap-1.5">
              {/* ALL shortcut */}
              <button
                onClick={() => handleTagClick('ALL')}
                className={`text-[10px] tracking-wider px-2 py-1 border transition-all ${
                  isAllTags
                    ? 'border-[#00ffb3] text-[#00ffb3] bg-[#00ffb3]/10 shadow-[0_0_6px_rgba(0,255,179,0.3)]'
                    : 'border-[#1e2330] text-[#718096] hover:border-[#00ffb3]/50 hover:text-[#e2e8f0]'
                }`}
              >
                {TAG_ICONS['ALL']} ALL
              </button>
              {FILTER_TAGS.filter((t) => t !== 'ALL').map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`text-[10px] tracking-wider px-2 py-1 border transition-all ${
                    selectedTags.includes(tag)
                      ? 'border-[#00ffb3] text-[#00ffb3] bg-[#00ffb3]/10 shadow-[0_0_6px_rgba(0,255,179,0.3)]'
                      : 'border-[#1e2330] text-[#718096] hover:border-[#00ffb3]/50 hover:text-[#e2e8f0]'
                  }`}
                >
                  {TAG_ICONS[tag]} {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Budget + Sort row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Budget presets */}
            <div className="space-y-1.5">
              <p className="text-[#4a5568] text-[10px] tracking-wider">{'// MONTHLY BUDGET'}</p>
              <div className="flex flex-wrap gap-1.5">
                {BUDGET_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleBudget(preset.label)}
                    className={`text-[10px] tracking-wider px-2 py-1 border transition-all ${
                      budget === preset.label
                        ? 'border-[#ffd700] text-[#ffd700] bg-[#ffd700]/10 shadow-[0_0_6px_rgba(255,215,0,0.3)]'
                        : 'border-[#1e2330] text-[#718096] hover:border-[#ffd700]/50 hover:text-[#e2e8f0]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-1.5">
              <p className="text-[#4a5568] text-[10px] tracking-wider">{'// SORT BY'}</p>
              <div className="flex flex-wrap gap-1.5">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSort(opt.value)}
                    className={`text-[10px] tracking-wider px-2 py-1 border transition-all ${
                      sort === opt.value
                        ? 'border-[#ff6b9d] text-[#ff6b9d] bg-[#ff6b9d]/10 shadow-[0_0_6px_rgba(255,107,157,0.3)]'
                        : 'border-[#1e2330] text-[#718096] hover:border-[#ff6b9d]/50 hover:text-[#e2e8f0]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result status line */}
          <p className="text-[#4a5568] text-[11px] tracking-wide font-mono border-t border-[#1e2330] pt-3">
            {'> '}
            <span className="text-[#00ffb3]">{totalCount}</span>
            {` cities found`}
            {activeFilterLabels.length > 0 && (
              <span className="text-[#718096]">
                {' | filters: '}
                <span className="text-[#e2e8f0]">{activeFilterLabels.join(', ')}</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
