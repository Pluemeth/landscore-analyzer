import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "th" | "en";

type Entry = { th: string; en: string };

export const dict = {
  "brand.name": { th: "Geo-Smart", en: "Geo-Smart" },
  "brand.full": { th: "Geo-Smart Location Analysis", en: "Geo-Smart Location Analysis" },
  "brand.tagline": {
    th: "วิเคราะห์พื้นที่เศรษฐกิจใหม่ด้วยข้อมูลดาวเทียม",
    en: "Emerging economic zone intelligence from satellite data",
  },

  "nav.home": { th: "หน้าแรก", en: "Home" },
  "nav.dashboard": { th: "แผนที่วิเคราะห์", en: "Map Dashboard" },
  "nav.listings": { th: "ที่ดินซื้อ-เช่า", en: "Land Listings" },
  "nav.ranking": { th: "จัดอันดับ & รายงาน", en: "Ranking & Report" },
  "nav.methodology": { th: "ระเบียบวิธี", en: "Methodology" },
  "nav.sources": { th: "แหล่งข้อมูล", en: "Data Sources" },
  "nav.about": { th: "เกี่ยวกับ & ติดต่อ", en: "About & Contact" },
  "nav.group.analysis": { th: "การวิเคราะห์", en: "Analysis" },
  "nav.group.info": { th: "ข้อมูลโครงการ", en: "Project info" },

  "action.theme": { th: "สลับโหมดสี", en: "Toggle theme" },
  "action.lang": { th: "EN", en: "ไทย" },
  "action.explore": { th: "เข้าสู่แดชบอร์ด", en: "Explore Dashboard" },
  "action.method": { th: "ดูวิธีวิเคราะห์", en: "How it works" },
  "action.viewDetail": { th: "ดูรายละเอียด", en: "View detail" },
  "action.back": { th: "ย้อนกลับ", en: "Back" },
  "action.reset": { th: "ล้างตัวกรอง", en: "Reset filters" },
  "action.download": { th: "ดาวน์โหลดรายงาน (PDF)", en: "Download report (PDF)" },
  "action.bookmark": { th: "บันทึกพื้นที่สนใจ", en: "Add to watchlist" },
  "action.bookmarked": { th: "บันทึกแล้ว", en: "Saved" },

  "home.hero.title": {
    th: "วิเคราะห์และคาดการณ์พื้นที่เศรษฐกิจใหม่ด้วยข้อมูลดาวเทียมและ AI",
    en: "Predict emerging economic zones with satellite data and AI",
  },
  "home.hero.sub": {
    th: "รวมภาพถ่าย THEOS-2, การใช้ที่ดินหลายช่วงเวลา, โครงข่ายถนน, ประชากร และราคาประเมินที่ดิน ให้เป็นคะแนนศักยภาพรายตำบลที่นำไปตัดสินใจลงทุนได้ทันที",
    en: "THEOS-2 imagery, multi-temporal land use, road networks, population and appraisal prices distilled into a sub-district potential score you can act on.",
  },
  "home.badge": {
    th: "ข้อมูลตัวอย่าง • กรุงเทพฯ และปริมณฑล",
    en: "Sample data • Bangkok Metropolitan Region",
  },
  "home.pipeline": { th: "กระบวนการทำงาน", en: "How the pipeline works" },
  "home.step.input": { th: "Input — รวบรวมข้อมูล", en: "Input — Collect" },
  "home.step.input.desc": {
    th: "ภาพดาวเทียม THEOS-2, LandX, ขอบเขตและ POI จาก Sphere, โครงข่ายถนน, ประชากร-นักท่องเที่ยว และราคาประเมินย้อนหลัง",
    en: "THEOS-2 imagery, LandX land use, Sphere boundaries and POI, road network, population/tourism and historical appraisal prices.",
  },
  "home.step.process": { th: "Process — วิเคราะห์เชิงพื้นที่", en: "Process — Spatial model" },
  "home.step.process.desc": {
    th: "ตรวจจับการเปลี่ยนแปลงการใช้ที่ดิน ผสานตัวแปรเชิงพื้นที่ แล้วให้น้ำหนักด้วยแบบจำลองคาดการณ์การขยายตัวของเมือง",
    en: "Detect land-use change, fuse spatial variables, and weight them with an urban-growth prediction model.",
  },
  "home.step.output": { th: "Output — คะแนนและรายงาน", en: "Output — Score & report" },
  "home.step.output.desc": {
    th: "Heatmap ความน่าจะเป็น, คะแนนศักยภาพ 0-100, ตารางจัดอันดับ และรายการที่ดินในโซนศักยภาพสูง",
    en: "Probability heatmap, 0-100 potential score, ranking tables and land listings inside high-potential zones.",
  },
  "home.stats.zones": { th: "ตำบลที่วิเคราะห์", en: "Zones analysed" },
  "home.stats.listings": { th: "แปลงที่ดินในระบบ", en: "Land parcels" },
  "home.stats.layers": { th: "ชั้นข้อมูล", en: "Data layers" },
  "home.stats.years": { th: "ปีข้อมูลย้อนหลัง", en: "Years of history" },

  "map.title": { th: "แผนที่วิเคราะห์เชิงโต้ตอบ", en: "Interactive Map Dashboard" },
  "map.subtitle": {
    th: "Heatmap ความน่าจะเป็นของการเป็นพื้นที่เศรษฐกิจใหม่",
    en: "Probability heatmap of emerging economic zones",
  },
  "map.layers": { th: "ชั้นข้อมูล", en: "Layers" },
  "map.layer.landuse": { th: "การใช้ที่ดิน", en: "Land use" },
  "map.layer.roads": { th: "ถนนสายหลัก", en: "Major roads" },
  "map.layer.population": { th: "ความหนาแน่นประชากร", en: "Population density" },
  "map.layer.price": { th: "ราคาที่ดิน", en: "Land price" },
  "map.layer.centers": { th: "ศูนย์เศรษฐกิจเดิม", en: "Existing economic centers" },
  "map.filters": { th: "ตัวกรอง", en: "Filters" },
  "map.filter.province": { th: "จังหวัด", en: "Province" },
  "map.filter.district": { th: "อำเภอ/เขต", en: "District" },
  "map.filter.subdistrict": { th: "ตำบล/แขวง", en: "Sub-district" },
  "map.filter.score": { th: "ช่วงคะแนนศักยภาพ", en: "Potential score range" },
  "map.filter.price": { th: "ช่วงราคาที่ดิน (บาท/ตร.ว.)", en: "Land price (THB/sq.wah)" },
  "map.filter.all": { th: "ทั้งหมด", en: "All" },
  "map.legend": { th: "ระดับโอกาส", en: "Probability" },
  "map.legend.low": { th: "ต่ำ", en: "Low" },
  "map.legend.high": { th: "สูง", en: "High" },
  "map.hint": {
    th: "คลิกพื้นที่บนแผนที่เพื่อดูรายละเอียด",
    en: "Click a zone on the map to inspect it",
  },
  "map.matched": { th: "พื้นที่ที่ตรงเงื่อนไข", en: "Matching zones" },

  "panel.score": { th: "คะแนนศักยภาพรวม", en: "Potential Score" },
  "panel.breakdown": { th: "องค์ประกอบคะแนน", en: "Score breakdown" },
  "panel.priceTrend": { th: "แนวโน้มราคาที่ดินย้อนหลัง", en: "Historical land price trend" },
  "panel.landuse": { th: "การเปลี่ยนแปลงการใช้ที่ดิน", en: "Land use change" },
  "panel.factor.urban": { th: "อัตราขยายตัวเมือง", en: "Urban expansion rate" },
  "panel.factor.road": { th: "ระยะห่างถนนหลัก", en: "Proximity to major road" },
  "panel.factor.pop": { th: "ความหนาแน่นประชากร", en: "Population density" },
  "panel.factor.price": { th: "แนวโน้มราคาที่ดิน", en: "Land price momentum" },
  "panel.factor.poi": { th: "ความหนาแน่น POI", en: "POI density" },
  "panel.landuse.built": { th: "พื้นที่สิ่งปลูกสร้าง", en: "Built-up" },
  "panel.landuse.agri": { th: "พื้นที่เกษตร", en: "Agriculture" },
  "panel.landuse.vacant": { th: "พื้นที่ว่าง", en: "Vacant" },
  "panel.close": { th: "ปิด", en: "Close" },
  "panel.parcels": { th: "แปลงที่ดินในโซนนี้", en: "Parcels in this zone" },

  "listing.title": { th: "ที่ดินสำหรับซื้อ-เช่า", en: "Land for Sale & Lease" },
  "listing.subtitle": {
    th: "แปลงที่ดินในโซนศักยภาพสูงพร้อมข้อมูลติดต่อผู้ขาย",
    en: "Parcels inside high-potential zones with owner contacts",
  },
  "listing.budget": { th: "งบประมาณสูงสุด (ล้านบาท)", en: "Max budget (M THB)" },
  "listing.size": { th: "ขนาดพื้นที่ขั้นต่ำ (ไร่)", en: "Min size (rai)" },
  "listing.roadDist": {
    th: "ระยะห่างจากถนนหลักไม่เกิน (กม.)",
    en: "Max distance to major road (km)",
  },
  "listing.status": { th: "สถานะ", en: "Status" },
  "listing.status.sale": { th: "ขาย", en: "For sale" },
  "listing.status.rent": { th: "ให้เช่า", en: "For lease" },
  "listing.price": { th: "ราคา", en: "Price" },
  "listing.pricePerMonth": { th: "บาท/เดือน", en: "THB/month" },
  "listing.zoneScore": { th: "คะแนนโซน", en: "Zone score" },
  "listing.contact": { th: "ติดต่อผู้ขาย/ผู้ให้เช่า", en: "Contact owner" },
  "listing.updated": { th: "อัปเดตล่าสุด", en: "Last updated" },
  "listing.surroundings": { th: "ข้อมูลโดยรอบ", en: "Surroundings" },
  "listing.satellite": { th: "ภาพถ่ายดาวเทียม", en: "Satellite view" },
  "listing.location": { th: "ตำแหน่งบนแผนที่", en: "Location" },
  "listing.utilities": { th: "สาธารณูปโภค", en: "Utilities" },
  "listing.empty": {
    th: "ไม่พบแปลงที่ดินที่ตรงกับเงื่อนไข ลองปรับตัวกรอง",
    en: "No parcels match your filters. Try widening them.",
  },
  "listing.notFound": { th: "ไม่พบข้อมูลแปลงที่ดินนี้", en: "This parcel was not found" },

  "rank.title": { th: "จัดอันดับพื้นที่ศักยภาพสูงสุด", en: "Top Emerging Areas" },
  "rank.subtitle": {
    th: "เรียงตามคะแนนศักยภาพรวม พร้อมส่งออกรายงานสรุป",
    en: "Ranked by overall potential score, with exportable summary",
  },
  "rank.search": { th: "ค้นหาพื้นที่...", en: "Search areas..." },
  "rank.col.rank": { th: "อันดับ", en: "Rank" },
  "rank.col.area": { th: "พื้นที่", en: "Area" },
  "rank.col.province": { th: "จังหวัด", en: "Province" },
  "rank.col.score": { th: "คะแนน", en: "Score" },
  "rank.col.growth": { th: "ขยายตัวเมือง", en: "Urban growth" },
  "rank.col.price": { th: "ราคา/ตร.ว.", en: "Price/sq.wah" },
  "rank.col.trend": { th: "แนวโน้ม 5 ปี", en: "5-yr trend" },
  "rank.top10": { th: "เปรียบเทียบ 10 อันดับแรก", en: "Top 10 comparison" },
  "rank.exported": { th: "กำลังสร้างรายงาน (เดโม)", en: "Generating report (demo)" },
  "rank.empty": { th: "ไม่พบพื้นที่ที่ค้นหา", en: "No areas found" },

  "method.title": { th: "ระเบียบวิธีวิเคราะห์", en: "Methodology" },
  "method.subtitle": {
    th: "จากภาพถ่ายดาวเทียมสู่คะแนนศักยภาพเชิงพื้นที่",
    en: "From satellite imagery to a spatial potential score",
  },
  "method.s1": { th: "1. วิเคราะห์การเปลี่ยนแปลงการใช้ที่ดิน", en: "1. Land-use change detection" },
  "method.s1.d": {
    th: "เปรียบเทียบภาพ THEOS-2 และชั้นข้อมูล LandX หลายช่วงเวลา เพื่อหาอัตราการเปลี่ยนจากพื้นที่เกษตร/ว่างเปล่า ไปเป็นสิ่งปลูกสร้าง",
    en: "Compare multi-temporal THEOS-2 imagery and LandX layers to measure conversion from agriculture/vacant land into built-up area.",
  },
  "method.s2": { th: "2. ผสานตัวแปรเชิงพื้นที่", en: "2. Spatial variable fusion" },
  "method.s2.d": {
    th: "รวมระยะห่างจากถนนหลักและศูนย์เศรษฐกิจเดิม ความหนาแน่นประชากรและนักท่องเที่ยว ความหนาแน่น POI และแนวโน้มราคาประเมินที่ดิน",
    en: "Combine distance to major roads and existing economic centers, population and tourism density, POI density, and appraisal price momentum.",
  },
  "method.s3": { th: "3. แบบจำลองเชิงพื้นที่", en: "3. Spatial model" },
  "method.s3.d": {
    th: "ให้น้ำหนักตัวแปรด้วยแบบจำลองถดถอยเชิงพื้นที่ร่วมกับ cellular automata เพื่อคาดการณ์ความน่าจะเป็นของการขยายตัวเมือง",
    en: "Weight variables with a spatial regression plus cellular-automata model to estimate urban expansion probability.",
  },
  "method.s4": { th: "4. คะแนนและจัดอันดับ", en: "4. Score & ranking" },
  "method.s4.d": {
    th: "ปรับสเกลผลลัพธ์เป็นคะแนน 0-100 รายตำบล แสดงผลเป็น heatmap ตารางจัดอันดับ และรายงานสรุป",
    en: "Rescale outputs into a 0-100 sub-district score rendered as a heatmap, ranking table and summary report.",
  },
  "method.weights": { th: "น้ำหนักตัวแปรในแบบจำลอง", en: "Model variable weights" },

  "src.title": { th: "แหล่งข้อมูล", en: "Data Sources" },
  "src.subtitle": {
    th: "ระบบสาธิตนี้ใช้ข้อมูลจำลอง โครงสร้างพร้อมเชื่อมต่อ API จริงในอนาคต",
    en: "This demo runs on mock data; the structure is ready for live API integration.",
  },
  "src.status.mock": { th: "ข้อมูลจำลอง", en: "Mock data" },
  "src.status.planned": { th: "เตรียมเชื่อมต่อ", en: "Integration planned" },
  "src.theos": { th: "ภาพถ่ายดาวเทียม THEOS-2", en: "THEOS-2 satellite imagery" },
  "src.theos.d": {
    th: "ภาพความละเอียดสูงหลายช่วงเวลา ใช้ตรวจจับสิ่งปลูกสร้างใหม่",
    en: "High-resolution multi-temporal imagery for detecting new construction.",
  },
  "src.landx": { th: "การใช้ที่ดิน LandX", en: "LandX land use" },
  "src.landx.d": {
    th: "ชั้นข้อมูลประเภทการใช้ที่ดินรายปี สำหรับวิเคราะห์การเปลี่ยนแปลง",
    en: "Annual land-use classification layers for change analysis.",
  },
  "src.sphere": { th: "ข้อมูลเชิงพื้นที่ Sphere", en: "Sphere geospatial data" },
  "src.sphere.d": {
    th: "ขอบเขตการปกครอง จุดสนใจ (POI) และผังเมืองรวม",
    en: "Administrative boundaries, POI and city planning zones.",
  },
  "src.roads": { th: "โครงข่ายถนนและคมนาคม", en: "Road & transport network" },
  "src.roads.d": {
    th: "ถนนสายหลัก ทางด่วน และสถานีขนส่งมวลชน",
    en: "Highways, expressways and mass-transit stations.",
  },
  "src.pop": { th: "ประชากรและนักท่องเที่ยว", en: "Population & tourism" },
  "src.pop.d": {
    th: "จำนวนประชากรรายตำบลและปริมาณนักท่องเที่ยวรายพื้นที่",
    en: "Sub-district population counts and area-level visitor volume.",
  },
  "src.price": { th: "ราคาประเมินที่ดินย้อนหลัง", en: "Historical appraisal prices" },
  "src.price.d": {
    th: "ราคาประเมินราชการและราคาตลาดย้อนหลัง 5 ปี",
    en: "Five years of official appraisal and market prices.",
  },
  "src.records": { th: "จำนวนระเบียบข้อมูล", en: "Records" },
  "src.updated": { th: "อัปเดตชุดข้อมูล", en: "Dataset updated" },

  "about.title": { th: "เกี่ยวกับโครงการ", en: "About the project" },
  "about.body": {
    th: "Geo-Smart Location Analysis เป็นต้นแบบระบบสนับสนุนการตัดสินใจสำหรับหน่วยงานผังเมือง นักลงทุนอสังหาริมทรัพย์ นักพัฒนาที่ดิน และนักวิเคราะห์เศรษฐกิจภูมิภาค โดยแปลงข้อมูลภาพถ่ายดาวเทียมและข้อมูลเชิงพื้นที่ให้เป็นคะแนนศักยภาพที่เปรียบเทียบกันได้",
    en: "Geo-Smart Location Analysis is a decision-support prototype for city planning agencies, property investors, land developers and regional economists. It turns satellite and geospatial data into comparable potential scores.",
  },
  "about.audience": { th: "กลุ่มผู้ใช้งาน", en: "Who it is for" },
  "about.aud1": { th: "หน่วยงานผังเมือง", en: "City planning agencies" },
  "about.aud2": { th: "นักลงทุนอสังหาริมทรัพย์", en: "Property investors" },
  "about.aud3": { th: "นักพัฒนาที่ดิน", en: "Land developers" },
  "about.aud4": { th: "นักวิเคราะห์เศรษฐกิจภูมิภาค", en: "Regional economic analysts" },
  "contact.title": { th: "ติดต่อเรา", en: "Contact us" },
  "contact.name": { th: "ชื่อ-นามสกุล", en: "Full name" },
  "contact.org": { th: "หน่วยงาน/บริษัท", en: "Organisation" },
  "contact.email": { th: "อีเมล", en: "Email" },
  "contact.message": { th: "ข้อความ", en: "Message" },
  "contact.send": { th: "ส่งข้อความ", en: "Send message" },
  "contact.sent": {
    th: "ส่งข้อความเรียบร้อย ทีมงานจะติดต่อกลับ",
    en: "Message sent. Our team will get back to you.",
  },

  "watchlist.title": { th: "พื้นที่ที่บันทึกไว้", en: "Watchlist" },
  "watchlist.empty": {
    th: "ยังไม่มีพื้นที่ที่บันทึก เลือกพื้นที่จากแผนที่แล้วกดบันทึก",
    en: "No saved zones yet. Pick a zone on the map and save it.",
  },

  "common.loading": { th: "กำลังโหลดข้อมูล...", en: "Loading data..." },
  "common.demo": { th: "ข้อมูลสาธิต", en: "Demo data" },
  "common.rai": { th: "ไร่", en: "rai" },
  "common.km": { th: "กม.", en: "km" },
  "common.thb": { th: "บาท", en: "THB" },
  "common.mthb": { th: "ล้านบาท", en: "M THB" },
  "common.perSqWah": { th: "บาท/ตร.ว.", en: "THB/sq.wah" },
  "common.points": { th: "คะแนน", en: "pts" },
} satisfies Record<string, Entry>;

export type TKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: TKey) => string;
  pick: (entry: { th: string; en: string }) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("th");

  useEffect(() => {
    const stored = window.localStorage.getItem("geo-lang");
    if (stored === "en" || stored === "th") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("geo-lang", l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "th" ? "en" : "th"),
      t: (key) => dict[key][lang],
      pick: (entry) => entry[lang],
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
