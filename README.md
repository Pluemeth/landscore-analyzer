# Geo Potential Hub

Prompt สำหรับ Loveable: Geo-Smart Location Analysis

คัดลอกข้อความด้านล่างทั้งหมดไปวางใน Loveable ได้เลย

PROMPT

สร้างเว็บไซต์แดชบอร์ดเชิงโต้ตอบ (interactive web dashboard) ชื่อ "Geo-Smart Location Analysis" สำหรับวิเคราะห์และคาดการณ์ศักยภาพของ "พื้นที่เศรษฐกิจใหม่" (Emerging Economic Zones) โดยใช้ข้อมูลภาพถ่ายดาวเทียมและข้อมูลเชิงพื้นที่ เว็บไซต์ต้องรองรับ 2 ภาษา (ไทย/อังกฤษ) พร้อมปุ่มสลับภาษาที่มุมขวาบนของทุกหน้า

1. ภาพรวมและกลุ่มเป้าหมาย

กลุ่มผู้ใช้งาน: หน่วยงานผังเมือง, นักลงทุนอสังหาริมทรัพย์, นักพัฒนาที่ดิน, นักวิเคราะห์เศรษฐกิจภูมิภาค

โทนการออกแบบ: ทันสมัย เป็นมืออาชีพ (professional GIS/fintech dashboard) โทนสีน้ำเงิน-เขียว-เทาเข้ม สื่อถึงข้อมูลภูมิสารสนเทศและความน่าเชื่อถือ ใช้กราฟและแผนที่เป็นองค์ประกอบหลัก

Layout: Sidebar navigation + main content area แบบ dashboard, responsive ทั้ง desktop และ mobile

2. แหล่งข้อมูล Input (แสดงเป็นหน้า "Data Sources" และใช้เป็น mock data ในระบบ)

สร้างหน้าที่อธิบายและจำลองแหล่งข้อมูลต่อไปนี้ (ใช้ mock/sample data เนื่องจากยังไม่มีการเชื่อมต่อ API จริง):

ภาพถ่ายดาวเทียม THEOS-2 และข้อมูลการใช้ที่ดินจาก LandX ในหลายช่วงเวลา (multi-temporal land use)

ข้อมูลเชิงพื้นที่จาก Sphere (boundary, POI, ผังเมือง)

โครงข่ายถนนและเส้นทางคมนาคม

ข้อมูลประชากรและนักท่องเที่ยวรายพื้นที่

ข้อมูลราคาประเมินที่ดินย้อนหลัง

3. หน้าหลักที่ต้องมีในเว็บไซต์

3.1 หน้า Landing/Home

Hero section อธิบายจุดขาย: "วิเคราะห์และคาดการณ์พื้นที่เศรษฐกิจใหม่ด้วยข้อมูลดาวเทียมและ AI"

สรุปกระบวนการทำงาน (Input → Process → Output) เป็น 3 ขั้นตอนแบบภาพ infographic

ปุ่ม CTA "เข้าสู่แดชบอร์ด" / "Explore Dashboard"

3.2 หน้า Interactive Map Dashboard (หน้าหลักของระบบ)

แผนที่แบบ interactive (ใช้ mock geojson polygon แบ่งตามตำบล/อำเภอ) แสดง Heatmap ความน่าจะเป็น (Probability Score) ของการเป็นพื้นที่เศรษฐกิจใหม่ ไล่สีจากเขียว (โอกาสต่ำ) ถึงแดง/ส้ม (โอกาสสูง)

Layer toggle ให้เปิด-ปิดชั้นข้อมูล: การใช้ที่ดิน, ถนนสายหลัก, ความหนาแน่นประชากร, ราคาที่ดิน, ศูนย์เศรษฐกิจเดิม

แถบตัวกรอง (filter panel): จังหวัด, อำเภอ, ตำบล, ช่วงคะแนนศักยภาพ, ช่วงราคาที่ดิน

เมื่อคลิกพื้นที่บนแผนที่ ให้เปิด side panel แสดงรายละเอียด:

คะแนนศักยภาพรวม (Potential Score 0-100) พร้อมกราฟ breakdown ตามตัวแปร (อัตราขยายตัวเมือง, ระยะห่างถนนหลัก, ความหนาแน่นประชากร, แนวโน้มราคาที่ดิน)

กราฟแนวโน้มราคาที่ดินย้อนหลัง (line chart)

กราฟการเปลี่ยนแปลงการใช้ที่ดิน (before/after หรือ time-series)

3.3 หน้า Land Listing (ข้อมูลที่ดินสำหรับซื้อ-เช่า)

รายการที่ดินในพื้นที่ศักยภาพสูง แสดงเป็น card grid: รูปภาพ/แผนที่ย่อ, ขนาดที่ดิน, ราคา, สถานะ (ขาย/เช่า), คะแนนศักยภาพของโซนนั้น

ข้อมูลติดต่อผู้ขาย/ผู้ให้เช่า (ชื่อ, เบอร์โทร, อีเมล, วันที่อัปเดตข้อมูลล่าสุด "Last updated")

ปุ่มกรองตามงบประมาณ, ขนาดพื้นที่, ระยะห่างจากถนนหลัก

หน้ารายละเอียดที่ดินแต่ละแปลง แสดงแผนที่ตำแหน่ง, ภาพถ่ายดาวเทียม, ข้อมูลโดยรอบ (POI, ถนน, สาธารณูปโภค)

3.4 หน้า Ranking / Report

ตารางจัดอันดับพื้นที่ที่มีศักยภาพสูงสุด (Top Emerging Areas) เรียงตามคะแนน พร้อม sort/search

ปุ่ม "ดาวน์โหลดรายงานสรุป (PDF)" สำหรับแต่ละพื้นที่หรือภาพรวมทั้งจังหวัด (ทำ mock export function ก่อนได้)

กราฟเปรียบเทียบพื้นที่ top 10 ด้วย bar chart

3.5 หน้า Methodology / How it Works

อธิบายกระบวนการวิเคราะห์แบบเข้าใจง่าย: การวิเคราะห์การเปลี่ยนแปลงการใช้ที่ดิน → ผสานตัวแปร (ระยะห่างถนน/ศูนย์เศรษฐกิจ, ความหนาแน่นประชากร, แนวโน้มราคาที่ดิน) → แบบจำลองเชิงพื้นที่ (spatial model) → คะแนนจัดอันดับศักยภาพ

ใช้ diagram/flowchart แสดง pipeline: Input → Process → Output

3.6 หน้า About / Contact

ข้อมูลเกี่ยวกับโครงการ และฟอร์มติดต่อสำหรับหน่วยงาน/นักลงทุนที่สนใจ

4. ฟีเจอร์เสริม

ระบบ Login/Dashboard สำหรับผู้ใช้ที่ลงทะเบียน (นักลงทุน) เพื่อบันทึกพื้นที่ที่สนใจ (bookmark/watchlist)

Dark mode toggle

Loading state และ empty state ที่ออกแบบสวยงามสำหรับตอนที่ยังไม่มีข้อมูลจริง (เนื่องจากใช้ mock data)

5. ข้อกำหนดทางเทคนิค

ใช้ mock/sample dataset ในรูปแบบ JSON/GeoJSON สำหรับพื้นที่ตัวอย่าง (เช่น กรุงเทพฯ และปริมณฑล) เพื่อ demo ระบบให้ทำงานได้จริงทันที

โครงสร้างเตรียมพร้อมสำหรับเชื่อมต่อ API ภายนอกในอนาคต (เว้น placeholder function สำหรับดึงข้อมูลจาก THEOS-2, LandX, Sphere)

ข้อความ label ทุกจุดต้องมีทั้งภาษาไทยและอังกฤษ (ใช้ระบบ i18n) โดยค่าเริ่มต้นเป็นภาษาไทย

หมายเหตุ: สามารถวางข้อความข้างต้นทั้งหมดใน Loveable ได้ทันที หากต้องการปรับ scope ให้เล็กลงสำหรับ MVP แรก แนะนำให้เริ่มจากส่วนที่ 3.1, 3.2 และ 3.3 ก่อน แล้วค่อยเพิ่ม 3.4-3.6 ในภายหลัง

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://landscore-analyzer.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d2ec5030-2fb5-4394-9a3e-a7b7722d3d1b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
