import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/AppShell";
import { ZoneMap, type Layers } from "@/components/ZoneMap";
import { useI18n } from "@/lib/i18n";
import { formatTHB, provinces, scoreColor, zones } from "@/lib/mock-data";
import { useWatchlist } from "@/lib/watchlist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Map Dashboard — Geo-Smart Location Analysis" },
      {
        name: "description",
        content:
          "Interactive probability heatmap of emerging economic zones with land use, road, population and price layers.",
      },
      { property: "og:title", content: "Map Dashboard — Geo-Smart" },
      {
        property: "og:description",
        content: "Explore potential scores for sub-districts across the Bangkok Metropolitan Region.",
      },
    ],
  }),
  component: DashboardPage,
});

const layerKeys = ["landuse", "roads", "population", "price", "centers"] as const;

function DashboardPage() {
  const { t, pick } = useI18n();
  const watchlist = useWatchlist();
  const [layers, setLayers] = useState<Layers>({
    landuse: false,
    roads: true,
    population: false,
    price: false,
    centers: true,
  });
  const [province, setProvince] = useState("all");
  const [district, setDistrict] = useState("all");
  const [minScore, setMinScore] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const districts = useMemo(
    () =>
      province === "all"
        ? []
        : Array.from(
        new Map(
          zones
            .filter((z) => z.province.en === province)
            .map((z) => [z.district.en, z.district]),
        ).values(),
          ).sort((a, b) => a.en.localeCompare(b.en)),
    [province],
  );

  const filtered = useMemo(
    () =>
      zones.filter(
        (z) =>
          (province === "all" || z.province.en === province) &&
          (district === "all" || z.district.en === district) &&
          z.score >= minScore &&
          z.pricePerSqWah <= maxPrice,
      ),
    [province, district, minScore, maxPrice],
  );

  const selected = filtered.find((z) => z.id === selectedId) ?? filtered[0] ?? null;

  const breakdown = selected
    ? [
        { key: t("panel.factor.urban"), value: selected.factors.urban },
        { key: t("panel.factor.road"), value: selected.factors.road },
        { key: t("panel.factor.pop"), value: selected.factors.population },
        { key: t("panel.factor.price"), value: selected.factors.price },
        { key: t("panel.factor.poi"), value: selected.factors.poi },
      ]
    : [];

  return (
    <AppShell title={t("map.title")} subtitle={t("map.subtitle")}>
      <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("map.layers")}
            </h2>
            <ul className="mt-3 space-y-2">
              {layerKeys.map((key) => (
                <li key={key}>
                  <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-foreground">
                    <span className="min-w-0 truncate">{t(`map.layer.${key}` as const)}</span>
                    <input
                      type="checkbox"
                      checked={layers[key]}
                      onChange={(e) => setLayers({ ...layers, [key]: e.target.checked })}
                      className="size-4 shrink-0 accent-[var(--color-primary)]"
                    />
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("map.filters")}
            </h2>
            <div className="mt-3 space-y-4 text-sm">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">{t("map.filter.province")}</label>
                <select
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                    setDistrict("all");
                  }}
                  className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm"
                >
                  <option value="all">{t("map.filter.all")}</option>
                  {provinces.map((p) => (
                    <option key={p.en} value={p.en}>
                      {pick(p)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">{t("map.filter.district")}</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm"
                >
                  <option value="all">{t("map.filter.all")}</option>
                  {districts.map((d) => (
                    <option key={d.en} value={d.en}>
                      {pick(d)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>{t("map.filter.score")}</span>
                  <span className="font-semibold text-foreground">{minScore}+</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={95}
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>{t("map.filter.price")}</span>
                  <span className="font-semibold text-foreground">≤ {formatTHB(maxPrice)}</span>
                </label>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <button
                onClick={() => {
                  setProvince("all");
                  setDistrict("all");
                  setMinScore(0);
                  setMaxPrice(200000);
                }}
                className="w-full rounded-md border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {t("action.reset")}
              </button>
              <p className="text-xs text-muted-foreground">
                {t("map.matched")}: <span className="font-semibold text-foreground">{filtered.length}</span>
              </p>
            </div>
          </section>
        </aside>

        <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0">
            <div className="h-[26rem] sm:h-[34rem]">
              {filtered.length === 0 ? (
                <div className="grid h-full place-items-center rounded-lg border border-dashed border-border bg-card text-center">
                  <div className="px-6">
                    <p className="text-sm font-medium text-foreground">{t("rank.empty")}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t("action.reset")}</p>
                  </div>
                </div>
              ) : (
                <ZoneMap
                  zones={filtered}
                  layers={layers}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{t("map.hint")}</p>
          </div>

          <aside className="min-w-0">
            {!selected ? (
              <div className="grid h-full min-h-[18rem] place-items-center rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
                {t("map.hint")}
              </div>
            ) : (
              <div className="space-y-4 rounded-lg border border-border bg-card p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold text-foreground">
                      {pick(selected.name)}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {pick(selected.district)} · {pick(selected.province)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground"
                    aria-label={t("panel.close")}
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="rounded-md border border-border p-4 text-center">
                  <p className="text-xs text-muted-foreground">{t("panel.score")}</p>
                  <p
                    className="font-display text-5xl font-bold"
                    style={{ color: scoreColor(selected.score) }}
                  >
                    {selected.score}
                  </p>
                  <p className="text-xs text-muted-foreground">/ 100 {t("common.points")}</p>
                  <button
                    onClick={() => watchlist.toggle(selected.id)}
                    className={cn(
                      "mt-3 inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors",
                      watchlist.has(selected.id)
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {watchlist.has(selected.id) ? (
                      <BookmarkCheck className="size-3.5" />
                    ) : (
                      <Bookmark className="size-3.5" />
                    )}
                    {watchlist.has(selected.id) ? t("action.bookmarked") : t("action.bookmark")}
                  </button>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("panel.breakdown")}
                  </p>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={breakdown} layout="vertical" margin={{ left: 4, right: 8 }}>
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis
                          type="category"
                          dataKey="key"
                          width={110}
                          tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "var(--color-popover)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                        />
                        <Bar dataKey="value" fill="var(--color-chart-1)" radius={[0, 4, 4, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("panel.priceTrend")}
                  </p>
                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selected.priceHistory} margin={{ left: -18, right: 8, top: 4 }}>
                        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                        <Tooltip
                          contentStyle={{
                            background: "var(--color-popover)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="var(--color-chart-2)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("panel.landuse")}
                  </p>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selected.landUse} margin={{ left: -18, right: 8, top: 4 }} stackOffset="expand">
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{
                            background: "var(--color-popover)",
                            border: "1px solid var(--color-border)",
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Area
                          type="monotone"
                          stackId="1"
                          dataKey="built"
                          name={t("panel.landuse.built")}
                          stroke="var(--color-chart-4)"
                          fill="var(--color-chart-4)"
                        />
                        <Area
                          type="monotone"
                          stackId="1"
                          dataKey="agriculture"
                          name={t("panel.landuse.agri")}
                          stroke="var(--color-chart-2)"
                          fill="var(--color-chart-2)"
                        />
                        <Area
                          type="monotone"
                          stackId="1"
                          dataKey="vacant"
                          name={t("panel.landuse.vacant")}
                          stroke="var(--color-chart-3)"
                          fill="var(--color-chart-3)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </AppShell>
  );
}