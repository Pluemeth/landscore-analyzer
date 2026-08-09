import { createFileRoute } from "@tanstack/react-router";
import { Database, Map, Route as RouteIcon, Satellite, TrendingUp, Users } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/data-sources")({
  head: () => ({
    meta: [
      { title: "Data Sources — Geo-Smart Location Analysis" },
      {
        name: "description",
        content:
          "THEOS-2 imagery, LandX land use, Sphere boundaries and POI, road networks, population and appraisal prices.",
      },
      { property: "og:title", content: "Data Sources — Geo-Smart" },
      {
        property: "og:description",
        content: "The satellite and geospatial datasets powering the emerging economic zone model.",
      },
    ],
  }),
  component: DataSourcesPage,
});

function DataSourcesPage() {
  const { t } = useI18n();
  const sources = [
    { icon: Satellite, title: "src.theos", desc: "src.theos.d", records: "1,248", updated: "2025-11-02" },
    { icon: Database, title: "src.landx", desc: "src.landx.d", records: "4,610", updated: "2025-09-18" },
    { icon: Map, title: "src.sphere", desc: "src.sphere.d", records: "12,904", updated: "2025-12-01" },
    { icon: RouteIcon, title: "src.roads", desc: "src.roads.d", records: "8,375", updated: "2025-10-22" },
    { icon: Users, title: "src.pop", desc: "src.pop.d", records: "2,196", updated: "2025-08-30" },
    { icon: TrendingUp, title: "src.price", desc: "src.price.d", records: "6,540", updated: "2026-01-12" },
  ] as const;

  return (
    <AppShell title={t("src.title")} subtitle={t("src.subtitle")}>
      <div className="grid gap-4 p-4 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
        {sources.map((s) => (
          <article key={s.title} className="rounded-lg border border-border bg-card p-5">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <s.icon className="size-4" />
              </span>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground">{t(s.title)}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(s.desc)}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3 text-xs">
              <div>
                <dt className="text-muted-foreground">{t("src.records")}</dt>
                <dd className="font-semibold text-foreground">{s.records}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("src.updated")}</dt>
                <dd className="font-semibold text-foreground">{s.updated}</dd>
              </div>
            </dl>
            <span className="mt-3 inline-block rounded-full border border-border px-2.5 py-1 text-[0.68rem] text-muted-foreground">
              {t("src.status.mock")} · {t("src.status.planned")}
            </span>
          </article>
        ))}
      </div>
    </AppShell>
  );
}