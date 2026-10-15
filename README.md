<p align="center">
  <img src="logo.png" alt="Print Shop POS logo" width="140">
</p>

<h1 align="center">Print Shop POS</h1>

<p align="center">
  Mini POS para sa printing at souvenir business — orders, pre-orders, inventory, cash flow, reports, at AI assistant.<br>
  Taglish / English · Light & dark mode · Works on phone · Installable · Offline-ready
</p>

---

## Features

| Area | What it does |
|---|---|
| **Encoder** | Multi-item orders with supplies used and waste, extras/discounts, bulk discount, down payment or credit, invoice/receipt (print, PDF, PNG, share) |
| **Pre-orders** | Multiple products, down payment and additional payments, invoice with progress history, one reminder per pre-order, convert to order |
| **History** | Edit or delete orders (stock is corrected automatically), payments, refunds, status, CSV export |
| **Production board** | Drag orders through New → In progress → Ready → Delivered |
| **Inventory** | Live stock, type the real count to correct it, restock, low-stock alerts, shopping list, 30-day forecast |
| **Products** | Cost-based pricing (materials + labor + overhead + markup), recipes, pictures, catalog PDF |
| **Money** | Wallets (Cash, GCash, Maya, Bank) and transfers, cash flow ledger, expenses, automatic fund allocation |
| **Reports** | Daily and monthly reports, Daily Closing / EOD report with cash count, analytics and insights |
| **Notes** | Reminders, tasks, daily/weekly checklists and routines |
| **AI Assistant** | Gemini (free tier) chat that can read and change data with your approval; automatically picks the fastest working model |
| **Cloud Sync** | Optional Supabase sync between devices |
| **Staff PIN** | Owner / staff roles (privacy screen) |

## Project structure

```
.
├── index.html              # the whole app (HTML + CSS + JS, no build step)
├── sw.js                   # service worker (offline + install)
├── manifest.webmanifest    # PWA manifest (name, colors, icons)
├── vercel.json             # Vercel headers / caching
├── favicon.ico
├── logo.png
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-512.png
    ├── apple-touch-icon.png
    └── favicon-32.png
```

There is **no build step and no dependencies** — it is a static site.

## Deploy (GitHub → Vercel)

### 1. Upload to GitHub
**Option A — in the browser (no tools needed)**
1. Go to [github.com/new](https://github.com/new), name the repository (e.g. `print-shop-pos`), choose **Private** or Public, click **Create repository**.
2. Click **uploading an existing file**.
3. Unzip this project, then drag **all the files and the `icons` folder** (not the outer folder itself) into the page.
4. Click **Commit changes**.

**Option B — with git**
```bash
cd print-shop-pos
git init
git add .
git commit -m "Print Shop POS"
git branch -M main
git remote add origin https://github.com/<your-username>/print-shop-pos.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import** the `print-shop-pos` repository.
3. Settings:
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (root)
4. Click **Deploy**. Your app will be live at `https://<project-name>.vercel.app`.

Every push to `main` redeploys automatically. The app checks for the new version every time it is opened.

### 3. Install on a phone (optional)
Open the Vercel link, then:
- **Android (Chrome):** menu ⋮ → **Install app** (or the **📲 I-install** button in the app).
- **iPhone (Safari):** Share → **Add to Home Screen**.

## Important: where the data lives

- All data (orders, inventory, settings, pictures) is saved **in the browser of each device** (localStorage). Nothing is stored on Vercel.
- Opening the site on another phone or browser starts **empty**. To use the same data on several devices, set up **Setup → Cloud Sync (Supabase)** — the in-app tutorial walks through it — or move data with **Setup → Backup / Restore (JSON)**.
- Clearing browser data deletes the local copy. **Make regular backups** (Setup → ⬇ Backup).
- Anyone with the link can open the app, but they only see their own empty copy. Use **Setup → Staff & PIN** for a lock screen on shared devices. For a private link, enable *Deployment Protection* in Vercel.

## AI Assistant (Gemini, free)

1. Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. In the app: **🤖 AI Assistant → ⚙️ → paste the key → 🔌 Test**.
3. The app tests every model and automatically uses the fastest one that works.

The key is stored only on that device — it is never part of the code, backups, or cloud sync. On the free tier Google may use prompts to improve its services, so avoid sending very sensitive information.

## Cloud Sync (Supabase, optional)

Follow **Setup → Cloud Sync → Tutorial** inside the app. The Supabase URL, anon key, and shop code are entered in the app and stored on the device — **do not commit them to this repository.**

## Local use

Just open `index.html` in a browser — it works without a server (install/offline features need the hosted HTTPS version).

## Updating the app

Replace `index.html` with the new version, commit, and push. Vercel redeploys within a minute. If you change other cached files (icons, manifest), also bump `CACHE` in `sw.js` (e.g. `printshop-pos-v13`).

---

## Paano i-deploy (Tagalog, maikli)

1. **GitHub:** Gumawa ng bagong repo sa github.com/new → *uploading an existing file* → i-drag lahat ng files at ang `icons` folder → *Commit changes*.
2. **Vercel:** vercel.com/new → i-Import ang repo → Framework: **Other**, walang Build Command → **Deploy**.
3. Buksan ang link (`…vercel.app`). Sa phone, pwedeng **I-install** para parang app.
4. **Tandaan:** naka-save ang data sa browser ng bawat device. Gamitin ang **Cloud Sync** para pareho ang data sa ibang device, at **mag-Backup** palagi.
