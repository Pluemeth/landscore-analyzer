import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, Building2, LineChart, Ruler, Users } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { getZone } from "@/lib/mock-data";
import { useWatchlist } from "@/lib/watchlist";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Contact — Geo-Smart Location Analysis" },
      {
        name: "description",
        content:
          "About the Geo-Smart decision-support prototype and how planning agencies and investors can get in touch.",
      },
      { property: "og:title", content: "About & Contact — Geo-Smart" },
      {
        property: "og:description",
        content: "Who Geo-Smart is built for, and how to contact the team.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, pick } = useI18n();
  const { ids } = useWatchlist();
  const audience = [
    { icon: Building2, key: "about.aud1" },
    { icon: LineChart, key: "about.aud2" },
    { icon: Ruler, key: "about.aud3" },
    { icon: Users, key: "about.aud4" },
  ] as const;

  return (
    <AppShell title={t("about.title")}>
      <div className="mx-auto grid max-w-5xl gap-4 p-4 sm:p-6 lg:grid-cols-2">
        <section className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{t("about.body")}</p>
            <h2 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("about.audience")}
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {audience.map((a) => (
                <li
                  key={a.key}
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                >
                  <a.icon className="size-4 shrink-0 text-primary" />
                  <span className="truncate">{t(a.key)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Bookmark className="size-3.5" /> {t("watchlist.title")}
            </h2>
            {ids.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">{t("watchlist.empty")}</p>
            ) : (
              <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                {ids.map((id) => {
                  const z = getZone(id);
                  return z ? (
                    <li key={id} className="rounded-md border border-border px-3 py-2">
                      {pick(z.name)} · {z.score}
                    </li>
                  ) : null;
                })}
              </ul>
            )}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="font-display text-sm font-semibold text-foreground">
            {t("contact.title")}
          </h2>
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(t("contact.sent"));
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            {(
              [
                { name: "name", label: "contact.name", type: "text" },
                { name: "org", label: "contact.org", type: "text" },
                { name: "email", label: "contact.email", type: "email" },
              ] as const
            ).map((f) => (
              <div key={f.name}>
                <label className="mb-1 block text-xs text-muted-foreground">{t(f.label)}</label>
                <input
                  required
                  type={f.type}
                  name={f.name}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                {t("contact.message")}
              </label>
              <textarea
                required
                rows={5}
                name="message"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("contact.send")}
            </button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
