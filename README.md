# Next.js Portfolio

A modern portfolio built with Next.js, React, and TypeScript.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```
This will automatically set up the `app/` directory structure.

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Features

- ✨ Clean, minimal design
- 📱 Fully responsive
- ⚡ Static site generation (SSG) 
- 🎨 Custom CSS with CSS variables
- 🔍 SEO optimized
- ♿ Accessible markup
- 🔐 Admin panel with terminal interface

## Admin Panel

Click the "admin" button in the footer to access the terminal.
- **Password:** `safwan99`
- **Commands:**
  - `blog|title|content|tag` - Add a blog post
  - `project|title|desc|link` - Add a project
  - `about|text` - Update about section
  - `restart` - Clear all data

## Data Storage

All content is now stored on the server in `data/content.json` and served through the `/api/content` endpoint.

## Deployment

The site is configured for static export. Deploy the `out/` directory to:
- Vercel
- GitHub Pages
- Netlify
- Any static hosting service

## License

MIT

