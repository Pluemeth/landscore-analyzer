import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, Mail, MapPin, Phone, Plug, Satellite } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { ZoneMap } from "@/components/ZoneMap";
import { useI18n } from "@/lib/i18n";
import { formatTHB, getListing, getZone, scoreColor } from "@/lib/mock-data";

export const Route = createFileRoute("/listings/$id")({
  head: () => ({
    meta: [
      { title: "Parcel detail — Geo-Smart Location Analysis" },
      {
        name: "description",
        content:
          "Parcel detail with location map, satellite view, surrounding POI, utilities and owner contact information.",
      },
      { property: "og:title", content: "Parcel detail — Geo-Smart" },
      {
        property: "og:description",
        content: "Location, satellite context and surroundings for a land parcel in an emerging zone.",
      },
    ],
  }),
  component: ListingDetail,
});

function ListingDetail() {
  const { id } = Route.useParams();
  const { t, pick } = useI18n();
  const listing = getListing(id);
  const zone = listing ? getZone(listing.zoneId) : undefined;

  if (!listing || !zone) {
    return (
      <AppShell title={t("listing.title")}>
        <div className="grid min-h-[24rem] place-items-center p-6 text-center">
          <div>
            <p className="text-sm text-muted-foreground">{t("listing.notFound")}</p>
            <Link to="/listings" className="mt-4 inline-block text-sm font-semibold text-primary">
              {t("action.back")}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={pick(listing.title)} subtitle={`${pick(zone.district)} · ${pick(zone.province)}`}>
      <div className="space-y-4 p-4 sm:p-6">
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> {t("action.back")}
        </Link>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0 space-y-4">
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="relative h-52" style={{ backgroundImage: listing.image }}>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground">
                  <Satellite className="size-3.5 text-primary" /> {t("listing.satellite")} · THEOS-2
                </span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                {[
                  { label: t("listing.size"), value: `${listing.sizeRai} ${t("common.rai")}` },
                  {
                    label: t("listing.price"),
                    value: `฿${formatTHB(listing.priceTHB)}`,
                  },
                  { label: t("listing.roadDist"), value: `${listing.roadDistanceKm} ${t("common.km")}` },
                  { label: t("listing.zoneScore"), value: String(zone.score) },
                ].map((s) => (
                  <div key={s.label} className="bg-card px-4 py-3">
                    <p className="truncate text-[0.68rem] text-muted-foreground">{s.label}</p>
                    <p className="mt-0.5 font-display text-sm font-bold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <section className="rounded-lg border border-border bg-card p-4">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("listing.location")}
              </h2>
              <div className="h-72">
                <ZoneMap
                  zones={[zone]}
                  layers={{ landuse: false, roads: true, population: false, price: false, centers: true }}
                  selectedId={zone.id}
                  onSelect={() => {}}
                />
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">{t("listing.zoneScore")}</p>
              <p className="font-display text-4xl font-bold" style={{ color: scoreColor(zone.score) }}>
                {zone.score}
              </p>
              <Link
                to="/dashboard"
                className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
              >
                {pick(zone.name)} →
              </Link>
            </section>

            <section className="rounded-lg border border-border bg-card p-4">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("listing.contact")}
              </h2>
              <p className="text-sm font-medium text-foreground">{pick(listing.owner.name)}</p>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                <li className="inline-flex items-center gap-2">
                  <Phone className="size-3.5" /> {listing.owner.phone}
                </li>
                <li className="flex items-center gap-2 break-all">
                  <Mail className="size-3.5 shrink-0" /> {listing.owner.email}
                </li>
                <li className="inline-flex items-center gap-2">
                  <CalendarClock className="size-3.5" /> {t("listing.updated")}: {listing.updatedAt}
                </li>
              </ul>
            </section>

            <section className="rounded-lg border border-border bg-card p-4">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("listing.surroundings")}
              </h2>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {listing.poi.map((p) => (
                  <li key={p.en} className="inline-flex items-center gap-2">
                    <MapPin className="size-3.5 text-primary" /> {pick(p)}
                  </li>
                ))}
              </ul>
              <h2 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("listing.utilities")}
              </h2>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {listing.utilities.map((u) => (
                  <li key={u.en} className="inline-flex items-center gap-2">
                    <Plug className="size-3.5 text-accent" /> {pick(u)}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}