import { createFileRoute } from "@tanstack/react-router";
import { Download, Search, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { formatTHB, provinces, scoreColor, zones } from "@/lib/mock-data";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Top Emerging Areas — Geo-Smart Location Analysis" },
      {
        name: "description",
        content:
          "Ranking of sub-districts by emerging economic potential score, with sortable table, search and report export.",
      },
      { property: "og:title", content: "Ranking & Report — Geo-Smart" },
      {
        property: "og:description",
        content: "Compare the highest-potential emerging economic zones and export a summary report.",
      },
    ],
  }),
  component: RankingPage,
});

type SortKey = "score" | "urbanGrowthPct" | "pricePerSqWah";

function RankingPage() {
  const { t, pick } = useI18n();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [province, setProvince] = useState("all");
  const [district, setDistrict] = useState("all");

  const districts = useMemo(
    () =>
      province === "all"
        ? []
        : Array.from(
            new Map(
              zones.filter((z) => z.province.en === province).map((z) => [z.district.en, z.district]),
            ).values(),
          ).sort((a, b) => a.en.localeCompare(b.en)),
    [province],
  );

  const allRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return zones
      .filter(
        (z) =>
          (province === "all" || z.province.en === province) &&
          (district === "all" || z.district.en === district) &&
          (!q ||
          z.name.th.toLowerCase().includes(q) ||
          z.name.en.toLowerCase().includes(q) ||
          z.province.th.toLowerCase().includes(q) ||
            z.province.en.toLowerCase().includes(q)),
      )
      .slice()
      .sort((a, b) => b[sortKey] - a[sortKey]);
  }, [query, sortKey, province, district]);

  const rows = allRows.slice(0, 200);

  const top10 = allRows
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((z) => ({ name: pick(z.name), score: z.score }));

  return (
    <AppShell title={t("rank.title")} subtitle={t("rank.subtitle")}>
      <div className="space-y-4 p-4 sm:p-6">
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("rank.top10")}
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10} margin={{ left: -18, right: 8, bottom: 40 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {top10.map((d) => (
                    <Cell key={d.name} fill={scoreColor(d.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-4 sm:flex sm:justify-between">
            <div className="relative min-w-0 sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("rank.search")}
                className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm"
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="rounded-md border border-input bg-background px-2 py-2 text-xs"
              >
                <option value="score">{t("rank.col.score")}</option>
                <option value="urbanGrowthPct">{t("rank.col.growth")}</option>
                <option value="pricePerSqWah">{t("rank.col.price")}</option>
              </select>
              <button
                onClick={() => toast.success(t("rank.exported"))}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="size-3.5" />
                <span className="hidden sm:inline">{t("action.download")}</span>
              </button>
            </div>
          </div>

          {rows.length === 0 ? (
            <p className="p-10 text-center text-sm text-muted-foreground">{t("rank.empty")}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3">{t("rank.col.rank")}</th>
                    <th className="px-4 py-3">{t("rank.col.area")}</th>
                    <th className="px-4 py-3">{t("rank.col.province")}</th>
                    <th className="px-4 py-3">{t("rank.col.score")}</th>
                    <th className="px-4 py-3">{t("rank.col.growth")}</th>
                    <th className="px-4 py-3">{t("rank.col.price")}</th>
                    <th className="px-4 py-3">{t("rank.col.trend")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((z, i) => {
                    const first = z.priceHistory[0]?.price ?? 1;
                    const last = z.priceHistory[z.priceHistory.length - 1]?.price ?? 1;
                    const trend = Math.round(((last - first) / first) * 100);
                    return (
                      <tr key={z.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                        <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{pick(z.name)}</td>
                        <td className="px-4 py-3 text-muted-foreground">{pick(z.province)}</td>
                        <td className="px-4 py-3">
                          <span
                            className="rounded-full px-2 py-0.5 text-xs font-bold text-background"
                            style={{ backgroundColor: scoreColor(z.score) }}
                          >
                            {z.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{z.urbanGrowthPct}%</td>
                        <td className="px-4 py-3 text-muted-foreground">฿{formatTHB(z.pricePerSqWah)}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                            <TrendingUp className="size-3.5" />+{trend}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}