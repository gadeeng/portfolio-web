# Organizational & Community Leadership Experience

Kompilasi rekam jejak kepemimpinan organisasi, pengabdian masyarakat, serta kepanitiaan dalam bidang media, komunikasi visual, branding, dan pemberdayaan literasi digital.

---

## 1. HIMATIKA UNAIR (Himpunan Mahasiswa Matematika Universitas Airlangga)
- **Role:** Staf Ahli Media Informasi dan Komunikasi
- **Periode:** Februari 2024 – Januari 2025
- **Kategori:** Organisasi Mahasiswa / Himpunan Program Studi
- **Fokus Utama:** Manajemen Media, Desain Grafis, Visual Branding, Quality Control Konten
- **Deskripsi:**
  Bertanggung jawab penuh dalam mendukung manajemen media terpadu melalui perancangan desain grafis, produksi konten kreatif, dan pembentukan visual branding himpunan. Mengawasi serta memastikan standar konsistensi visual pada seluruh materi publikasi eksternal maupun internal organisasi, serta aktif berkontribusi dalam perumusan strategi komunikasi publik yang adaptif dan informatif.
- **Skills & Tools:** Visual Branding, Graphic Design, Content Strategy, Media Management, Quality Assurance, Adobe Illustrator/Photoshop, Figma.
- **Arsip Dokumentasi:** 5 Foto Dokumentasi (`/org_exp/himatika/`)

---

## 2. SDGs & Community Service (International Educational Outreach)
- **Role:** Staf Media Informasi dan Komunikasi
- **Periode:** 2023 – 2025
- **Kemitraan:** Kolaborasi Internasional Universitas Airlangga (UNAIR) & Universiti Teknologi Malaysia (UTM)
- **Program Utama:**
  - *FunMath Camp (2023)* — Kemah matematika interaktif & edukasi rekreatif untuk generasi muda.
  - *Play to Solve: A Math Game Day (2025)* — Kompetisi dan simulasi problem-solving berbasis gamifikasi.
- **Fokus Utama:** Cross-border Collaboration, Liputan Media Lapangan, Dokumentasi Visual, Media Promosi
- **Deskripsi:**
  Mengelola media publikasi dan strategi komunikasi lintas batas untuk program penyuluhan pendidikan kolaboratif antara UNAIR dan UTM. Bertanggung jawab dalam pembuatan aset konten promosi digital, liputan real-time, serta dokumentasi audio-visual selama seluruh rangkaian kegiatan berlangsung.
- **Skills & Tools:** Cross-border Coordination, Live Event Documentation, Photography, Social Media Broadcasting, Storytelling.
- **Arsip Dokumentasi:** 11 Foto Dokumentasi (`/org_exp/fun_comap/`)

---

## 3. Optimalisasi Pemasaran Online UMKM Berbasis Kearifan Lokal
- **Sub-judul:** Sarana Branding Promosi Ecotourism di Kabupaten Situbondo
- **Role:** Photographer, Videographer, and Editor
- **Waktu Pelaksanaan:** 18 September 2024 – 2025
- **Kemitraan:** Program Studi S-1 Matematika UNAIR × Dinas Koperasi, Perindustrian dan Perdagangan Kabupaten Situbondo & Pelaku UMKM
- **Kategori:** Pengabdian Masyarakat / Pemberdayaan Ekonomi Kreatif & Ecotourism
- **Fokus Utama:** Commercial Product Photography, Video Liputan, Digital Marketing Workshop, Pendampingan UMKM
- **Deskripsi:**
  Mengemban peran sebagai fotografer, videografer, dan editor dalam program pengabdian masyarakat untuk meningkatkan literasi digital pelaku UMKM lokal Situbondo. Menghasilkan materi promosi audio-visual berstandar profesional untuk produk unggulan lokal, mendokumentasikan sesi pelatihan pembuatan marketplace/toko online, serta memfasilitasi materi visual untuk kampanye promosi ecotourism daerah.
- **Skills & Tools:** Commercial Photography, Video Production & Editing, Product Branding, Digital Marketing Literacy, Community Empowerment.
- **Arsip Dokumentasi:** 4 Foto Dokumentasi (`/org_exp/situbondo/`)

---

## 4. Pelatihan Konten Kreator Siswa SMK Negeri Rengel di Kabupaten Tuban
- **Sub-judul:** Pemberdayaan Kompetensi Digital Siswa Multimedia & Desain Komunikasi Visual (DKV)
- **Role:** Photographer, Videographer, and Editor & Fasilitator
- **Waktu Pelaksanaan:** 18 Juli 2024
- **Audience:** Siswa SMKN Rengel, Tuban (Jurusan Multimedia & DKV)
- **Penyelenggara:** Tim Pengabdian Masyarakat S-1 Matematika Universitas Airlangga
- **Kategori:** Pelatihan Vokasi / Creative Industry Mentorship
- **Fokus Utama:** Pelatihan Videografi, Content Creation, Editing Kreatif, Dokumentasi Event
- **Deskripsi:**
  Bertindak sebagai dokumentator teknis sekaligus fasilitator pengantar dalam pelatihan content creator bagi siswa kejuruan Multimedia dan DKV di SMKN Rengel. Program dirancang untuk memacu kreativitas siswa dalam merancang konten video pendek yang engaging, memperkenalkan ekosistem industri kreatif digital, serta memberikan wawasan praktis produksi video mulai dari pra-produksi, pengambilan gambar, hingga finishing editing.
- **Skills & Tools:** Event Videography, Creative Mentoring, Video Editing, Lighting & Framing, Youth Inspiration.
- **Arsip Dokumentasi:** 5 Foto Dokumentasi (`/org_exp/tuban/`)

---

## Dokumentasi Kegiatan (Interactive 3D Visual Archive)

### Komponen: `<DepthCarousel />`
Komponen 3D carousel interaktif dari **React Bits** yang menampilkan kedalaman 3D (*perspective, tilt, depth tint, card blur & scaling*).

#### Instalasi & Dependensi:
```bash
npx shadcn@latest add @react-bits/DepthCarousel-TS-CSS
# Membutuhkan GSAP untuk animasi fisika halus
npm install gsap
```

#### Struktur File Direktori:
```
public/org_exp/
├── himatika/
│   ├── 2018_0101_00001700.jpg
│   ├── 2018_0101_00011000.jpg
│   ├── 2018_0101_00025700.jpg
│   ├── 2018_0101_00034600.jpg
│   └── 2024_0302_11150000.jpg
├── fun_comap/
│   ├── IMG_3120.JPG ... IMG_4194.JPG (11 foto)
├── situbondo/
│   ├── IMG_0228.JPG
│   ├── IMG_0257.JPG
│   ├── IMG_0280.JPG
│   └── IMG_0288.JPG
└── tuban/
    ├── IMG_7005.JPG ... IMG_7069.JPG (5 foto)
```

#### Contoh Implementasi Showcase:
```tsx
import DepthCarousel from '@/components/react-bits/DepthCarousel';

// 1. Koleksi Sorotan Utama (Highlights)
<DepthCarousel 
  items={[
    { image: "/org_exp/himatika/2024_0302_11150000.jpg", title: "HIMATIKA UNAIR", subtitle: "Staf Ahli Media Informasi dan Komunikasi" },
    { image: "/org_exp/fun_comap/IMG_3518.JPG", title: "SDGs & Community Service", subtitle: "Kolaborasi UNAIR × Universiti Teknologi Malaysia" },
    { image: "/org_exp/situbondo/IMG_0257.JPG", title: "UMKM Situbondo Ecotourism", subtitle: "Branding & Pemasaran Digital Berbasis Kearifan Lokal" },
    { image: "/org_exp/tuban/IMG_7037.JPG", title: "SMKN Rengel Tuban", subtitle: "Pelatihan Konten Kreator Siswa Multimedia & DKV" }
  ]}
  depthTint="#EF4444"
  cardWidth="420px"
  cardHeight="270px"
  cornerRadius="18px"
  depth="220px"
  spread="60px"
  tilt={10}
  tiltDirection="right"
  perspective="1500px"
  visibleCards={4}
  falloff={0.2}
  blur="9px"
  duration="600ms"
  ease="Power3 Out"
  autoplay={true}
  autoplayDelay="2600ms"
  loop={true}
  controls={true}
  indicators={true}
/>
```