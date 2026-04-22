# Gadde Punith — Portfolio

Personal portfolio website built with React + Vite. Dark/light mode, smooth scroll animations, fully responsive.

## 🚀 Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
# Output is in /dist folder
```

## ▲ Deploy to Vercel (Recommended — Free)

**Option A: CLI (fastest)**
```bash
npm install -g vercel
vercel
# Follow prompts — auto-detects Vite. Done in ~60 seconds.
```

**Option B: GitHub + Vercel Dashboard**
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click Deploy → get a live URL instantly

## 🌐 Deploy to Netlify (Alternative)

```bash
npm run build
# Then drag-and-drop the /dist folder to https://app.netlify.com/drop
```

Or via CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## ✏️ Customizing Content

All content lives in `src/App.jsx`. Look for these constants at the top:

| Constant | What it controls |
|---|---|
| `SKILLS` | Skill categories and items |
| `PROJECTS` | All project cards |
| `EXPERIENCE` | Education and certifications |

To add your **GitHub links**, search for `https://github.com/gadde-punith` and replace with your actual repo URLs.

To add your **Resume PDF**, replace `href="#"` on the "Download Resume" button with your PDF URL (e.g., upload to Google Drive or Cloudinary and use a direct link).

## 🎨 Design Tokens

Main accent color: `#63cab7` (teal-green)  
Dark background: `#0a0f0d`  
Light background: `#f8f9f7`  
Font: Syne (headings) + DM Sans (body) + DM Mono (code/labels)

## 📁 Project Structure

```
portfolio/
├── index.html          # HTML entry + SEO meta tags
├── vite.config.js      # Vite config
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx        # React root
    └── App.jsx         # Entire portfolio (single file)
```
