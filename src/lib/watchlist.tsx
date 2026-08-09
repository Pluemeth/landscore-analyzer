import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const Ctx = createContext<{ ids: string[]; toggle: (id: string) => void; has: (id: string) => boolean }>({
  ids: [],
  toggle: () => {},
  has: () => false,
});

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem("geo-watchlist");
    if (raw) {
      try {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setIds(parsed.filter((v): v is string => typeof v === "string"));
      } catch {
        /* ignore malformed storage */
      }
    }
  }, []);

  const toggle = (id: string) =>
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      window.localStorage.setItem("geo-watchlist", JSON.stringify(next));
      return next;
    });

  return (
    <Ctx.Provider value={{ ids, toggle, has: (id) => ids.includes(id) }}>{children}</Ctx.Provider>
  );
}

export const useWatchlist = () => useContext(Ctx);