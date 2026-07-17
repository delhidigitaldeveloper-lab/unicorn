# Unicon Infra — Premium Luxury Real Estate Website + Admin Panel

A production-ready, multi-page luxury real estate website built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, React
Three Fiber, and Swiper — with a **custom admin panel** for managing every
piece of content on the site, backed by a lightweight file-based data store
(no external database server required).

## ✅ What's included

**13 public pages:**
- `/` — Home: video hero (with 3D gold-particle overlay), About, Featured
  Projects, Cinematic Video Showcase, Why Choose Us, Stats, Amenities
  Highlight (tabbed), Investment Benefits, Awards & Accolades marquee,
  Testimonials carousel, Brochure Download CTA, Blog preview, Contact CTA
- `/about` — Story, mission/vision, milestones timeline, leadership team
- `/projects` — Filterable project grid (category filters)
- `/projects/[slug]` — Full project details: gallery + lightbox, amenities,
  specifications, Google Map, enquiry form, related projects
- `/services` — Services grid + process timeline
- `/gallery` — Filterable masonry gallery with lightbox
- `/blog` — Blog listing
- `/blog/[slug]` — Blog details + related posts
- `/faqs` — Animated accordion
- `/contact` — Contact form, info cards, Google Map embed
- `/privacy-policy`, `/terms-conditions` — Full legal copy
- `404` — Custom luxury not-found page

**Admin panel at `/admin`:**
- Dashboard with content counts and quick links
- **Projects** — full CRUD: pricing, amenities, specs, gallery, map coordinates
- **Blog Posts** — full CRUD with publish/draft toggle
- **Team Members** — full CRUD with photo upload
- **Testimonials** — full CRUD with star rating
- **Gallery** — upload and categorize public gallery images
- **Form Submissions** — view/manage Contact, Site Visit and Brochure
  requests submitted from the public site
- **SEO Settings** — per-page meta title, description, keywords and social
  share image, for every page on the site
- **Site Settings** — logo, site icon, tagline, contact info, and social
  media links (Instagram, Facebook, LinkedIn, YouTube)
- Secure cookie-based login (see **Admin Panel Setup** below)

**Design system:**
- Black (#000000) + Luxury Gold (#C8A96A) palette, white typography
- Dark glassmorphism cards, gold borders & hover glow, cinematic loader,
  custom magnetic cursor, scroll reveals, parallax, 3D hero particles

## 🚀 Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin` for the admin panel.

To build for production:

```bash
npm run build
npm run start
```

> **Note:** `npm run build` requires internet access to fetch Google Fonts
> (Playfair Display & Inter) at build time. This is expected — Next.js's
> `next/font/google` self-hosts fonts during the build, so no client-side
> requests to Google are ever made in production.

## 🔐 Admin Panel Setup

The admin panel is protected by a simple, secure email/password login —
no third-party auth service required.

1. Copy `.env.example` to `.env` (already done above).
2. **Default login** (change before deploying anywhere public):
   - Email: `admin@uniconinfra.com`
   - Password: `Admin@123`
3. To set your own password:
   ```bash
   node scripts/hash-password.js "yourNewPassword"
   ```
   Paste the printed hash into `.env` as `ADMIN_PASSWORD_HASH`, and set
   `ADMIN_EMAIL` to your own email.
4. Set `AUTH_SECRET` to a long random string:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

**Important gotcha if editing `.env` by hand:** bcrypt hashes contain `$`
characters (e.g. `$2a$10$...`). Next.js's env loader treats `$NAME` as a
variable reference, so a raw hash can get silently corrupted. Escape every
`$` as `\$` in `.env` (the committed `.env.example` already does this
correctly) — or safer still, just use the `hash-password.js` script output
directly without retyping it.

Sessions are signed JWTs (via `jose`) stored in an httpOnly cookie, verified
on every request to `/admin/*` and `/api/admin/*` by `middleware.ts`.

## 📦 How content storage works

There's no external database to provision. All admin-managed content lives
in flat JSON files under **`/data`**:

```
data/
  projects.json       # Projects
  blog.json           # Blog posts
  team.json           # Team members
  testimonials.json   # Testimonials
  gallery.json        # Gallery images
  submissions.json    # Contact / site-visit / brochure form submissions
  settings.json       # Site name, icon, contact info, social links
  seo.json            # Per-page SEO metadata
```

The admin panel reads and writes these files through typed functions in
`lib/db/repositories.ts`. Public pages call the same functions server-side
(e.g. `getAllProjects()`), so anything you change in the admin panel appears
on the live site immediately — no rebuild or redeploy needed. Pages that
read this data are marked `export const dynamic = "force-dynamic"` so
Next.js always renders them fresh rather than caching a stale build.

This approach is intentionally simple (no Postgres/MySQL/Prisma to run),
but it's still just files — if you outgrow it, `lib/db/repositories.ts` is
a thin, swappable layer: point those same function signatures at a real
database later without touching any page or component code.

**Deploying to serverless platforms (e.g. Vercel):** serverless filesystems
are typically read-only/ephemeral outside of the request that wrote them,
so writes to `/data` and `/public/uploads` may not persist across deploys
or between server instances. This setup is best suited to a persistent
Node host (a VPS, Docker container, Railway, Render, etc. running
`npm run build && npm run start`). If you need serverless, swap the JSON
file store for a real database and the upload route for object storage
(S3, Cloudinary, etc.) — the repository functions are structured to make
that swap isolated to `lib/db/`.

## 🖼️ Image uploads

The admin panel's image uploader (used for project photos, team headshots,
gallery images, the site icon, etc.) saves files to `public/uploads/` via
`app/api/admin/upload/route.ts`, accepting JPG/PNG/WEBP/GIF/ICO up to 8MB.
You can also just paste an external image URL instead of uploading — both
work everywhere images are used.

## 🎬 Adding Your Hero & Showcase Videos

Drop these two files in and they're picked up automatically (no code
changes needed):

```
public/videos/hero.mp4       # Home page hero background
public/videos/showcase.mp4   # Cinematic showcase section
```

See `public/videos/README.md` for recommended specs/compression. Until
added, both sections gracefully fall back to a static poster image.

## 📁 Folder Structure

```
app/
  (site)/                 # All public-facing pages (route group)
    about/ projects/[slug]/ services/ gallery/ blog/[slug]/
    faqs/ contact/ privacy-policy/ terms-conditions/
    layout.tsx            # Public root layout (navbar, footer, loader, cursor)
    page.tsx               # Home page
  admin/                  # Admin panel (separate root layout, no public nav/footer)
    login/                 # Login page (outside the sidebar shell)
    (dashboard)/           # Sidebar-wrapped admin pages (route group)
      projects/ blog/ team/ testimonials/ gallery/ submissions/ seo/ settings/
  api/
    admin/                 # Protected CRUD + auth + upload endpoints
    contact/               # Public endpoint used by all site forms
  globals.css              # Design tokens & utility classes
  sitemap.ts / robots.ts
  middleware.ts             # Protects /admin and /api/admin routes

components/
  layout/                 # Navbar, Footer, PageLoader, CursorEffect
  ui/                     # Button, GlassCard, SectionHeading, Counter, PageHero, FAQAccordion
  home/                   # Hero, HeroScene (R3F), VideoShowcase, AmenitiesHighlight, etc.
  projects/ blog/ gallery/ contact/
  admin/                  # Sidebar, DataTable, ImageUploader, FormField, forms/*

lib/
  types.ts                # Shared TypeScript interfaces
  data.ts                 # Static content not managed by the admin (nav links, FAQs, stats, services)
  auth.ts / auth-constants.ts
  admin/api.ts            # Client-side fetch helper for the admin panel
  db/
    store.ts               # Generic JSON file read/write layer
    repositories.ts         # Typed CRUD functions per content type

data/                     # JSON content files (see "How content storage works")
scripts/hash-password.js  # CLI to generate a new admin password hash
```

## 🔧 What's still static (by design)

Navigation links, the Services list, homepage Stats, and FAQs remain
hardcoded in `lib/data.ts` since they weren't part of the requested
admin-managed content types. They follow the exact same repository pattern
as everything else — if you'd like them editable too, add a JSON file +
repository functions following `lib/db/repositories.ts` as a template, and
an admin page following any of the existing `app/admin/(dashboard)/*` pages.

## 🗺️ Google Maps

`MapEmbed.tsx` uses a keyless Google Maps iframe embed (no API key
required). For advanced map features (custom markers, styling, directions),
swap in the official `@react-google-maps/api` package with your own API key.

## 🎨 Extending animations

Framer Motion handles scroll reveals and transitions throughout. GSAP is
installed and ready to use for more advanced timeline-based or
ScrollTrigger-driven sequences if you want to layer it in.
