# Purple Wave 💜

Purple Wave es una experiencia web fan-made orientada a la comunidad ARMY en Perú, combinando ecommerce, contenido, personalización de merch y una experiencia especial alrededor de BTS en Lima 2026.

El proyecto está **en desarrollo activo**. Es un proyecto **fan-made**, no oficial de BTS, BIGHIT MUSIC ni HYBE. Por ahora **no tiene backend**: el catálogo, las noticias y demás contenido usan **datos mock** mientras avanza la construcción por fases.

## About

El objetivo es construir una tienda/comunidad con estética premium tipo *k-pop editorial fashion commerce*: compra de merch, personalización, un hub dedicado a las fechas de Lima 2026, perfiles de los integrantes y contenido de comunidad — todo servido como una SPA en React con foco en SEO, performance y accesibilidad desde el inicio.

## Current Status

**Phase 1 — Bootstrap ✅**

- Vite + React 19 + TypeScript estricto
- React Router (rutas reales, lazy loading por página)
- Tailwind CSS v4 con design tokens centralizados
- SEO base (metadata por página, canonical, Open Graph, Twitter Card, robots.txt)
- Layout responsive base (Header, Footer, Announcement bar)
- Routing completo con páginas placeholder
- ESLint (flat config)
- Docker (build multi-stage + Nginx)

**Phase 2 — Home / Hero 🚧** — siguiente etapa.

## Tech Stack

| Categoría | Tecnología |
|---|---|
| Framework | React 19.2 |
| Lenguaje | TypeScript 6.0 |
| Build tool | Vite 8.2 |
| Routing | React Router 7.18 |
| Estilos | Tailwind CSS 4.3 |
| Estado global | Zustand 5.0 |
| Animaciones | Framer Motion 13.1 |
| Iconografía | Lucide React 1.34 |
| SEO | React Helmet Async 3.0 |
| Servidor de producción | Nginx (Alpine) |
| Contenedores | Docker (build multi-stage) |

## Requirements

```text
Node.js 22.22+
npm
```

## Installation

```bash
git clone https://github.com/MQuesquenPa/BTS-WEB.git
cd BTS-WEB
npm install
npm run dev
```

## Scripts

```bash
npm run dev       # servidor de desarrollo
npm run build     # typecheck (tsc -b) + build de producción
npm run lint       # ESLint
npm run preview    # sirve el build de producción localmente
```

## Project Structure

```text
src/
├── app/            # AppRouter (rutas + lazy loading)
├── components/
│   ├── common/     # Container, Seo, PagePlaceholder, RouteFallback
│   └── layout/     # AnnouncementBar, Header, Footer, Layout
├── constants/       # routes.ts, site.ts
├── pages/            # una carpeta por ruta
└── styles/            # tokens.css (design tokens)
```

## Application Routes

```text
/
/shop
/product/:slug
/customize
/members
/members/:slug
/lima-2026
/news
/news/:slug
/wishlist
/cart
/checkout
/about
```

## Docker

**Build:**

```bash
docker build -t purple-wave .
```

**Run:**

```bash
docker run --rm -p 8080:80 purple-wave
```

**Abrir:**

```text
http://localhost:8080
```

La imagen final sirve el build estático con Nginx; el runtime de Node solo se usa durante el build.

## Roadmap

- [x] Bootstrap / arquitectura
- [ ] Home + Hero
- [ ] Componentes de ecommerce (ProductCard, quick view, wishlist)
- [ ] Shop (filtros, sorting)
- [ ] Product detail
- [ ] Members
- [ ] Lima 2026 hub
- [ ] News
- [ ] Customizer de merch
- [ ] Wishlist / Cart
- [ ] Checkout
- [ ] SEO avanzado / prerendering
- [ ] QA final

## Legal Disclaimer

**English:** Purple Wave is an independent fan-made project. It is not affiliated with, endorsed by, or officially connected to BTS, BIGHIT MUSIC, HYBE, or their subsidiaries.

**Español:** Purple Wave es un proyecto independiente y fan-made. No está afiliado, respaldado ni conectado oficialmente con BTS, BIGHIT MUSIC, HYBE ni sus subsidiarias.
