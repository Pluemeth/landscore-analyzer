/**
 * Placeholder data access layer.
 *
 * Every function below currently resolves mock data. When the real
 * THEOS-2 / LandX / Sphere endpoints become available, replace the body of
 * each function with the network call — no component needs to change.
 */
import { listings, zones, type Listing, type Zone } from "./mock-data";

const LATENCY_MS = 220;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}

/** TODO: GET {THEOS2_API}/scenes?bbox=... — multi-temporal satellite scenes */
export async function fetchTheos2Scenes(): Promise<{ id: string; capturedAt: string }[]> {
  return delay(
    zones.map((z, i) => ({ id: `THEOS2-${z.id}`, capturedAt: `2025-0${(i % 9) + 1}-14` })),
  );
}

/** TODO: GET {LANDX_API}/landuse?year=... — annual land-use classification */
export async function fetchLandUse(zoneId: string) {
  return delay(zones.find((z) => z.id === zoneId)?.landUse ?? []);
}

/** TODO: GET {SPHERE_API}/boundaries + /poi — administrative geometry & POI */
export async function fetchZones(): Promise<Zone[]> {
  return delay(zones);
}

export async function fetchZone(id: string): Promise<Zone | undefined> {
  return delay(zones.find((z) => z.id === id));
}

export async function fetchListings(): Promise<Listing[]> {
  return delay(listings);
}

export async function fetchListing(id: string): Promise<Listing | undefined> {
  return delay(listings.find((l) => l.id === id));
}
