/**
 * Mock / sample dataset for the Geo-Smart demo.
 * Shapes mirror what the real THEOS-2 / LandX / Sphere feeds will return,
 * so swapping in live data only means replacing the fetchers in api.ts.
 */

export type Bilingual = { th: string; en: string };

export type Factors = {
  urban: number;
  road: number;
  population: number;
  price: number;
  poi: number;
};

export type LandUseYear = {
  year: number;
  built: number;
  agriculture: number;
  vacant: number;
};

export type Zone = {
  id: string;
  name: Bilingual;
  province: Bilingual;
  district: Bilingual;
  score: number;
  factors: Factors;
  pricePerSqWah: number;
  priceHistory: { year: number; price: number }[];
  landUse: LandUseYear[];
  populationDensity: number;
  roadDistanceKm: number;
  urbanGrowthPct: number;
  center: [number, number];
  polygon: [number, number][];
};

export type Listing = {
  id: string;
  zoneId: string;
  title: Bilingual;
  status: "sale" | "rent";
  sizeRai: number;
  priceTHB: number;
  roadDistanceKm: number;
  updatedAt: string;
  image: string;
  owner: { name: Bilingual; phone: string; email: string };
  poi: Bilingual[];
  utilities: Bilingual[];
};

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function polygonAround(center: [number, number], seed: number): [number, number][] {
  const rnd = mulberry32(seed);
  const points: [number, number][] = [];
  const sides = 7;
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const r = 0.035 + rnd() * 0.028;
    points.push([center[0] + Math.cos(angle) * r * 1.25, center[1] + Math.sin(angle) * r]);
  }
  return points;
}

const seeds: Array<{
  id: string;
  name: Bilingual;
  province: Bilingual;
  district: Bilingual;
  center: [number, number];
  score: number;
  price: number;
  pop: number;
  road: number;
  growth: number;
}> = [
  { id: "z01", name: { th: "บางนา", en: "Bang Na" }, province: { th: "กรุงเทพมหานคร", en: "Bangkok" }, district: { th: "เขตบางนา", en: "Bang Na District" }, center: [100.6, 13.67], score: 91, price: 185000, pop: 8200, road: 0.4, growth: 12.4 },
  { id: "z02", name: { th: "บางพลี", en: "Bang Phli" }, province: { th: "สมุทรปราการ", en: "Samut Prakan" }, district: { th: "อำเภอบางพลี", en: "Bang Phli" }, center: [100.72, 13.6], score: 88, price: 96000, pop: 4100, road: 0.9, growth: 15.8 },
  { id: "z03", name: { th: "คลองหลวง", en: "Khlong Luang" }, province: { th: "ปทุมธานี", en: "Pathum Thani" }, district: { th: "อำเภอคลองหลวง", en: "Khlong Luang" }, center: [100.63, 14.06], score: 84, price: 72000, pop: 3300, road: 1.4, growth: 14.1 },
  { id: "z04", name: { th: "ลาดกระบัง", en: "Lat Krabang" }, province: { th: "กรุงเทพมหานคร", en: "Bangkok" }, district: { th: "เขตลาดกระบัง", en: "Lat Krabang District" }, center: [100.79, 13.72], score: 82, price: 88000, pop: 3900, road: 1.1, growth: 11.2 },
  { id: "z05", name: { th: "บางใหญ่", en: "Bang Yai" }, province: { th: "นนทบุรี", en: "Nonthaburi" }, district: { th: "อำเภอบางใหญ่", en: "Bang Yai" }, center: [100.4, 13.86], score: 79, price: 84000, pop: 3600, road: 0.7, growth: 10.6 },
  { id: "z06", name: { th: "ลำลูกกา", en: "Lam Luk Ka" }, province: { th: "ปทุมธานี", en: "Pathum Thani" }, district: { th: "อำเภอลำลูกกา", en: "Lam Luk Ka" }, center: [100.79, 13.96], score: 76, price: 61000, pop: 2800, road: 1.8, growth: 12.9 },
  { id: "z07", name: { th: "พระสมุทรเจดีย์", en: "Phra Samut Chedi" }, province: { th: "สมุทรปราการ", en: "Samut Prakan" }, district: { th: "อำเภอพระสมุทรเจดีย์", en: "Phra Samut Chedi" }, center: [100.55, 13.58], score: 71, price: 52000, pop: 2400, road: 2.4, growth: 8.7 },
  { id: "z08", name: { th: "ไทรน้อย", en: "Sai Noi" }, province: { th: "นนทบุรี", en: "Nonthaburi" }, district: { th: "อำเภอไทรน้อย", en: "Sai Noi" }, center: [100.31, 13.98], score: 67, price: 38000, pop: 1500, road: 3.2, growth: 9.4 },
  { id: "z09", name: { th: "หนองจอก", en: "Nong Chok" }, province: { th: "กรุงเทพมหานคร", en: "Bangkok" }, district: { th: "เขตหนองจอก", en: "Nong Chok District" }, center: [100.86, 13.85], score: 62, price: 33000, pop: 1200, road: 3.9, growth: 7.5 },
  { id: "z10", name: { th: "บางบ่อ", en: "Bang Bo" }, province: { th: "สมุทรปราการ", en: "Samut Prakan" }, district: { th: "อำเภอบางบ่อ", en: "Bang Bo" }, center: [100.87, 13.6], score: 58, price: 29000, pop: 980, road: 4.4, growth: 6.8 },
  { id: "z11", name: { th: "สามพราน", en: "Sam Phran" }, province: { th: "นครปฐม", en: "Nakhon Pathom" }, district: { th: "อำเภอสามพราน", en: "Sam Phran" }, center: [100.22, 13.73], score: 54, price: 31000, pop: 1400, road: 3.6, growth: 5.9 },
  { id: "z12", name: { th: "บ้านโพธิ์", en: "Ban Pho" }, province: { th: "ฉะเชิงเทรา", en: "Chachoengsao" }, district: { th: "อำเภอบ้านโพธิ์", en: "Ban Pho" }, center: [101.05, 13.63], score: 49, price: 22000, pop: 720, road: 5.1, growth: 5.2 },
  { id: "z13", name: { th: "ลาดหลุมแก้ว", en: "Lat Lum Kaeo" }, province: { th: "ปทุมธานี", en: "Pathum Thani" }, district: { th: "อำเภอลาดหลุมแก้ว", en: "Lat Lum Kaeo" }, center: [100.4, 14.05], score: 44, price: 19000, pop: 640, road: 5.8, growth: 4.3 },
  { id: "z14", name: { th: "บางเลน", en: "Bang Len" }, province: { th: "นครปฐม", en: "Nakhon Pathom" }, district: { th: "อำเภอบางเลน", en: "Bang Len" }, center: [100.18, 14.02], score: 38, price: 14000, pop: 430, road: 7.2, growth: 3.1 },
];

export const zones: Zone[] = seeds.map((s, i) => {
  const rnd = mulberry32(i * 7919 + 13);
  const factors: Factors = {
    urban: Math.round(Math.min(100, s.growth * 6 + rnd() * 8)),
    road: Math.round(Math.max(10, 100 - s.road * 13 - rnd() * 6)),
    population: Math.round(Math.min(100, (s.pop / 8500) * 95 + 8 + rnd() * 5)),
    price: Math.round(Math.min(100, s.score * 0.85 + rnd() * 12)),
    poi: Math.round(Math.min(100, s.score * 0.8 + rnd() * 18)),
  };
  const priceHistory = Array.from({ length: 7 }, (_, k) => {
    const year = 2019 + k;
    const drift = 1 + (s.growth / 100) * k * 0.62;
    return { year, price: Math.round((s.price / drift) * (0.985 + rnd() * 0.03)) };
  });
  const landUse: LandUseYear[] = [2016, 2019, 2022, 2025].map((year, k) => {
    const built = Math.round(12 + (s.score / 100) * 18 * (k + 1) + rnd() * 3);
    const agriculture = Math.max(8, Math.round(62 - (s.score / 100) * 13 * (k + 1) - rnd() * 4));
    return { year, built, agriculture, vacant: Math.max(4, 100 - built - agriculture) };
  });
  return {
    id: s.id,
    name: s.name,
    province: s.province,
    district: s.district,
    score: s.score,
    factors,
    pricePerSqWah: s.price,
    priceHistory,
    landUse,
    populationDensity: s.pop,
    roadDistanceKm: s.road,
    urbanGrowthPct: s.growth,
    center: s.center,
    polygon: polygonAround(s.center, i * 131 + 7),
  };
});

export const majorRoads: [number, number][][] = [
  [
    [100.15, 13.72],
    [100.42, 13.75],
    [100.62, 13.72],
    [100.83, 13.71],
    [101.06, 13.66],
  ],
  [
    [100.35, 14.08],
    [100.5, 13.92],
    [100.58, 13.76],
    [100.63, 13.6],
  ],
  [
    [100.2, 13.98],
    [100.55, 13.95],
    [100.82, 13.98],
  ],
  [
    [100.7, 13.55],
    [100.75, 13.72],
    [100.79, 13.98],
  ],
];

export const economicCenters: { id: string; name: Bilingual; at: [number, number] }[] = [
  { id: "c1", name: { th: "ศูนย์กลางธุรกิจสีลม-สาทร", en: "Silom–Sathorn CBD" }, at: [100.53, 13.72] },
  { id: "c2", name: { th: "นิคมอุตสาหกรรมบางปู", en: "Bang Pu Industrial Estate" }, at: [100.66, 13.53] },
  { id: "c3", name: { th: "ท่าอากาศยานสุวรรณภูมิ", en: "Suvarnabhumi Airport" }, at: [100.75, 13.69] },
  { id: "c4", name: { th: "เมืองมหาวิทยาลัยรังสิต", en: "Rangsit University Town" }, at: [100.62, 14.02] },
];

const owners = [
  { name: { th: "คุณสมชาย วัฒนกิจ", en: "Somchai Wattanakij" }, phone: "081-234-5678", email: "somchai@geo-demo.co.th" },
  { name: { th: "บจก. ภูมิทรัพย์ พร็อพเพอร์ตี้", en: "Phumsap Property Co., Ltd." }, phone: "02-118-4420", email: "sales@phumsap-demo.co.th" },
  { name: { th: "คุณอารยา ธนโชติ", en: "Araya Thanachot" }, phone: "089-771-9034", email: "araya@geo-demo.co.th" },
  { name: { th: "หจก. ที่ดินรุ่งเรือง", en: "Rungruang Land LP" }, phone: "02-905-7712", email: "contact@rungruang-demo.co.th" },
];

const poiPool: Bilingual[][] = [
  [
    { th: "ห้างสรรพสินค้า 2.1 กม.", en: "Shopping mall 2.1 km" },
    { th: "สถานีรถไฟฟ้า 1.4 กม.", en: "Rail station 1.4 km" },
    { th: "โรงเรียนนานาชาติ 3.0 กม.", en: "International school 3.0 km" },
  ],
  [
    { th: "นิคมอุตสาหกรรม 4.5 กม.", en: "Industrial estate 4.5 km" },
    { th: "ทางด่วน 1.2 กม.", en: "Expressway ramp 1.2 km" },
    { th: "โรงพยาบาล 2.8 กม.", en: "Hospital 2.8 km" },
  ],
  [
    { th: "ตลาดชุมชน 0.8 กม.", en: "Community market 0.8 km" },
    { th: "มหาวิทยาลัย 5.2 กม.", en: "University 5.2 km" },
    { th: "สวนสาธารณะ 1.9 กม.", en: "Public park 1.9 km" },
  ],
];

const utilityPool: Bilingual[][] = [
  [
    { th: "ไฟฟ้าเข้าถึงแปลง", en: "Grid electricity on site" },
    { th: "ประปาส่วนภูมิภาค", en: "Provincial waterworks" },
    { th: "ถนนคอนกรีตหน้าที่ดิน", en: "Concrete access road" },
  ],
  [
    { th: "ไฟฟ้า 3 เฟส", en: "Three-phase power" },
    { th: "ระบบระบายน้ำ", en: "Drainage system" },
    { th: "อินเทอร์เน็ตไฟเบอร์", en: "Fibre internet" },
  ],
];

const listingImages = [
  "linear-gradient(135deg, oklch(0.55 0.12 200), oklch(0.72 0.13 178))",
  "linear-gradient(135deg, oklch(0.42 0.09 240), oklch(0.68 0.14 165))",
  "linear-gradient(135deg, oklch(0.5 0.13 150), oklch(0.78 0.14 110))",
  "linear-gradient(135deg, oklch(0.38 0.07 235), oklch(0.62 0.15 205))",
];

export const listings: Listing[] = Array.from({ length: 16 }, (_, i) => {
  const rnd = mulberry32(i * 2657 + 91);
  const zone = zones[i % 10];
  const sizeRai = Math.round((1 + rnd() * 24) * 10) / 10;
  const status: "sale" | "rent" = i % 3 === 2 ? "rent" : "sale";
  const salePrice = Math.round(sizeRai * 400 * zone.pricePerSqWah);
  const rentPrice = Math.round((salePrice / 1000) * (0.9 + rnd() * 0.5));
  const day = 1 + ((i * 5) % 27);
  return {
    id: `L-${String(i + 1).padStart(3, "0")}`,
    zoneId: zone.id,
    title: {
      th: `ที่ดิน ${sizeRai} ไร่ ${zone.name.th}`,
      en: `${sizeRai} rai plot in ${zone.name.en}`,
    },
    status,
    sizeRai,
    priceTHB: status === "sale" ? salePrice : rentPrice,
    roadDistanceKm: Math.round((zone.roadDistanceKm + rnd() * 2) * 10) / 10,
    updatedAt: `2026-0${1 + (i % 6)}-${String(day).padStart(2, "0")}`,
    image: listingImages[i % listingImages.length],
    owner: owners[i % owners.length],
    poi: poiPool[i % poiPool.length],
    utilities: utilityPool[i % utilityPool.length],
  };
});

export function getZone(id: string) {
  return zones.find((z) => z.id === id);
}

export function getListing(id: string) {
  return listings.find((l) => l.id === id);
}

export function scoreColor(score: number) {
  if (score >= 80) return "var(--color-geo-peak)";
  if (score >= 68) return "var(--color-geo-high)";
  if (score >= 55) return "var(--color-geo-mid)";
  return "var(--color-geo-low)";
}

export const provinces = Array.from(new Map(zones.map((z) => [z.province.en, z.province])).values());

export function formatTHB(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}