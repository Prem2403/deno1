# THE HOTEL SUNSET

An ultra-luxury coastal haven web application crafted with calm, elegant motion, responsive design, and smooth performance.

---

## 🚀 Deploying to Vercel

This repository is pre-configured for instant zero-configuration deployment on Vercel.

### Option 1: Via Vercel Web Dashboard (Recommended)

1. Push this codebase to your GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New..."** → **"Project"**.
3. Import your repository.
4. Vercel will automatically detect the settings from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (or `tsc --noEmit && vite build`)
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your site will be live within seconds with full global edge caching and SPA routing.

### Option 2: Via Vercel CLI

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Deploy directly from the project directory
vercel

# 3. For production release
vercel --prod
```

---

## 🛠 Project Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local development server on port `3000` |
| `npm run build` | Runs TypeScript verification (`tsc --noEmit`) and compiles optimized production assets to `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checking |
| `npx tsx --test src/utils/booking.test.ts` | Runs automated unit tests |

---

## 📁 Key Configurations Included for Vercel

- **`vercel.json`**:
  - Configures Single Page Application (SPA) client-side rewrites (`/*` → `/index.html`) so refreshing or deep linking never returns a 404.
  - Adds aggressive long-term immutable caching (`max-age=31536000, immutable`) for all hashed static assets in `/assets/`.
  - Enforces essential security response headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin`).
- **`vite.config.ts`**:
  - Updated to modern Node ESM URL path resolution (`import.meta.url`) for seamless compatibility across Vercel Node runtimes.
- **`.gitignore`**:
  - Excludes `.vercel`, `dist`, `node_modules`, and local test artifacts to keep deployment repositories clean.
