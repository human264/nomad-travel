'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  score: number;
  color: string;
}

export default function NomadScoreGauge({ score, color }: Props) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(score), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score]);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[#718096] text-[10px] tracking-widest">NOMAD SCORE</span>
        <span className="text-xs font-bold" style={{ color }}>
          {score}/100
        </span>
      </div>
      <div className="gauge-track">
        <div
          className="gauge-fill"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
