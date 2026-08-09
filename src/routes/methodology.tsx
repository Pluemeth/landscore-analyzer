import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Cpu, Database, Gauge, Layers } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology — Geo-Smart Location Analysis" },
      {
        name: "description",
        content:
          "How land-use change detection, spatial variable fusion and an urban growth model produce the potential score.",
      },
      { property: "og:title", content: "Methodology — Geo-Smart" },
      {
        property: "og:description",
        content: "The Input to Process to Output pipeline behind the emerging economic zone score.",
      },
    ],
  }),
  component: MethodologyPage,
});

function MethodologyPage() {
  const { t } = useI18n();
  const steps = [
    { icon: Database, title: "method.s1", desc: "method.s1.d" },
    { icon: Layers, title: "method.s2", desc: "method.s2.d" },
    { icon: Cpu, title: "method.s3", desc: "method.s3.d" },
    { icon: Gauge, title: "method.s4", desc: "method.s4.d" },
  ] as const;

  const weights = [
    { key: "panel.factor.urban", w: 30 },
    { key: "panel.factor.road", w: 22 },
    { key: "panel.factor.pop", w: 20 },
    { key: "panel.factor.price", w: 18 },
    { key: "panel.factor.poi", w: 10 },
  ] as const;

  return (
    <AppShell title={t("method.title")} subtitle={t("method.subtitle")}>
      <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
        {steps.map((s, i) => (
          <div key={s.title}>
            <section className="rounded-lg border border-border bg-card p-5">
              <div className="flex min-w-0 items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-sm font-semibold text-foreground">{t(s.title)}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(s.desc)}</p>
                </div>
              </div>
            </section>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="size-4 text-border" />
              </div>
            )}
          </div>
        ))}

        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("method.weights")}
          </h2>
          <ul className="mt-4 space-y-3">
            {weights.map((w) => (
              <li key={w.key}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-foreground">{t(w.key)}</span>
                  <span className="font-semibold text-muted-foreground">{w.w}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${w.w * 3}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}