# CV Portfolio — Build Brief

## Goal
Build a modern, high-end portfolio/CV website for Luís Maia using React + Vite + Tailwind CSS with premium scroll-based animations (Apple-style).

## Tech Stack
- React 19 + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion (scroll animations)
- pnpm as package manager
- GitHub Pages deployment ready

## Design Direction
- Dark theme (black/dark gray background)
- Clean, minimal, luxury feel — think Apple product pages
- Scroll-triggered animations: sections fade/slide in as you scroll
- Smooth parallax effects on hero section
- Animated skill bars or floating tech icons
- Particle or gradient background effect (subtle)
- Mobile responsive
- PT/EN language toggle (i18n)

## Sections (in scroll order)
1. **Hero** — Full viewport, name "Luís Maia", animated title cycling ("Developer", "Tech Lead", "Builder"), social links, particle/gradient bg
2. **About** — Photo + bio text, scroll-reveal, counter animations (132 processes improved, 28 projects, 8980h support, 3920h coding)
3. **Skills** — Animated progress bars or floating tech badges, grouped by category
4. **Interests** — Grid of icons with labels (Coding, Blockchain, 3D Printing, Padel, F1, etc.)
5. **Resume/Timeline** — Vertical timeline with scroll animations for education + work experience
6. **Services** — Cards with icons (Web Dev, Architecture, Consulting, Deploy, Branding, IT Support)
7. **Portfolio** — Filterable grid (All/Website/Brand/Project) with hover effects and lightbox
8. **Contact** — Form with EmailJS integration + social links + address

## Content Sources
- `en.json` and `pt.json` files contain ALL text content in English and Portuguese
- `old-assets/` contains images from the old site (profile pic, portfolio images, favicons)

## Key Requirements
- Use Framer Motion's `useScroll` + `useTransform` for scroll-linked animations
- Each section should animate in on scroll (fade up, slide, scale, etc.)
- Hero should have a dramatic entrance animation on load
- Smooth scroll navigation from navbar
- Language toggle persists across sections
- Contact form: EmailJS (service already configured, key: mwNFi1715yJ6L0u9p)
- Deploy config for GitHub Pages (vite.config.ts base path)

## Social Links
- Twitter: https://twitter.com/MaiaLuismsm14
- Facebook: https://www.facebook.com/profile.php?id=100001977161534
- Instagram: https://www.instagram.com/luisluismaiamaia/
- LinkedIn: https://www.linkedin.com/in/luis-luis-maia-maia
- GitHub: https://github.com/lmaia-22

## DON'T
- Don't use Next.js (overkill for static site)
- Don't use Bootstrap (use Tailwind)
- Don't skip i18n
- Don't make it look generic/template-y
