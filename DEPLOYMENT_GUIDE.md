# 🚀 Panduan Deploy ke Vercel (GRATIS)

## Langkah 1: Persiapan

### 1.1 Install Vercel CLI (Optional, bisa skip)
```bash
npm install -g vercel
```

### 1.2 Pastikan project sudah di-commit ke Git
```bash
git add .
git commit -m "Ready for deployment"
```

## Langkah 2: Deploy via Vercel Website (RECOMMENDED - Paling Mudah)

### 2.1 Buat Akun Vercel
1. Buka [vercel.com](https://vercel.com)
2. Klik **Sign Up**
3. Login dengan **GitHub** (recommended) atau email

### 2.2 Push ke GitHub (jika belum)
```bash
# Buat repository baru di GitHub (via website github.com)
# Lalu jalankan:
git remote add origin https://github.com/USERNAME/undangan.git
git branch -M main
git push -u origin main
```

### 2.3 Import Project ke Vercel
1. Di dashboard Vercel, klik **Add New... > Project**
2. Pilih repository **undangan** dari GitHub
3. Vercel akan auto-detect Next.js
4. **PENTING**: Klik **Environment Variables**
5. Tambahkan variable:
   - Key: `NEXT_PUBLIC_APPS_SCRIPT_URL`
   - Value: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
6. Klik **Deploy**

### 2.4 Tunggu Deploy Selesai
- Proses deploy sekitar 1-2 menit
- Setelah selesai, Anda akan dapat URL seperti: `https://undangan-xyz.vercel.app`

## Langkah 3: Deploy via CLI (Alternative)

```bash
# Login ke Vercel
vercel login

# Deploy
vercel

# Ikuti prompt:
# - Set up and deploy? Yes
# - Which scope? (pilih account Anda)
# - Link to existing project? No
# - Project name? undangan
# - Directory? ./
# - Override settings? No

# Set environment variable
vercel env add NEXT_PUBLIC_APPS_SCRIPT_URL

# Paste URL Apps Script Anda, lalu Enter

# Deploy production
vercel --prod
```

## Langkah 4: Update Apps Script CORS (PENTING!)

Setelah deploy, Anda perlu update Apps Script untuk allow domain Vercel:

### 4.1 Buka Apps Script Editor
1. Buka Google Sheet
2. **Extensions > Apps Script**

### 4.2 Tambahkan CORS Header (Optional, biasanya tidak perlu)
Apps Script secara default sudah allow semua origin, tapi jika ada masalah, tambahkan ini di awal fungsi `doGet` dan `doPost`:

```javascript
function doGet(e) {
  // CORS headers (optional)
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  // ... rest of your code
}
```

## Langkah 5: Test Aplikasi Online

1. Buka URL Vercel Anda: `https://undangan-xyz.vercel.app`
2. Coba tambah tamu baru
3. Cek Google Sheet apakah data masuk
4. Coba edit dan delete

## 🎯 Tips & Troubleshooting

### Update Aplikasi
Setiap kali Anda push ke GitHub, Vercel akan auto-deploy:
```bash
git add .
git commit -m "Update feature"
git push
```

### Ganti Domain Custom (Optional)
1. Di Vercel dashboard > Project Settings > Domains
2. Tambahkan domain custom Anda (misal: `undangan.namaanda.com`)
3. Ikuti instruksi DNS

### Jika Ada Error "Apps Script URL not configured"
1. Cek di Vercel dashboard > Settings > Environment Variables
2. Pastikan `NEXT_PUBLIC_APPS_SCRIPT_URL` sudah diisi
3. Redeploy: klik **Deployments** > titik tiga > **Redeploy**

### Jika Data Tidak Muncul
1. Pastikan Apps Script sudah di-deploy dengan akses "Anyone"
2. Test Apps Script URL langsung di browser
3. Cek Console browser (F12) untuk error

## 📱 Bagikan Aplikasi

Setelah online, Anda bisa bagikan URL ke tim:
```
https://undangan-xyz.vercel.app
```

Semua orang bisa akses dan input data secara bersamaan! 🎉

## 🔒 Keamanan (Optional)

Jika ingin tambah password protection:
1. Bisa pakai Vercel Password Protection (berbayar)
2. Atau tambahkan simple auth di Apps Script
3. Atau gunakan Vercel Edge Middleware (advanced)

---

**Selamat! Aplikasi Anda sudah online dan gratis selamanya!** 🚀
