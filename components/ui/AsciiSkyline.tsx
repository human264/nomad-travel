interface Props {
  lines: string[];
  color: string;
}

export default function AsciiSkyline({ lines, color }: Props) {
  return (
    <pre
      className="text-[10px] leading-[1.4] overflow-hidden select-none"
      style={{ color, fontFamily: 'monospace' }}
      aria-hidden="true"
    >
      {lines.join('\n')}
    </pre>
  );
}
