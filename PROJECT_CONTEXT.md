# Project Context & AI Handover Guide

> **Project Name**: YOUR BRAND — Pure Food. Better Life. (Agro E-Commerce & B2B Export Platform)  
> **Repository**: [https://github.com/Anekantjainsagar/Anurag-Project.git](https://github.com/Anekantjainsagar/Anurag-Project.git)  
> **Status**: Production-ready frontend implementation with responsive Next.js 16, TypeScript, and Tailwind CSS v4.  
> **Primary Goal for Successor AI**: Pick up this codebase seamlessly, maintain visual and design fidelity with the reference brand mockup, and continue adding full-stack features (auth, database, payment gateway, backend APIs).

---

## 1. Executive Summary & Brand Overview

This application is an e-commerce and B2B wholesale platform for a premium agricultural brand specializing in pure, farm-sourced staple commodities:
- **Product Lines**: Traditional Basmati & Non-Basmati Rice, Unpolished Pulses (Dals), California & Hand-Selected Dry Fruits, Ancient Millets, Cold-Pressed Seeds, and Pure Spices.
- **Brand Identity**:
  - **Emblem**: Elegant dual-leaf green sprout with a modern golden accent.
  - **Headline**: "YOUR BRAND" / "PURE FOOD. BETTER LIFE."
  - **Tone**: Heritage, purity, natural farming, export-quality standard, trustworthy, hygienic.
  - **Audience**: Dual market — direct-to-consumer (D2C) households seeking unadulterated staples, and global B2B/institutional buyers seeking bulk contract supply.

---

## 2. Technical Stack

| Technology | Version | Purpose / Notes |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16.4.0** | App Router architecture, Turbopack enabled, Partial Prefetching |
| **Language** | **TypeScript 5** | Fully typed interfaces in `@/types` |
| **UI Styling** | **Tailwind CSS v4** | Utilizes `@import "tailwindcss"` and modern `@theme inline` |
| **Icons** | **Lucide React** (`^1.56.0`) | Crisp feather-style SVG iconography |
| **Typography** | Google Fonts | `Playfair Display` (Headings & Serif accents) + `Plus Jakarta Sans` (Body & UI) |
| **State Management**| React Context API | `CartContext` for cart, wishlist, notifications, modals |
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
  - Used for: Brand name in logo, Hero titles ("PURE QUALITY. PREMIUM TASTE."), section titles ("Shop by Category", "Our Best Sellers", "Why Choose Our Products", "From Our Blog"), and promo banners.
- **Sans-Serif Body** (`font-sans`): `Plus Jakarta Sans`, system-ui
  - Used for: Navigation links, body copy, pricing numbers, product metadata, weight selector dropdowns, button labels, and footer text.

---

## 4. Complete File Tree & Architecture

```text
Anurag Project/
├── public/
│   └── images/                     # Cropped, high-fidelity brand assets from mockup
│       ├── banner-pulses.jpg       # Promo banner right visual
│       ├── banner-rice.jpg         # Promo banner left visual
│       ├── blog-basmati.jpg        # Blog card 1
│       ├── blog-pulses.jpg         # Blog card 2
│       ├── blog-dryfruits.jpg      # Blog card 3
│       ├── blog-millets.jpg        # Blog card 4
│       ├── cat-rice.jpg            # Category circle 1
│       ├── cat-pulses.jpg          # Category circle 2
│       ├── cat-dry-fruits.jpg      # Category circle 3
│       ├── cat-millets.jpg         # Category circle 4
│       ├── cat-seeds.jpg           # Category circle 5
│       ├── cat-spices.jpg          # Category circle 6
│       ├── cat-other-items.jpg     # Category circle 7
│       ├── hero-bg.jpg             # Panoramic mountain & farm background
│       ├── hero-food.jpg           # Foreground arrangement of grain bowls & nuts
│       ├── prod-basmati-rice.jpg   # Best seller product 1
│       ├── prod-toor-dal.jpg       # Best seller product 2
│       ├── prod-almonds.jpg        # Best seller product 3
│       └── prod-green-moong.jpg    # Best seller product 4
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css             # Tailwind v4 setup, custom scrollbars, animations
│   │   ├── layout.tsx              # Google Fonts configuration & metadata
│   │   └── page.tsx                # Main assembly page with CartProvider & state
│   ├── components/
│   │   ├── BestSellersSection.tsx  # 4 Best seller product cards with weight selector
│   │   ├── BlogSection.tsx         # 4 Blog cards with reading modal
│   │   ├── BrandLogo.tsx           # Scalable SVG logo (dark & light variants)
│   │   ├── BulkEnquiryModal.tsx    # Modal for B2B export & wholesale quotes
│   │   ├── CartDrawer.tsx          # Slide-over cart with free shipping meter
│   │   ├── CategorySection.tsx     # 7 Category cards with mobile swipe scroll
│   │   ├── Footer.tsx              # 5-column footer + subfooter
│   │   ├── HeroSection.tsx         # Hero banner, 4 feature pills, CTAs, carousel
│   │   ├── LoginModal.tsx          # Mobile OTP sign-in / registration dialog
│   │   ├── Navbar.tsx              # Responsive navbar (desktop bar + mobile drawer)
│   │   ├── PromoBanners.tsx        # Side-by-side promotional banners
│   │   ├── ToastNotification.tsx   # Real-time action feedback toasts
│   │   ├── TopBar.tsx              # Top contact numbers, rating, and socials
│   │   ├── TrackOrderModal.tsx     # Order tracking status & timeline dialog
│   │   └── WhyChooseUs.tsx         # 6 Value pillars with polygon icon badges
│   ├── context/
│   │   └── CartContext.tsx         # Global React context for cart, wishlist, and modals
│   ├── data/
│   │   └── mockData.ts             # Products, categories, blog posts, and features
│   └── types/
│       └── index.ts                # TypeScript interfaces and data models
├── .gitignore
├── next.config.ts
├── package.json
├── PROJECT_CONTEXT.md              # <-- THIS CONTEXT FILE
├── README.md
└── tsconfig.json
```

---

## 5. Detailed Component Breakdown

### 1. `TopBar.tsx`
- **Location**: Topmost sticky/fixed announcement bar (`bg-[#033b20]`).
- **Elements**:
  - Left: Phone numbers (`+91-87692 15905`) with `tel:` link and Email (`contact@yourbrand.com`) with `mailto:` link.
  - Center: Tagline `PREMIUM QUALITY • NATURALLY SOURCED • EXPORT QUALITY` (visible on desktop).
  - Right: Gold star rating pill `★★★★★ 4.8/5 Rating` and social icons (Facebook, Instagram, YouTube).
- **Responsive behavior**: On mobile screens, secondary items hide or condense without wrapping or causing horizontal overflow.

### 2. `BrandLogo.tsx`
- **Design**: Pure inline SVG vector graphic. Never gets pixelated or blurry at any scale or screen resolution.
- **Props**:
  - `variant`: `"dark"` (for white navbar) or `"light"` (for dark green footer).
  - `size`: `"sm" | "md" | "lg"`.
- **Styling**: Fluid Tailwind classes (`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9`) ensuring tight fit on small mobile screens.

### 3. `Navbar.tsx`
- **Breakpoints**:
  - **Desktop (`>= 1024px`)**: Brand logo, 6 nav links (`Home`, `All Products`, `Categories ⌵`, `Certifications`, `Track Order`, `Contact Us`), inline search bar with real-time dropdown results, wishlist heart with count badge, cart button with badge, and forest green "Login" pill.
  - **Tablet & Mobile (`< 1024px`)**: Prevents clutter. Shows Logo + Search icon toggle (which expands full-width search input) + Wishlist + Cart + Hamburger menu icon.
- **Off-Canvas Mobile Drawer**:
  - Full-featured mobile navigation drawer with backdrop blur.
  - Features: Sign In button, quick navigation links with icons, category grid chips with round thumbnails, and customer service contact details.

### 4. `HeroSection.tsx`
- **Typography**: Fluid scale `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#073f24]` with `leading-[1.08]`. Headings fit on small mobile screens (360px+) without awkward mid-word breaks.
- **4 Value Badges**:
  1. `Naturally Sourced` (Leaf icon)
  2. `Quality Assured` (Award icon)
  3. `Rich in Nutrition` (Sparkles/Wheat icon)
  4. `Export Quality` (Globe icon)
- **CTA Actions**:
  - Primary: `SHOP PRODUCTS →` (Smooth scroll to `#best-sellers`).
  - Secondary: `BULK / B2B ENQUIRY` (Opens `BulkEnquiryModal`).
- **Carousel Controls**: 3 interactive slide dots with auto-switching text content.

### 5. `CategorySection.tsx`
- **Categories**: 7 cards matching mockup: Rice, Pulses, Dry Fruits, Millets, Seeds, Spices, Other Items.
- **Responsive layout**:
  - Mobile: Smooth horizontal swipeable container (`overflow-x-auto scrollbar-none`) with snap cards so all 7 remain legible and tidy.
  - Tablet: 4-column grid (`sm:grid-cols-4`).
  - Desktop: 7-column grid (`lg:grid-cols-7`).
- **Interactivity**: Clicking any category filters the Best Sellers section and smoothly scrolls to it.

### 6. `BestSellersSection.tsx`
- **Product Cards**:
  1. `Premium Long Grain Basmati Rice` (₹120.00 / ₹140.00, 14% Off)
  2. `Toor Dal (Arhar Dal)` (₹95.00 / ₹110.00, 14% Off)
  3. `California Almonds` (₹320.00 / ₹380.00, 16% Off)
  4. `Green Moong Dal` (₹110.00 / ₹130.00, 15% Off)
- **Interactive Weight Selector**: Each product has multiple pack size options (`500g Sample`, `1 Kg Pack`, `5 Kg Bag`, etc.). Changing the selection dynamically updates the price, crossed-out original price, and savings badge in real time.
- **Action Buttons**: `ADD TO CART` (adds item to cart drawer, updates badge, shows toast) and `BUY NOW` (adds item and opens cart drawer for immediate checkout).

### 7. `PromoBanners.tsx`
- **Dual Grid**:
  - Banner 1: *Premium Rice Collection* (`Basmati | Sella | Non-Basmati | Specialty Rice`) + `EXPLORE RICE →`.
  - Banner 2: *Pulses & Dry Fruits* (`Pulses | Dry Fruits | Millets | Seeds`) + `EXPLORE COLLECTION →`.
- **Layout**: Stacked on mobile (`grid-cols-1`), side-by-side on desktop (`md:grid-cols-2`).

### 8. `WhyChooseUs.tsx`
- 6 value cards with geometric icon badges:
  1. *Naturally Sourced* — From trusted farms
  2. *Premium Quality* — Carefully selected and graded
  3. *Quality Tested* — Hygienically processed
  4. *Rich in Nutrition* — Healthy food for a better life
  5. *Secure Packaging* — Freshness and safety
  6. *Global Export* — Bulk supply and worldwide delivery

### 9. `BlogSection.tsx`
- 4 articles with dates:
  1. *How to Choose the Best Basmati Rice* (10 Apr 2026)
  2. *Health Benefits of Pulses in Everyday Diet* (05 Apr 2026)
  3. *Top 5 Dry Fruits for a Healthy Lifestyle* (01 Apr 2026)
  4. *Different Types of Millets and Their Benefits* (28 Mar 2026)
- **Modal**: Clicking an article card opens an interactive reading modal with purity tips and read time.

### 10. `Footer.tsx`
- **Layout**: 12-column responsive layout (`sm:grid-cols-2 lg:grid-cols-12`).
- **5 Columns**:
  1. Brand story + Light SVG logo + Social media links.
  2. Contact info (Phone, Email, physical warehouse address in Indore, M.P. India).
  3. Site navigation links with hover arrow transforms.
  4. Product category quick links.
  5. Newsletter subscription form with live validation + Payment badges (`VISA`, `Mastercard`, `UPI`, `RuPay`, `AMEX`).
- **Sub-footer**: Copyright, policy links (Privacy, Terms, Shipping, Return), and "Designed with ❤️ for Better Food & A Healthier Life."

### 11. Interactive Modals & Drawers
- **`CartDrawer.tsx`**: Slide-over cart drawer with quantity counter (`+` / `-`), trash removal, live free shipping progress bar (e.g., "Add ₹180 more for FREE Delivery!"), discount calculation, and checkout simulator.
- **`BulkEnquiryModal.tsx`**: Enterprise B2B form with fields for Company Name, Volume (up to 25 Metric Tonne containers), Destination Port, and Special Packaging Requirements.
- **`LoginModal.tsx`**: Mobile phone OTP authentication simulator.
- **`TrackOrderModal.tsx`**: Order tracking with interactive order ID input (`YB-8921-IN`) and milestone shipment timeline (Farm Packed -> Dispatched -> Out for Delivery -> Delivered).
- **`ToastNotification.tsx`**: Real-time feedback banner sliding into view on cart and wishlist updates.

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
  image: string;
  options: ProductWeightOption[];
  inStock?: boolean;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  readTime: string;
  summary: string;
}

export interface WhyChooseFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  weight: string;
  image: string;
  quantity: number;
}
```

---

## 7. State Management Guidelines (`CartContext.tsx`)

`CartContext` persists items to `localStorage` under keys `yourbrand_cart` and `yourbrand_wishlist`.

Exposed API:
- `cartItems: CartItem[]`
- `cartCount: number`
- `cartTotal: number`
- `originalTotal: number`
- `totalSavings: number`
- `addToCart(product, option?, quantity?)`
- `removeFromCart(cartLineId)`
- `updateQuantity(cartLineId, quantity)`
- `clearCart()`
- `isCartOpen / setIsCartOpen`
- `wishlist / toggleWishlist / isInWishlist`
- `isBulkModalOpen / setIsBulkModalOpen`
- `isLoginModalOpen / setIsLoginModalOpen`
- `isTrackModalOpen / setIsTrackModalOpen`
- `toastMessage / showToast`

---

## 8. Common Tasks & Roadmap for Next AI

When continuing this project, consider tackling these prioritized tasks:

### Priority 1: Backend & Database Connection
- Connect a PostgreSQL / MongoDB / Supabase database.
- Create Prisma or Drizzle ORM schemas based on the types in `@/types/index.ts`.
- Replace `@/data/mockData.ts` with API route handlers or Server Actions (`/api/products`, `/api/categories`, `/api/enquiry`).

### Priority 2: Real Payment Gateway Integration
- Integrate **Razorpay** or **Cashfree** for Indian domestic payments (UPI, RuPay, NetBanking, Cards).
- Integrate **Stripe** for international cross-border orders and export invoicing.

### Priority 3: Product Detail Pages (PDP) & Categories (PLP)
- Add dynamic routes:
  - `src/app/products/[id]/page.tsx` for full product specifications, lab purity reports, nutritional breakdown tables, customer reviews, and cooking guides.
  - `src/app/categories/[slug]/page.tsx` for filtered category listing.

### Priority 4: Authentication & Customer Account
- Integrate NextAuth.js (Auth.js) or Supabase Auth.
- Implement real SMS OTP verification (Twilio / MSG91) for Indian mobile numbers.
- Add an Order History dashboard.

### Priority 5: B2B CRM / Lead Storage
- Connect the `BulkEnquiryModal` submission to email notifications (Resend / SendGrid) and write leads to a CRM or Google Sheets webhook.

---

## 9. Development Commands

```bash
# Install dependencies
npm install

# Run development server (runs on http://localhost:3000)
npm run dev

# Run production build (validates TypeScript & Turbopack)
npm run build

# Start production server
npm run start

# Run ESLint check
npm run lint
```

---

*This document was prepared to ensure zero context loss when continuing development with any AI assistant or human developer.*
