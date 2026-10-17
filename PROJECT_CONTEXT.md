# Project Context & AI Handover Guide

> **Project Name**: YOUR BRAND — Pure Food. Better Life. (Agro E-Commerce & B2B Export Platform)  
> **Repository**: [https://github.com/Anekantjainsagar/Anurag-Project.git](https://github.com/Anekantjainsagar/Anurag-Project.git)  
> **Status**: Production-ready frontend with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, multi-slide Hero Carousel, 29-product catalog across all 7 categories, and dedicated dynamic Product Detail Pages (PDP).  
> **Primary Goal for Successor AI**: Pick up this codebase seamlessly, maintain visual fidelity with the reference brand mockup, and continue adding full-stack features (auth, database, payment gateway, backend APIs).

---

## 1. Executive Summary & Brand Overview

This application is an e-commerce and B2B wholesale platform for a premium agricultural brand specializing in pure, farm-sourced staple commodities:
- **Product Lines**: Traditional Basmati & Non-Basmati Rice, Unpolished Pulses (Dals), California & Hand-Selected Dry Fruits, Ancient Millets, Cold-Pressed Seeds, Pure Spices, and Vedic Bilona Ghee / Cold-Pressed Oils.
- **Brand Identity**:
  - **Emblem**: Elegant dual-leaf green sprout with a modern golden accent.
  - **Headline**: "YOUR BRAND" / "PURE FOOD. BETTER LIFE."
  - **Tone**: Heritage, purity, natural farming, export-quality standard, trustworthy, hygienic.
  - **Audience**: Dual market — direct-to-consumer (D2C) households seeking unadulterated staples, and global B2B/institutional buyers seeking bulk contract supply.

---

## 2. Technical Stack

| Technology | Version | Purpose / Notes |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16.4.0** | App Router architecture, Turbopack enabled, Partial Prefetching, Static Generation |
| **Language** | **TypeScript 5** | Fully typed interfaces in `@/types` |
| **UI Styling** | **Tailwind CSS v4** | Modern `@import "tailwindcss"` and fluid typography |
| **Icons** | **Lucide React** (`^1.56.0`) | Feather-style SVG icons |
| **Typography** | Google Fonts | `Playfair Display` (Headings & Serif accents) + `Plus Jakarta Sans` (Body & UI) |
| **State Management**| React Context API | `CartContext` for cart, wishlist, notifications, modals |
| **Imagery** | Unsplash High-Res CDN | Verified high-resolution food & agriculture photography with multi-image product galleries |
| **Package Manager**| `npm` | Standard npm scripts (`dev`, `build`, `start`, `lint`) |

---

## 3. Visual Design System & Tokens

### Color Palette
- **Forest Green Primary**: `#043e23` / `#033b20` / `#054b28` (Navbar, CTA buttons, badges, top bar, headers)
- **Forest Deep (Dark)**: `#022816` / `#012b18` / `#02331c` (Footer background, rating pill, deep accents)
- **Forest Hover**: `#065430` / `#03391e` (Button hover states)
- **Golden Harvest Accent**: `#c29336` / `#facc15` / `#e6b343` (Stars, badges, leaf highlights)
- **Warm Sand / Cream**: `#fbf8f2` / `#fcfaf5` / `#f5f0e6` / `#fbf7ee` (Hero background, category cards, feature pill containers)
- **Card Borders**: `#e4ebe6` / `#ede4d3` / `#dce5df` (Subtle 1px borders)
- **Typography Colors**: `#073f24` (Hero headlines), `#1f2937` (Dark text), `#6b7280` (Muted copy)

### Typography Rules
- **Serif Headings** (`font-serif`): `Playfair Display`, `Georgia`, serif
  - Used for: Brand name in logo, Hero titles ("PURE QUALITY. PREMIUM TASTE."), section titles ("Shop by Category", "Our Best Sellers", "Why Choose Our Products", "From Our Blog"), promo banners, and PDP titles.
- **Sans-Serif Body** (`font-sans`): `Plus Jakarta Sans`, system-ui
  - Used for: Navigation links, body copy, pricing numbers, product metadata, weight selector dropdowns, button labels, and footer text.

---

## 4. Complete File Tree & Architecture

```text
Anurag Project/
├── public/
│   └── images/                     # Cropped, high-fidelity brand assets from mockup
│       ├── banner-pulses.jpg
│       ├── banner-rice.jpg
│       ├── blog-basmati.jpg
│       ├── blog-pulses.jpg
│       ├── blog-dryfruits.jpg
│       ├── blog-millets.jpg
│       ├── cat-rice.jpg
│       ├── cat-pulses.jpg
│       ├── hero-bg.jpg
│       ├── hero-food.jpg
│       └── logo.png
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css             # Tailwind v4 setup, custom scrollbars, animations
│   │   ├── layout.tsx              # Google Fonts configuration & metadata
│   │   ├── page.tsx                # Main homepage with default category selection & hero carousel
│   │   └── products/
│   │       └── [id]/
│   │           ├── page.tsx        # Server component with generateStaticParams & Suspense
│   │           └── ProductDetailClient.tsx # Client PDP with multi-image gallery & tabs
│   ├── components/
│   │   ├── BestSellersSection.tsx  # Dynamic category filtered products with PDP links
│   │   ├── BlogSection.tsx         # 4 Blog cards with reading modal
│   │   ├── BrandLogo.tsx           # Scalable SVG logo (dark & light variants)
│   │   ├── BulkEnquiryModal.tsx    # Modal for B2B export & wholesale quotes
│   │   ├── CartDrawer.tsx          # Slide-over cart with free shipping meter
│   │   ├── CategorySection.tsx     # 7 Category cards with mobile swipe scroll & active state
│   │   ├── Footer.tsx              # 5-column footer + subfooter
│   │   ├── HeroSection.tsx         # Multi-slide interactive hero carousel with high-res photography
│   │   ├── LoginModal.tsx          # Mobile OTP sign-in / registration dialog
│   │   ├── Navbar.tsx              # Responsive navbar (desktop bar + mobile drawer)
│   │   ├── PromoBanners.tsx        # Side-by-side promotional banners with high-res images
│   │   ├── ToastNotification.tsx   # Real-time action feedback toasts
│   │   ├── TopBar.tsx              # Top contact numbers, rating, and socials
│   │   ├── TrackOrderModal.tsx     # Order tracking status & timeline dialog
│   │   └── WhyChooseUs.tsx         # 6 Value pillars with polygon icon badges
│   ├── context/
│   │   └── CartContext.tsx         # Global React context for cart, wishlist, and modals
│   ├── data/
│   │   └── mockData.ts             # 29 Detailed products across 7 categories with 3-4 images each
│   └── types/
│       └── index.ts                # TypeScript interfaces and data models
├── .gitignore
├── next.config.ts                  # Configured with images.unsplash.com remote pattern
├── package.json
├── PROJECT_CONTEXT.md              # <-- THIS CONTEXT FILE
├── README.md
└── tsconfig.json
```

---

## 5. Detailed Component Breakdown

### 1. `HeroSection.tsx` (Interactive Carousel)
- **Design**: Multi-slide interactive carousel featuring high-resolution photography of golden harvest landscapes, steaming long-grain basmati bowls, unpolished colorful pulses, and jumbo nuts.
- **Features**:
  - Autoplay (5.5s) with pause on hover
  - Previous / Next chevron controls over the visual frame
  - Slide indicator pills and fractional slide counter (`01 / 03`)
  - 4 Value Badges (`Naturally Sourced`, `Quality Assured`, `Rich in Nutrition`, `Export Quality`)
  - Floating quality seals: `"24-Month Aged"`, `"100% Chemical & Oil Free"`, `"Triple Sortex Inspected"`
  - CTAs: `SHOP PRODUCTS →` and `BULK / B2B ENQUIRY`.

### 2. `CategorySection.tsx` & Default Selection
- **First Category Always Selected**: The first category (`"Rice"`) is selected by default on initial page load.
- **Card Highlighting**: Active category displays a 2px forest green border, emerald background tint, slight elevation, and an `"Active"` badge.
- **Mobile Responsive**: Horizontal swipeable scroll container with snap-points on mobile, transitioning to a 4-column grid on tablet, and 7 columns on desktop.

### 3. `BestSellersSection.tsx`
- **Dynamic Category Filtering**: Synchronized with `CategorySection`. Selecting any category updates the product cards displayed.
- **Quick Category Filter Pills**: Allows switching categories directly above the product grid.
- **Interactive Card Controls**:
  - Image/Title click navigates directly to `/products/[product.id]`.
  - Dynamic weight selector dropdowns (`500g`, `1 Kg`, `2 Kg`, `5 Kg`) update prices in real time.
  - Wishlist toggle heart and Quick View eye icon.
  - `ADD TO CART` and `BUY NOW` buttons.

### 4. `src/app/products/[id]/` (Product Detail Page - PDP)
- **Routing**: Static Generation via `generateStaticParams` for all 29 products.
- **Multi-Image Gallery**:
  - Main active display with 4:3 aspect ratio and smooth zoom on hover.
  - At least 3 to 4 high-resolution thumbnail selectors showing grain textures, raw commodities, cooked dishes, and harvest fields.
  - Active thumbnail border highlight and image counter badge (`1 / 4`).
- **Purchase Panel**:
  - Title, category badge, and farm origin tag.
  - Star ratings with review count.
  - Dynamic Pack Size selector pills updating price, crossed-out original price, and savings badge in real time.
  - Quantity counter (`-` `[1]` `+`).
  - Action buttons: `ADD TO CART` and `BUY NOW`.
  - Trust badges: Free shipping over ₹500, unadulterated purity, NABL lab tested, and nitrogen-flushed packaging.
  - B2B Bulk Enquiry button for commercial buyers (triggers `BulkEnquiryModal`).
- **Tabbed Specifications**:
  - **Description & Heritage**: Farm story, harvesting methods, key highlights.
  - **Nutritional Facts**: Per 100g table (Calories, Protein, Fiber, Iron, Calcium, Healthy Fats).
  - **Quality & Lab Parameters**: Moisture %, foreign matter %, broken grains, shelf life.
  - **Verified Customer Reviews**: Customer reviews with verified buyer badges.
- **Related Products Section**: 4 related products from the same category with quick navigation.

---

## 6. TypeScript Data Models (`@/types`)

```typescript
export interface ProductWeightOption {
  label: string;
  price: number;
  originalPrice: number;
  discount: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  defaultPrice: number;
  defaultOriginalPrice: number;
  defaultDiscount: string;
  rating: number;
  reviewsCount: number;
  image: string; // primary image
  images: string[]; // at least 3-4 high-res gallery images
  options: ProductWeightOption[];
  inStock?: boolean;
  description: string;
  origin?: string;
  features?: string[];
  nutritionalFacts?: Record<string, string>;
  purityParameters?: Record<string, string>;
  tag?: string;
}
```

---

## 7. Development Commands

```bash
# Install dependencies
npm install

# Run development server (runs on http://localhost:3000)
npm run dev

# Run production build (validates TypeScript & Turbopack)
npm run build

# Start production server
npm run start
```
