import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Mail, MapPin, Phone, Ruler } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { formatTHB, getZone, listings, scoreColor } from "@/lib/mock-data";

export const Route = createFileRoute("/listings/")({
  head: () => ({
    meta: [
      { title: "Land for Sale & Lease — Geo-Smart Location Analysis" },
      {
        name: "description",
        content:
          "Browse land parcels inside high-potential emerging economic zones, with size, price, zone score and owner contacts.",
      },
      { property: "og:title", content: "Land Listings — Geo-Smart" },
      {
        property: "og:description",
        content: "Parcels for sale and lease inside high-potential zones, ranked by zone score.",
      },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  const { t, pick } = useI18n();
  const [budget, setBudget] = useState(400);
  const [minSize, setMinSize] = useState(0);
  const [maxRoad, setMaxRoad] = useState(8);
  const [status, setStatus] = useState<"all" | "sale" | "rent">("all");

  const results = useMemo(
    () =>
      listings.filter((l) => {
        const budgetOk = l.status === "sale" ? l.priceTHB <= budget * 1_000_000 : true;
        return (
          budgetOk &&
          l.sizeRai >= minSize &&
          l.roadDistanceKm <= maxRoad &&
          (status === "all" || l.status === status)
        );
      }),
    [budget, minSize, maxRoad, status],
  );

  return (
    <AppShell title={t("listing.title")} subtitle={t("listing.subtitle")}>
      <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="space-y-4 rounded-lg border border-border bg-card p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("map.filters")}
          </h2>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">{t("listing.status")}</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "all" | "sale" | "rent")}
              className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm"
            >
              <option value="all">{t("map.filter.all")}</option>
              <option value="sale">{t("listing.status.sale")}</option>
              <option value="rent">{t("listing.status.rent")}</option>
            </select>
          </div>
          <div>
            <label className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>{t("listing.budget")}</span>
              <span className="font-semibold text-foreground">{budget}</span>
            </label>
            <input
              type="range"
              min={10}
              max={400}
              step={10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>{t("listing.size")}</span>
              <span className="font-semibold text-foreground">{minSize}</span>
            </label>
            <input
              type="range"
              min={0}
              max={25}
              value={minSize}
              onChange={(e) => setMinSize(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>{t("listing.roadDist")}</span>
              <span className="font-semibold text-foreground">{maxRoad}</span>
            </label>
            <input
              type="range"
              min={0.5}
              max={10}
              step={0.5}
              value={maxRoad}
              onChange={(e) => setMaxRoad(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>
          <button
            onClick={() => {
              setBudget(400);
              setMinSize(0);
              setMaxRoad(8);
              setStatus("all");
            }}
            className="w-full rounded-md border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {t("action.reset")}
          </button>
        </aside>

        {results.length === 0 ? (
          <div className="grid min-h-[20rem] place-items-center rounded-lg border border-dashed border-border bg-card p-8 text-center">
            <div>
              <MapPin className="mx-auto size-8 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">{t("listing.empty")}</p>
            </div>
          </div>
        ) : (
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {results.map((l) => {
              const zone = getZone(l.zoneId);
              return (
                <article
                  key={l.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="relative h-32" style={{ backgroundImage: l.image }}>
                    <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[0.68rem] font-semibold text-foreground">
                      {l.status === "sale" ? t("listing.status.sale") : t("listing.status.rent")}
                    </span>
                    {zone && (
                      <span
                        className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-bold text-background"
                        style={{ backgroundColor: scoreColor(zone.score) }}
                      >
                        {t("listing.zoneScore")} {zone.score}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-foreground">{pick(l.title)}</h2>
                      <p className="truncate text-xs text-muted-foreground">
                        {zone ? `${pick(zone.district)} · ${pick(zone.province)}` : l.zoneId}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Ruler className="size-3.5" /> {l.sizeRai} {t("common.rai")}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" /> {l.roadDistanceKm} {t("common.km")}
                      </span>
                    </div>
                    <p className="font-display text-lg font-bold text-foreground">
                      ฿{formatTHB(l.priceTHB)}
                      {l.status === "rent" && (
                        <span className="ml-1 text-xs font-normal text-muted-foreground">
                          {t("listing.pricePerMonth")}
                        </span>
                      )}
                    </p>
                    <div className="space-y-1 rounded-md border border-border bg-background/40 p-3 text-xs text-muted-foreground">
                      <p className="font-medium text-foreground">{pick(l.owner.name)}</p>
                      <p className="inline-flex items-center gap-1.5">
                        <Phone className="size-3" /> {l.owner.phone}
                      </p>
                      <p className="inline-flex items-center gap-1.5 break-all">
                        <Mail className="size-3" /> {l.owner.email}
                      </p>
                      <p className="inline-flex items-center gap-1.5">
                        <CalendarClock className="size-3" /> {t("listing.updated")}: {l.updatedAt}
                      </p>
                    </div>
                    <Link
                      to="/listings/$id"
                      params={{ id: l.id }}
                      className="mt-auto rounded-md bg-primary px-3 py-2 text-center text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      {t("action.viewDetail")}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}