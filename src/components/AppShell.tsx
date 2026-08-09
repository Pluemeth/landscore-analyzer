import { Link, useRouterState } from "@tanstack/react-router";
import {
  Building2,
  Database,
  Globe,
  Info,
  LayoutDashboard,
  Map as MapIcon,
  Menu,
  Moon,
  Satellite,
  Sun,
  Trophy,
  Workflow,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { useTheme } from "@/components/theme";
import { useI18n, type TKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavItem = { to: string; key: TKey; icon: typeof MapIcon; exact?: boolean };

const groups: { label: TKey; items: NavItem[] }[] = [
  {
    label: "nav.group.analysis",
    items: [
      { to: "/", key: "nav.home", icon: LayoutDashboard, exact: true },
      { to: "/dashboard", key: "nav.dashboard", icon: MapIcon },
      { to: "/listings", key: "nav.listings", icon: Building2 },
      { to: "/ranking", key: "nav.ranking", icon: Trophy },
    ],
  },
  {
    label: "nav.group.info",
    items: [
      { to: "/methodology", key: "nav.methodology", icon: Workflow },
      { to: "/data-sources", key: "nav.sources", icon: Database },
      { to: "/about", key: "nav.about", icon: Info },
    ],
  },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-6 px-3">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/45">
            {t(group.label)}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                    )}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span className="truncate">{t(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  const { t } = useI18n();
  return (
    <div className="flex min-w-0 items-center gap-3 px-6 py-5">
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-sidebar-primary/15 text-sidebar-primary">
        <Satellite className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-semibold text-sidebar-foreground">
          {t("brand.full")}
        </p>
        <p className="truncate text-xs text-sidebar-foreground/55">{t("brand.tagline")}</p>
      </div>
    </div>
  );
}

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const { t, lang, toggleLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-[17rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <Brand />
        <div className="flex-1 overflow-y-auto pb-6">
          <NavLinks />
        </div>
        <p className="border-t border-sidebar-border px-6 py-4 text-xs text-sidebar-foreground/50">
          {t("common.demo")} • v0.1
        </p>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="close"
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[17rem] flex-col bg-sidebar">
            <div className="flex items-start justify-between">
              <Brand />
              <button
                className="m-4 rounded-md p-1 text-sidebar-foreground/70"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pb-6">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-background/85 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className="rounded-md border border-border p-2 text-muted-foreground lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="menu"
            >
              <Menu className="size-4" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
                {title ?? t("brand.full")}
              </h1>
              {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={toggle}
              aria-label={t("action.theme")}
              className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Globe className="size-4 text-primary" />
              <span>{lang === "th" ? "EN" : "ไทย"}</span>
            </button>
          </div>
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}