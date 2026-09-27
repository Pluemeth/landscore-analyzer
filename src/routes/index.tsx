import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Cpu, Database, Gauge, Satellite } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { listings, zones } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Geo-Smart Location Analysis — Emerging Economic Zones" },
      {
        name: "description",
        content:
          "Predict Thailand's emerging economic zones with THEOS-2 satellite imagery, land-use change, road networks and land price trends.",
      },
      { property: "og:title", content: "Geo-Smart Location Analysis" },
      {
        property: "og:description",
        content:
          "Satellite-driven potential scoring for emerging economic zones in the Bangkok Metropolitan Region.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();

  const steps = [
    { icon: Database, title: "home.step.input", desc: "home.step.input.desc" },
    { icon: Cpu, title: "home.step.process", desc: "home.step.process.desc" },
    { icon: Gauge, title: "home.step.output", desc: "home.step.output.desc" },
  ] as const;

  const stats = [
    { value: zones.length, label: "home.stats.zones" },
    { value: listings.length, label: "home.stats.listings" },
    { value: 5, label: "home.stats.layers" },
    { value: 7, label: "home.stats.years" },
  ] as const;

  return (
    <AppShell>
      <section className="grid-backdrop border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Satellite className="size-3.5 text-primary" />
            {t("home.badge")}
          </span>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            {t("home.hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("home.hero.sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("action.explore")}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/methodology"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {t("action.method")}
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card px-5 py-4">
                <dt className="text-xs text-muted-foreground">{t(s.label)}</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-xl font-semibold text-foreground">{t("home.pipeline")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative rounded-lg border border-border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </span>
              <p className="mt-4 font-display text-sm font-semibold text-foreground">
                {t(step.title)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.desc)}</p>
              <span className="absolute right-5 top-5 font-display text-3xl font-bold text-border">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
