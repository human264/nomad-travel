import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CITIES } from '@/lib/data';

export default function CostOfLivingTable() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      {/* Section Header */}
      <div className="mb-6">
        <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap">
          {'╔══╡ '}
          <span className="text-[#e2e8f0] tracking-widest">
            COST OF LIVING INDEX — MONTHLY ESTIMATE (USD)
          </span>
          {' ╞' + '═'.repeat(50) + '╗'}
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#1e2330] bg-[#0d1117] overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1e2330] hover:bg-transparent">
              <TableHead className="text-[#00d4ff] text-[10px] tracking-widest font-bold h-9 pl-4">
                CITY
              </TableHead>
              <TableHead className="text-[#00d4ff] text-[10px] tracking-widest font-bold h-9">
                RENT/MO
              </TableHead>
              <TableHead className="text-[#00d4ff] text-[10px] tracking-widest font-bold h-9">
                FOOD/MO
              </TableHead>
              <TableHead className="text-[#00d4ff] text-[10px] tracking-widest font-bold h-9">
                TRANSPORT
              </TableHead>
              <TableHead className="text-[#00d4ff] text-[10px] tracking-widest font-bold h-9">
                TOTAL EST.
              </TableHead>
              <TableHead className="text-[#00d4ff] text-[10px] tracking-widest font-bold h-9 pr-4 min-w-[180px]">
                NOMAD SCORE
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CITIES.map((city) => (
              <TableRow
                key={city.id}
                className="border-b border-[#1e2330]/50 hover:bg-[#111218]/50 transition-colors"
              >
                {/* City name */}
                <TableCell className="h-10 pl-4">
                  <div className="flex items-center gap-2">
                    <span style={{ color: city.colorTheme }}>●</span>
                    <span className="text-[#e2e8f0] text-[11px] tracking-wider font-medium">
                      {city.flag} {city.name}
                    </span>
                  </div>
                </TableCell>

                {/* Rent */}
                <TableCell className="text-[#718096] text-[11px] h-10">
                  <span className="text-[#e2e8f0]">${city.costIndex.rent.toLocaleString()}</span>
                </TableCell>

                {/* Food */}
                <TableCell className="text-[11px] h-10">
                  <span className="text-[#e2e8f0]">${city.costIndex.food.toLocaleString()}</span>
                </TableCell>

                {/* Transport */}
                <TableCell className="text-[11px] h-10">
                  <span className="text-[#e2e8f0]">${city.costIndex.transport.toLocaleString()}</span>
                </TableCell>

                {/* Total */}
                <TableCell className="text-[11px] font-bold h-10" style={{ color: city.colorTheme }}>
                  ${city.costIndex.total.toLocaleString()}
                </TableCell>

                {/* Score */}
                <TableCell className="h-10 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="gauge-track flex-1 max-w-[100px]">
                      <div
                        className="gauge-fill"
                        style={{
                          width: `${city.costIndex.nomadScore}%`,
                          backgroundColor: city.colorTheme,
                        }}
                      />
                    </div>
                    <span
                      className="text-[11px] font-bold whitespace-nowrap"
                      style={{ color: city.colorTheme }}
                    >
                      {city.costIndex.nomadScore}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer note */}
        <div className="px-4 py-3 border-t border-[#1e2330]">
          <p className="text-[#4a5568] text-[10px] tracking-wide">
            * Estimates based on single traveler. Data updated April 2026. Prices in USD.
          </p>
        </div>
      </div>

      <div className="text-[#1e2330] text-xs overflow-hidden whitespace-nowrap mt-0">
        {'╚' + '═'.repeat(96) + '╝'}
      </div>
    </section>
  );
}
