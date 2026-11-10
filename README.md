# Habib Engineering — Corporate Website & Content Management System

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/license-proprietary-lightgrey?style=flat-square)

Official website for **Habib Engineering** (Lahore, Pakistan) — manufacturer of LV/MV switchgear, distribution transformers and cable management systems, and provider of turnkey electrical, MEP, solar and after-sales services.

The project is a full-stack Next.js application: a fast, SEO-friendly public website backed by a Supabase (PostgreSQL) database, plus a secured admin panel that lets the company manage its own content without a developer.

> **Brand tagline:** *A Sign of Trust* — *"When It Comes To Reliability, We Are The One You Need!"*

---

## Table of contents

1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project structure](#project-structure)
5. [Getting started](#getting-started)
6. [Environment variables](#environment-variables)
7. [Database](#database)
8. [Admin panel guide](#admin-panel-guide)
9. [Deployment](#deployment)
10. [Security](#security)
11. [Content & data sources](#content--data-sources)
12. [Troubleshooting](#troubleshooting)
13. [Scripts](#scripts)
14. [License & contact](#license--contact)

---

## Features

### Public website

| Area | What it provides |
| --- | --- |
| **Home** | Hero, certification trust bar, product categories, featured products, services, industries, featured projects, client sites, call-to-action |
| **About** | Company introduction, vision, mission, core values, group companies, certifications, "why choose us" |
| **Products** | Category pages and product detail pages driven by the database (image gallery, specifications table, features, related products, quote button) |
| **Services** | Turnkey solutions, MEP contracting, fire & security, solar, testing & commissioning (FAT/SAT/SIT), after-sales support — each with scope, process and FAQs |
| **Industries** | Oil & gas, power & energy, infrastructure, industrial, healthcare, education, defence & cantonments |
| **Projects & Clients** | Project portfolio with filters; client / project-site list (MES, FWO, CMH and others) |
| **Certifications** | ISO 9001, ISO 14001, ISO 45001 and approvals / registrations |
| **Blog** | Company news and technical articles |
| **Contact & Request a Quote** | Validated forms stored in the database, optional e-mail notifications, map and office details |
| **Search** | Site-wide full-text search (products, projects, articles) |
| **SEO** | Per-page metadata, Open Graph, dynamic `sitemap.xml` and `robots.txt`, JSON-LD (Organization / LocalBusiness) |
| **Responsive & accessible** | Mobile-first layout, keyboard-friendly navigation, semantic HTML |

### Admin panel (`/admin`)

- Secure sign-in with Supabase Auth; every `/admin` route is protected
- Role-based access (`admin`, `editor`)
- Dashboard with live counts and the latest inquiries / products
- Full create / edit / delete for **products, categories, projects, clients, certifications and blog posts**
- Image upload to Supabase Storage (product, project, blog and certificate images)
- **Inquiries inbox** for contact messages and quote requests, with status tracking and internal notes
- **Settings** — phone, e-mail, WhatsApp, addresses, working hours and social links (shown in header / footer / contact page)
- **Users** — invite staff accounts and change roles (admin only)

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions, `proxy.ts`) |
| UI | React 19, [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide](https://lucide.dev/) icons, Sonner toasts |
| Language | TypeScript (strict) |
| Database | [Supabase](https://supabase.com/) PostgreSQL with Row Level Security and full-text search |
| Auth | Supabase Auth (e-mail + password), cookie sessions via `@supabase/ssr` |
| Storage | Supabase Storage (public buckets, staff-only writes) |
| Validation | [Zod](https://zod.dev/) (client and server) |
| E-mail | [Resend](https://resend.com/) (optional) |
| Testing | Vitest |
| Hosting | Vercel + Supabase cloud |

Fonts: *Barlow Condensed* (headings) and *Inter* (body) via `next/font`.

---

## Architecture

```
                 ┌────────────────────────────────────────────┐
  Visitors ───►  │  Public pages (Server Components, ISR)      │
                 │  cookie-less anon Supabase client           │──►  RLS: anon can read
                 └────────────────────────────────────────────┘      ONLY active / published rows

                 ┌────────────────────────────────────────────┐
  Staff ──────►  │  /admin  (protected by src/proxy.ts)        │
                 │  Supabase client bound to the user session  │──►  RLS: staff policies
                 │  Server Actions for create/update/delete    │      (profiles.role = admin | editor)
                 └────────────────────────────────────────────┘

  Contact / quote forms ──► Server Action ──► anon INSERT only (no read access) ──► optional Resend e-mail
```

Key decisions

- **Public data never touches cookies**, so pages can be statically generated and revalidated (fast, CDN-friendly).
- **Security lives in the database.** Row Level Security is enabled on every table; the application code is a second line of defence, not the only one.
- **Anonymous visitors can only INSERT form submissions** — they can never read them.
- The **service-role key** is used only on the server, only for staff account management and the maintenance scripts.

---

## Project structure

```
.
├── public/
│   └── images/                 # logo, hero/factory photos, product & certificate images
├── src/
│   ├── app/
│   │   ├── (marketing)/        # public website routes
│   │   ├── (auth)/login/       # staff sign-in
│   │   ├── (admin)/admin/      # protected admin panel
│   │   ├── api/                # health + revalidate endpoints
│   │   ├── sitemap.ts · robots.ts · manifest.ts
│   │   └── layout.tsx · globals.css
│   ├── actions/                # Server Actions (contact, quote, CRUD, inquiries, settings, users)
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── site/               # public-site components (header, footer, cards, forms)
│   │   └── admin/              # admin shell, generic resource form & table
│   ├── config/site.ts          # company details & defaults (overridable in Admin → Settings)
│   ├── content/                # company, services, industries, catalogue text
│   ├── lib/
│   │   ├── supabase/           # server, public (anon), browser, admin (service role) clients
│   │   ├── admin/resources.ts  # declarative definition of every admin resource
│   │   └── queries.ts · email.ts · rate-limit.ts · seo.ts · utils.ts
│   ├── types/database.ts       # TypeScript types matching the SQL schema
│   └── proxy.ts                # session refresh + /admin protection
├── supabase/
│   ├── migrations/             # 001 → 006: tables, RLS, storage buckets, indexes & search
│   └── seed/                   # categories & products, clients, certifications, settings, descriptions
└── tests/                      # unit tests
```

---

## Getting started

### Prerequisites

- **Node.js 22 LTS or newer** (Supabase's current client libraries require Node ≥ 22)
- npm 10+
- A free [Supabase](https://supabase.com/) project
- Git

### 1. Clone and install

```bash
git clone https://github.com/KaifShahid-spec/habib-engineering-website.git
cd habib-engineering-website
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local      # Windows PowerShell: Copy-Item .env.example .env.local
```

Fill in the values described in [Environment variables](#environment-variables). In Supabase: *Project Settings → API Keys*.

### 3. Create the database

In Supabase → **SQL Editor**, run the files **in this order** (details in [Database](#database)):

1. `supabase/migrations/001_core_tables.sql` … `006_indexes_and_search.sql`
2. `supabase/seed/001_categories_products.sql` … `005_product_descriptions.sql`

> The seed files are **not** idempotent — run each seed file once.

### 4. Create the first administrator

1. Supabase → **Authentication → Users → Add user → Create new user**. Enter an e-mail and a strong password and tick **Auto Confirm User**.
2. In the SQL Editor (replace the e-mail and name):

```sql
insert into public.profiles (id, full_name, role)
select id, 'Your Name', 'admin'
from auth.users
where email = 'you@example.com';
```

3. Supabase → **Authentication → Sign In / Providers**: turn **off** *Allow new users to sign up*, so only invited staff can ever have accounts.

### 5. Run

```bash
npm run dev
```

- Website: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin> (redirects to `/login`)

---

## Environment variables

| Variable | Required | Description |
| --- | :---: | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | Anon / publishable key (safe for the browser — protected by RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | for staff management | Service-role / secret key. **Server only. Never expose it or commit it.** Needed by *Admin → Users* and maintenance scripts |
| `NEXT_PUBLIC_SITE_URL` | yes (production) | Public URL, e.g. `https://habibengineering.com` — used for metadata and the sitemap |
| `RESEND_API_KEY` | optional | Enables e-mail notifications for new inquiries |
| `EMAIL_FROM` | optional | Sender, e.g. `Habib Engineering <noreply@yourdomain.com>` (domain must be verified in Resend) |
| `EMAIL_TO` | optional | Where new-inquiry notifications are sent (defaults to the contact e-mail in Settings) |

Never commit `.env.local`. If a key is ever exposed, rotate it in the Supabase dashboard.

---

## Database

All SQL is in [`supabase/`](./supabase). **The migrations are the single source of truth for the schema**; `src/types/database.ts` mirrors them (update both together, or regenerate with `supabase gen types`).

| File | Purpose |
| --- | --- |
| `001_core_tables.sql` | `profiles`, `categories`, `products`, `projects`, `clients`, `certifications`, `updated_at` triggers |
| `002_content_tables.sql` | `blog_posts`, `settings` |
| `003_leads_tables.sql` | `contact_submissions`, `quote_requests`, `newsletter_subscribers` |
| `004_rls_policies.sql` | Row Level Security for every table, `is_staff()` / `is_admin()` helpers |
| `005_storage_buckets.sql` | Public-read buckets (`product-images`, `project-images`, `blog-images`, `certificates`, `company-docs`) with staff-only writes |
| `006_indexes_and_search.sql` | Indexes, full-text search columns, `search_site()` and `dashboard_stats()` functions |

Seed data: `001` categories & products, `002` clients, `003` certifications, `004` settings & featured projects, `005` product descriptions (only fills empty fields).

### Row Level Security summary

| Data | Anonymous visitor | Staff (`admin` / `editor`) |
| --- | --- | --- |
| Categories, products, projects, clients, certifications | read **active** rows | full access |
| Blog posts | read **published** posts | full access |
| Settings | read | full access |
| Contact messages, quote requests, newsletter | **insert only** | read / update (delete: admin) |
| Profiles | — | own profile; admins manage all |
| Storage buckets | read (public URLs) | upload / replace / delete |

### Useful checks

```sql
-- every table has RLS enabled
select tablename, rowsecurity from pg_tables where schemaname = 'public' order by 1;

-- seed counts
select (select count(*) from categories) as categories,
       (select count(*) from products)   as products,
       (select count(*) from clients)    as clients,
       (select count(*) from certifications) as certifications;
```

> The Supabase SQL Editor shows **"Success. No rows returned"** for every statement that does not return rows (create, insert, update). That message means the statement succeeded — use a `select` to see data.

---

## Admin panel guide

1. **Sign in** at `/login`. Your account must have a row in `profiles` (see step 4 above), otherwise you will see an "access" message.
2. **Products** → *Add product*: choose category, name, short/long description, specifications (name/value pairs), features, main image and gallery. Inactive products are hidden from the public site.
3. **Photos**: use the **Image** field (upload) on any record. Recommended: JPG/WebP, 1600–2400 px wide, under 1 MB. Name important files after the product slug.
4. **Inquiries**: open a message, change its status (*new → read → replied*) and add internal notes. Quote requests have their own statuses.
5. **Settings**: update phone, e-mail, WhatsApp, addresses, working hours and social links — changes appear in the header, footer and contact page.
6. **Users**: admins can create staff accounts and set a role (`admin` can manage users and delete inquiries; `editor` manages content).

Public pages are cached for a short time; changes made in the admin panel appear after the cache refreshes (admin saves also trigger revalidation).

---

## Deployment

**Vercel (recommended)**

1. Push the repository to GitHub and import it in Vercel (framework: Next.js is auto-detected).
2. Add the [environment variables](#environment-variables) in *Project → Settings → Environment Variables*.
3. In Supabase → **Authentication → URL Configuration** set *Site URL* to your production domain and add the Vercel preview/production URLs to *Redirect URLs*.
4. Connect the custom domain in Vercel and set `NEXT_PUBLIC_SITE_URL` to it.
5. Deploy. Verify `/api/health`, the homepage, a product page, the contact form and `/admin`.

**Pre-launch checklist**

- [ ] Site URL, e-mail and phone confirmed with the client
- [ ] Sign-ups disabled in Supabase Auth
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set only as a server environment variable
- [ ] Real product / factory photos uploaded (see [Content & data sources](#content--data-sources))
- [ ] Resend domain verified (if e-mail notifications are used)
- [ ] Google Search Console: submit `/sitemap.xml`

---

## Security

- **Row Level Security everywhere**; policies are defined in `004_rls_policies.sql`.
- **Route protection:** `src/proxy.ts` refreshes the session and redirects unauthenticated users away from `/admin`. The admin layout additionally verifies that the user has a staff profile.
- **Principle of least privilege:** the browser only ever holds the anon key; the service-role key never leaves the server.
- **Form hardening:** server-side Zod validation, length limits enforced again by database constraints, a honeypot field and per-IP rate limiting on public forms.
- **Security headers** (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.ts`.
- **Secrets:** `.env*` files are git-ignored. Do not commit keys, personal e-mails or user IDs to the repository.
- Disable public sign-ups in Supabase Auth; create staff accounts only from *Admin → Users* or the Supabase dashboard.

---

## Content & data sources

Company content comes from the **Habib Engineering Company Profile (2025)**, the existing habibengineering.com website and details supplied by the client. Only facts from those sources are used — **do not add claims (years in business, project counts, capacities, standards) that the client has not confirmed.**

Items to confirm with the client before launch:

- E-mail domain (`.com.pk` supplied by the client vs `.com` in the company profile) and the second phone number
- Factory address ("Missile Chowk" on the profile cover vs "Mezayal Chowk" on the ISO certificates)
- Product specifications (kVA / kV ratings, dimensions, applicable standards) from datasheets
- High-resolution product, factory and project photos (current images are extracted from the PDF and are low resolution)
- Certifications that are listed but not evidenced (ISO 17025) or time-limited (Engineer-in-Chief enlistment, shown as inactive until confirmed)
- Social media links and Google Maps location
- Blog articles and project details (scope, year, client)

---

## Troubleshooting

| Symptom | Likely cause & fix |
| --- | --- |
| `npm install` warns about unsupported engine | Upgrade to Node 22 LTS or newer (`node -v`) |
| Admin sign-in works but shows no access | The user has no row in `public.profiles` — run the insert in [step 4](#4-create-the-first-administrator) |
| Insert into `profiles` "succeeds" but nothing appears | No matching user in `auth.users` — create the user first, then re-run the insert; verify with `select count(*) from auth.users;` |
| Forms or products fail to save | Check `.env.local`, that all six migrations ran, and the browser/terminal error message |
| Images do not appear | Confirm the bucket is public and the record's image URL opens in a browser |
| Public pages show empty lists | Seed files not run, or the rows are marked inactive |
| Changes in admin appear late on the website | Pages are cached briefly; hard-refresh or wait for revalidation |

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run test` | Unit tests (Vitest) |

---

## License & contact

This is a private, proprietary project. All content, trademarks and logos belong to **Habib Engineering**. All rights reserved.

**Habib Engineering** — Plaza # 163/CC1, 1st Floor, T Block, DHA Phase 8, Lahore, Pakistan  
Factory: College Road, Khaki Shah Darbar, Township, Lahore  
Phone: 0326 84 42 292 · E-mail: info@habibengineering.com.pk

**Developer:** Kaif Shahid — [@KaifShahid-spec](https://github.com/KaifShahid-spec)
