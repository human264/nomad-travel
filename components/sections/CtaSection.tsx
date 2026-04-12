'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CTA_TERMINAL_LINES, CTA_BENEFITS } from '@/lib/data';

export default function CtaSection() {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState('');

  useEffect(() => {
    if (lineIndex >= CTA_TERMINAL_LINES.length) return;

    const line = CTA_TERMINAL_LINES[lineIndex];

    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setCurrentLine((prev) => prev + line[charIndex]);
        setCharIndex((c) => c + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLine]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex((l) => l + 1);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex, currentLine]);

  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      {/* Section Header */}
      <div className="mb-8">
        <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap">
          {'╔══╡ '}
          <span className="text-[#e2e8f0] tracking-widest">JOIN THE NOMAD NETWORK</span>
          {' ╞' + '═'.repeat(70) + '╗'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Terminal animation */}
        <div className="border border-[#1e2330] bg-[#0d1117]">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1e2330] bg-[#111218]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 text-[#4a5568] text-[10px] tracking-widest">start-adventure.sh</span>
          </div>

          <div className="p-6 space-y-2 min-h-[280px]">
            {/* Decorative header */}
            <div className="text-[#718096] text-xs mb-4 space-y-1">
              <p className="text-[#e2e8f0] text-sm tracking-widest">
                ✈ ──────────────────────────▶
              </p>
              <p className="text-[#718096] text-[11px] tracking-[0.2em] mt-2">
                YOUR JOURNEY STARTS WITH
              </p>
              <p className="text-[#00ffb3] glow-green text-[11px] tracking-[0.2em]">
                A SINGLE COMMAND
              </p>
            </div>

            <div className="border-t border-[#1e2330] pt-4 space-y-1">
              <p className="text-[#4a5568] text-[10px]">root@nomad:~$ ./start-adventure</p>

              {/* Completed lines */}
              {completedLines.map((line, i) => (
                <p key={i} className="text-[#718096] text-[10px] tracking-wide">
                  {line}
                </p>
              ))}

              {/* Currently typing line */}
              {lineIndex < CTA_TERMINAL_LINES.length && (
                <p className="text-[#00ffb3] text-[10px] tracking-wide">
                  {currentLine}
                  <span className="cursor-blink" />
                </p>
              )}

              {/* Done */}
              {lineIndex >= CTA_TERMINAL_LINES.length && (
                <p className="text-[#00ffb3] text-[10px] tracking-wide">
                  root@nomad:~$ <span className="cursor-blink" />
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Benefits + CTA */}
        <div className="border border-[#1e2330] bg-[#0d1117] p-6 flex flex-col">
          <div className="mb-6">
            <p className="text-[10px] tracking-[0.2em] text-[#718096] mb-1">JOIN</p>
            <h2 className="text-xl font-bold tracking-wider text-[#00ffb3] glow-green">
              128,000+
            </h2>
            <p className="text-[11px] tracking-[0.2em] text-[#e2e8f0] uppercase">
              Digital Nomads
            </p>
          </div>

          {/* Benefits list */}
          <div className="border-t border-[#1e2330] pt-4 space-y-3 flex-1">
            {CTA_BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#00ffb3] text-[10px] mt-0.5">[✓]</span>
                <span className="text-[#718096] text-[11px] tracking-wide">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="mt-6 pt-4 border-t border-[#1e2330]">
            <Button
              className="w-full text-xs tracking-widest border-2 border-[#00ffb3] text-[#00ffb3] bg-transparent hover:bg-[#00ffb3]/10 hover:shadow-[0_0_16px_rgba(0,255,179,0.4)] rounded-none h-10 transition-all font-bold"
            >
              [ CREATE FREE ACCOUNT → ]
            </Button>
            <p className="text-[#4a5568] text-[9px] text-center mt-2 tracking-wider">
              NO CREDIT CARD REQUIRED · FREE FOREVER
            </p>
          </div>
        </div>
      </div>

      <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap mt-0">
        {'╚' + '═'.repeat(96) + '╝'}
      </div>
    </section>
  );
}
