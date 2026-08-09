import { useMemo } from "react";

import { useI18n } from "@/lib/i18n";
import { economicCenters, majorRoads, scoreColor, type Zone } from "@/lib/mock-data";

export type Layers = {
  landuse: boolean;
  roads: boolean;
  population: boolean;
  price: boolean;
  centers: boolean;
};

const BOUNDS = { minLng: 100.08, maxLng: 101.18, minLat: 13.44, maxLat: 14.18 };
const W = 1000;
const H = 660;

function project([lng, lat]: [number, number]): [number, number] {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * W;
  const y = H - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H;
  return [x, y];
}

const toPath = (pts: [number, number][]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"}${project(p)[0].toFixed(1)},${project(p)[1].toFixed(1)}`).join(" ");

export function ZoneMap({
  zones,
  layers,
  selectedId,
  onSelect,
}: {
  zones: Zone[];
  layers: Layers;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const { t, pick } = useI18n();
  const shapes = useMemo(
    () => zones.map((z) => ({ zone: z, d: `${toPath(z.polygon)} Z`, c: project(z.center) })),
    [zones],
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-card">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={t("map.title")}>
        <defs>
          <pattern id="landuse" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0,12 l12,-12" stroke="var(--color-foreground)" strokeOpacity="0.16" strokeWidth="1.5" />
          </pattern>
          <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill="url(#water)" />
        {Array.from({ length: 21 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={(i * W) / 20}
            y1={0}
            x2={(i * W) / 20}
            y2={H}
            stroke="var(--color-border)"
            strokeOpacity="0.5"
          />
        ))}
        {Array.from({ length: 14 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={(i * H) / 13}
            x2={W}
            y2={(i * H) / 13}
            stroke="var(--color-border)"
            strokeOpacity="0.5"
          />
        ))}

        {shapes.map(({ zone, d }) => {
          const selected = zone.id === selectedId;
          return (
            <g key={zone.id} className="cursor-pointer" onClick={() => onSelect(zone.id)}>
              <path
                d={d}
                fill={scoreColor(zone.score)}
                fillOpacity={selected ? 0.85 : 0.55}
                stroke={selected ? "var(--color-foreground)" : "var(--color-border)"}
                strokeWidth={selected ? 3 : 1.2}
                className="transition-all duration-200 hover:fill-opacity-80"
              />
              {layers.landuse && <path d={d} fill="url(#landuse)" pointerEvents="none" />}
            </g>
          );
        })}

        {layers.roads &&
          majorRoads.map((road, i) => (
            <path
              key={i}
              d={toPath(road)}
              fill="none"
              stroke="var(--color-foreground)"
              strokeOpacity="0.55"
              strokeWidth={3}
              strokeDasharray="10 6"
              pointerEvents="none"
            />
          ))}

        {layers.population &&
          shapes.map(({ zone, c }) => (
            <circle
              key={`p${zone.id}`}
              cx={c[0]}
              cy={c[1]}
              r={8 + (zone.populationDensity / 8500) * 34}
              fill="var(--color-primary)"
              fillOpacity="0.22"
              stroke="var(--color-primary)"
              strokeOpacity="0.5"
              pointerEvents="none"
            />
          ))}

        {layers.centers &&
          economicCenters.map((c) => {
            const [x, y] = project(c.at);
            return (
              <g key={c.id} pointerEvents="none">
                <circle cx={x} cy={y} r={7} fill="var(--color-accent)" stroke="var(--color-card)" strokeWidth={2} />
                <text x={x + 12} y={y + 4} fontSize="15" fill="var(--color-foreground)" fillOpacity="0.85">
                  {pick(c.name)}
                </text>
              </g>
            );
          })}

        {shapes.map(({ zone, c }) => (
          <g key={`l${zone.id}`} pointerEvents="none">
            <text
              x={c[0]}
              y={c[1] - 2}
              textAnchor="middle"
              fontSize="16"
              fontWeight="600"
              fill="var(--color-foreground)"
            >
              {pick(zone.name)}
            </text>
            <text x={c[0]} y={c[1] + 16} textAnchor="middle" fontSize="14" fill="var(--color-foreground)" fillOpacity="0.7">
              {layers.price
                ? `฿${new Intl.NumberFormat("en-US").format(zone.pricePerSqWah)}`
                : `${zone.score}`}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-3 left-3 rounded-md border border-border bg-card/90 px-3 py-2 backdrop-blur">
        <p className="mb-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
          {t("map.legend")}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[0.68rem] text-muted-foreground">{t("map.legend.low")}</span>
          <span className="h-2 w-28 rounded-full bg-[linear-gradient(90deg,var(--color-geo-low),var(--color-geo-mid),var(--color-geo-high),var(--color-geo-peak))]" />
          <span className="text-[0.68rem] text-muted-foreground">{t("map.legend.high")}</span>
        </div>
      </div>
    </div>
  );
}