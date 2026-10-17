# Gading Kusuma — Brand Guidelines & Identity System

> Panduan standar identitas visual personal brand **Gading Kusuma** (Matematika, Sistem Dinamik, Machine Learning, dan Optimasi).

---

## 1. Filosofi & Makna Logo

- **Nama Logo:** The Golden Tusk G
- **Konsep:** Lengkung dinamis spiral logaritmik ($r = ae^{b\theta}$) yang meruncing halus membentuk siluet huruf **'G'**—mengintegrasikan kurva gading (*tusk*) dengan kurva atraktor ekuilibrium sistem diferensial, berpusat pada titik fokus crimson `#E60012`.
- **Karakter:** Presisi, intelek, mengalir, tangguh, dan berwibawa.

---

## 2. Struktur Master Files

Semua file tersimpan di direktori `gading-logo-kit/`:

| Folder | Isi File | Kegunaan |
|---|---|---|
| `master/` | Master SVG (Vector murni tanpa font dependency) | Dokumen master produksi (skalabilitas tak terbatas) |
| `png/` | Render raster resolusi tinggi (1024px – 2048px, transparent) | Penggunaan visual dokumen, slide, dan presentasi |
| `web-icons/` | Favicon multi-resolusi, App Icons, Web Manifest | Integrasi instan ke website portofolio & web apps |
| `slides/` | Mockup visual real-world (README, Terminal, Web, App Icon) | Presentasi dan showcase |

---

## 3. Sistem Warna Brand (Color System)

| Nama Warna | HEX | RGB | CMYK | Peran |
|---|---|---|---|---|
| **Equilibrium Crimson** | `#E60012` | `230, 0, 18` | `0, 100, 100, 10` | Titik fokus atraktor, aksen dinamis, highlight |
| **Obsidian Black** | `#111111` | `17, 17, 17` | `0, 0, 0, 93` | Warna primer bentuk logo pada latar terang |
| **Stark White** | `#FFFFFF` | `255, 255, 255` | `0, 0, 0, 0` | Warna logo pada dark mode / latar gelap |
| **Slate Neutral** | `#666666` | `102, 102, 102` | `0, 0, 0, 60` | Warna teks metadata teknis dan divider |

---

## 4. Clear Space & Ukuran Minimum

### Clear Space Zone
Pertahankan ruang bebas minimal sebesar **$1 \times X$** di sekeliling logo, di mana $X$ adalah diameter titik fokus merah (lingkaran atraktor tengah). Jangan menempatkan elemen grafis atau teks lain di dalam zona ini.

### Ukuran Minimum
| Varian | Digital (Layar) | Cetak (Print) |
|---|---|---|
| **Horizontal Lockup** | Min. lebar 120 px | Min. lebar 32 mm |
| **Stacked Lockup** | Min. tinggi 80 px | Min. tinggi 24 mm |
| **Symbol Only** | Min. 16 px (`web-icons/favicon-16.png`) | Min. 6 mm |

---

## 5. Tipografi Pendukung

- **Primary Display / UI Font:** [Geist](https://vercel.com/font) atau [Inter](https://fonts.google.com/specimen/Inter) (Clean, neutral, modern modernist sans).
- **Technical / Code Font:** [Geist Mono](https://vercel.com/font) atau [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (untuk ekspresi matematika, formula, dan data).

---

## 6. Integrasi Cepat ke Website (`gadingkusuma.vercel.app`)

### A. Salin Favicon & Web Icons
Salin seluruh file dari folder `gading-logo-kit/web-icons/` ke folder `public/` proyek website Next.js:
- `favicon.ico`
- `icon-192.png` & `icon-512.png`
- `apple-touch-icon.png`
- `site.webmanifest`

### B. Pasang Tag HTML di `<head>`
```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

---

## 7. Pantangan Penggunaan (Misuse Rules)

1. **Dilarang mendistorsi proporsi:** Jangan meregangkan (*stretch*) atau memipihkan (*squash*) logo secara non-proporsional.
2. **Dilarang memutar sudut:** Jangan merotasi orientasi spiral 'G' atau mengubah posisi horizontal taji crossbar.
3. **Dilarang mengubah komposisi lockup:** Jangan menggeser jarak antara simbol 'G' dan teks 'GADING KUSUMA'.
4. **Dilarang menambahkan efek berlebih:** Jangan menambahkan *drop shadow*, gradasi warna neon, atau *stroke outline* yang tidak ada pada master resmi.
