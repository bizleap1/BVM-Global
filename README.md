# 🌿 BVM Global — Premium Agri Exports Website

A modern, responsive single-page website for BVM Global, an Indian agricultural products export business.

## Tech Stack
- **React 18** — UI framework
- **Vite** — Build tool & dev server
- **Tailwind CSS** — Utility-first styling
- **Poppins** — Google Font

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

## Project Structure
```
bvm-global/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        ← Main website component
│   ├── main.jsx       ← React entry point
│   └── index.css      ← Tailwind base styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Sections
1. **Hero** — Full-screen farm background with CTA buttons
2. **About** — Vision, Mission & Core Values
3. **Products** — 6 product cards (Makhana, Lychee, Suran, Mangoes, Moringa, Chillies)
4. **Certifications** — DGFT, MSME, APEDA badges
5. **Why Choose Us** — Key differentiators
6. **Contact** — Form + WhatsApp button
7. **Footer** — Links, social icons, copyright

## Customization
- Update contact details in `App.jsx` (email, phone, WhatsApp number)
- Replace emoji product visuals with real images by swapping the emoji `<div>` with an `<img>` tag
- Update WhatsApp link: change `919876543210` to your actual number
