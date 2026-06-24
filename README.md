# Peeptoon — 3D Glassmorphism Logistics Landing Page

A front-end recreation of [peeptoon.com](https://peeptoon.com) (Pan-India logistics / courier platform),
rebuilt as a high-impact **3D glassmorphism** experience in **Next.js 14 + TypeScript**.

## Run it

```bash
cd peeptoon
npm install      # already done
npm run dev      # http://localhost:3000
```

## What's inside

- **3D WebGL globe** (React Three Fiber + three.js) with India-centric live shipping arcs
- **Glassmorphism design system** — glass cards with sheen, moving glare, hover lift; neon gradient text; aurora orbs; animated grid; grain overlay
- **Smooth scroll** (Lenis) + **GSAP ScrollTrigger** reveal / stagger / parallax engine
- **3D pointer-tilt** cards, CSS-3D spinning parcel cube
- Interactive **volumetric weight calculator** and **live shipment tracker** with animated timeline
- Infinite **partner / client marquees**, animated **count-up** stats
- Fully responsive (375 → 1440px), reduced-motion aware, keyboard-accessible

## Sections

Navbar (sticky glass + WhatsApp bar) · Hero (3D globe) · Services · Local-Tripura ·
Specialized services · Trust / stats · Volumetric calculator · Partners · Certifications ·
Live tracking CTA · Footer

## Stack / CDNs (open-source)

`next` · `react` · `three` · `@react-three/fiber` · `@react-three/drei` · `gsap` ·
`lenis` · `framer-motion` · `lucide-react` · `tailwindcss`

> Partner/client logos and certification badges are styled placeholders for demo purposes.
