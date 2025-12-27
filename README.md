# 💒 Wedding Guest List App

Aplikasi manajemen daftar tamu undangan pernikahan dengan fitur:
- ✅ Tambah tamu dengan validasi duplikat (Nama + Alamat)
- ✏️ Edit data tamu
- 🗑️ Hapus tamu
- 📥 Download data ke CSV
- 🔄 Real-time sync dengan Google Sheets
- 📱 Responsive design

## 🚀 Quick Deploy ke Vercel (GRATIS)

### Opsi 1: Deploy via Website (PALING MUDAH)

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy di Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub
   - Klik **Add New... > Project**
   - Pilih repository ini
   - Tambahkan Environment Variable:
     - `NEXT_PUBLIC_APPS_SCRIPT_URL` = URL Apps Script Anda
   - Klik **Deploy**

3. **Selesai!** 🎉
   - Aplikasi akan online di `https://nama-project.vercel.app`

### Opsi 2: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variable saat diminta
# NEXT_PUBLIC_APPS_SCRIPT_URL = (paste URL Apps Script)

# Deploy production
vercel --prod
```

## 📝 Setup Google Apps Script

1. Buka Google Sheet baru
2. **Extensions > Apps Script**
3. Copy kode dari `apps-script/Code.gs`
4. **Deploy > New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy **Web App URL**
6. Paste URL ke `.env.local` atau Vercel Environment Variables

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Tech Stack

- **Framework**: Next.js 16
- **Styling**: TailwindCSS 4
- **Database**: Google Sheets (via Apps Script)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📖 Dokumentasi Lengkap

Lihat [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) untuk panduan deploy lengkap.

## 🎨 Features

### Duplicate Detection
Aplikasi akan mencegah input tamu dengan kombinasi Nama + Alamat yang sama.

### Real-time Sync
Semua perubahan langsung tersimpan di Google Sheets dan bisa diakses bersama.

### Export CSV
Download data tamu dalam format CSV untuk keperluan lain.

## 📞 Support

Jika ada masalah, cek:
1. Apps Script sudah di-deploy dengan akses "Anyone"
2. Environment variable `NEXT_PUBLIC_APPS_SCRIPT_URL` sudah diisi
3. Google Sheet sudah di-share dengan Service Account (jika pakai Service Account)

---

Made with ❤️ for your special day
