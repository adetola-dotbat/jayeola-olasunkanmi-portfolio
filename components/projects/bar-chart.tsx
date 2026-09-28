import type { ProjectChart } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";

/**
 * Horizontal bar chart rendered as a real <table>, so screen readers get
 * the underlying numbers while sighted users see proportional bars.
 */
export function BarChart({ chart, className }: { chart: ProjectChart; className?: string }) {
  const max = Math.max(...chart.data.map((d) => d.value));
  const decimals = chart.decimals ?? 0;

  return (
    <figure className={cn("rounded-lg border border-line bg-surface p-5 sm:p-6", className)}>
      <table className="w-full border-separate border-spacing-y-2 text-sm">
        <caption className="mb-3 text-left">
          <span className="block font-semibold text-ink">{chart.title}</span>
          <span className="mt-0.5 block text-xs text-muted">Values in {chart.unit}</span>
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Value ({chart.unit})</th>
          </tr>
        </thead>
        <tbody>
          {chart.data.map((d) => {
            const isMax = d.value === max;
            const pct = Math.max((d.value / max) * 100, 1.5);
            return (
              <tr key={d.label}>
                <th scope="row" className="w-[34%] pr-3 text-left align-middle text-xs font-normal text-ink-soft sm:w-[30%] sm:text-sm">
                  {d.label}
                </th>
                <td className="align-middle">
                  <div className="flex items-center gap-3">
                    <div className="h-6 flex-1 rounded-sm bg-sunken">
                      <div
                        className={cn("bar-grow h-full rounded-sm", isMax ? "bg-accent" : "bg-brand/80")}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={cn("num w-[4.75rem] shrink-0 text-right font-mono text-xs", isMax ? "font-semibold text-ink" : "text-muted")}>
                      {formatNumber(d.value, decimals)}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <figcaption className="mt-3 border-t border-line pt-3 text-xs text-muted">Source: {chart.source}</figcaption>
    </figure>
  );
}
