<div align="center">

# Juanmax · Portfolio

**Personal portfolio of Juan Manuel Gonzalez — Software Engineer focused on Backend, Data Engineering and Cloud Architecture.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-black?style=flat)](#license)

</div>

---

## Overview

An editorial-style, minimalist single-page portfolio inspired by modern design systems. Built as a layered React application with smooth scroll-driven animations, internationalization (ES / EN) and an aesthetic floating-card layout over a tech-themed background.

## Live Demo

🌐 **[juanmanueldev.website](https://www.juanmanueldev.website/)**

## Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Framework    | React 19 + Vite 8                       |
| Styling      | Tailwind CSS 4                          |
| Animations   | Framer Motion 12                        |
| Routing      | React Router 7                          |
| Icons        | Lucide React · React Icons              |
| Typography   | Instrument Serif · Inter (Google Fonts) |
| Hosting      | Vercel                                  |

## Features

- ✦ **Editorial Hero** — Floating card with serif typography and animated tech stack icons.
- ✦ **Scroll-driven Transitions** — Sections fade, scale and translate based on scroll progress (`useScroll` + `useTransform`).
- ✦ **Bilingual Content** — Global `LanguageContext` toggles between Spanish and English with smooth `AnimatePresence` transitions.
- ✦ **Smart Navigation** — Active section detection via `IntersectionObserver` highlights the current page in the navbar.
- ✦ **Looped Marquee Banner** — Pure-CSS infinite scroll announcement with dismiss action.
- ✦ **Diffused Card Edges** — Soft blur halos and shadows give cards a floating, dreamlike feel.
- ✦ **Tech-themed Background** — Layered radial gradients, subtle grid, glow orbs and diagonal accent lines.
- ✦ **Responsive Layout** — Adaptive grid that gracefully reflows from desktop to mobile.

## Project Structure

```
src/
├── assets/                  # Static images and media
├── components/
│   ├── sections/            # Page sections (Hero, About, ...)
│   ├── Navbar.jsx           # Navigation with live clock & active section
│   ├── Marquee.jsx          # Infinite scrolling announcement
│   └── LangToggle.jsx       # ES / EN switch
├── context/
│   └── LanguageContext.jsx  # Global language provider
├── hooks/
│   └── useActiveSection.js  # IntersectionObserver-based active section
├── layouts/
│   └── MainLayout.jsx       # Shared layout wrapper
├── pages/
│   ├── Home.jsx             # Composes Hero + About + background
│   └── NotFound.jsx         # 404 page
├── App.jsx                  # Router definition
├── main.jsx                 # React entry point
└── index.css                # Tailwind imports + global tokens
```

## Architecture Highlights

- **Layered structure** — clear separation between `pages`, `layouts`, `components/sections`, reusable `components`, `hooks` and `context`.
- **Composition over configuration** — sections are independent components composed in `Home.jsx`.
- **Context-driven state** — language is a single source of truth shared across sections.
- **Animation primitives** — `framer-motion` hooks (`useScroll`, `useTransform`, `AnimatePresence`) drive every transition.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Juangonzalez09/PortafolioWeb.git
cd PortafolioWeb
npm install
```

### Development

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Deployment

This project is deployed on **Vercel** with the following configuration:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | Vite            |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |
| Root Directory   | `./`            |

Every push to `master` triggers a production deployment. Pushes to `develop` generate preview deployments for review.

## Branching Strategy

- **`master`** — production-ready, deployed to Vercel.
- **`develop`** — active integration branch.
- **`feature/*`** — short-lived branches off `develop` for new features.

## Roadmap

- [ ] Projects section with case studies
- [ ] Stack page with detailed proficiency breakdown
- [ ] Blog / writing section
- [ ] CV PDF generation pipeline
- [ ] Dark / light theme toggle
- [ ] Lighthouse 100 across all metrics

## Contact

**Juan Manuel Gonzalez**

- LinkedIn — [juan-manuel-gonzalez-2940b4199](https://www.linkedin.com/in/juan-manuel-gonzalez-2940b4199/)
- GitHub — [@Juangonzalez09](https://github.com/Juangonzalez09)

## License

Released under the [MIT License](LICENSE). Feel free to use this project as inspiration for your own portfolio.

---

<div align="center">
<sub>Crafted with care · Building With Heart</sub>
</div>
