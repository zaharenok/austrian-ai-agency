# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Standard Next.js build
- `npm run build:static` - Build for static export (automatically: disables middleware, generates static pages, runs copy script, restores config)
- `npm run build:server` - Build for server deployment (swaps to server config)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

### Build Process Details

**Static Build (`npm run build:static`)** executes:
1. Generate blog pages via `scripts/generate-blog-pages.ts`
2. Swap to `next.config.static.ts` (enables `output: 'export'`)
3. Temporarily disable middleware (rename `src/middleware.ts` → `src/middleware.ts.disabled`)
4. Run `next build`
5. Copy generated HTML pages via `scripts/copy-static-pages.sh` (from `.next/server/app/` to `out/`)
6. Restore middleware and config

Output: `out/` directory with static files + `hostinger-deploy.zip`

## Architecture Overview

This is a **multilingual Next.js 15 website** for Austrian AI Agency with the following key architectural decisions:

### Internationalization (i18n)
- **Supported locales**: English (`en`), German (`de`), Russian (`ru`)
- **Default locale**: English (`en`)
- **Routing**: Locale-based routing via `[locale]` dynamic segments (e.g., `/en/contact`, `/de/contact`)
- **Translations**: JSON files in `src/locales/{locale}/common.json`
- **Implementation**: Custom context-based i18n system using `TranslationsProvider` and `useTranslations` hook
- **Locale Detection**:
  - **Development/Server**: `src/middleware.ts` - server-side detection from Accept-Language header and cookie
  - **Static Export**: `public/index.html` + `src/app/page.tsx` - client-side JavaScript redirect based on browser language

### Project Structure
- **App Router**: Next.js 15 app directory with `[locale]` dynamic segments
- **Pages**:
  - `src/app/page.tsx` - Root redirect page (client-side locale detection)
  - `src/app/[locale]/page.tsx` - Locale-specific home page
  - `src/app/[locale]/contact/page.tsx` - Contact page
  - `src/app/[locale]/energyconsume/page.tsx` - Energy community landing page
- **UI Components**: Located in `src/components/ui/` with custom animated components
- **Styling**: Tailwind CSS v4 with custom color palette (`spektr-cyan`) and animations
- **Context**: Custom translations context in `src/context/language-context.tsx`
- **Hooks**:
  - `use-scroll-boundary.ts` - Scroll boundary detection
  - `use-auto-scroll.ts` - Auto-scroll for chat components

### Key Features
- **Animated UI**: Custom aurora backgrounds, moving borders, gradient buttons with Framer Motion
- **Chat Interface**: Interactive expandable chat components with auto-scroll functionality
- **Contact Forms**: Multilingual contact forms with N8N webhook integration
- **Energy Community Page**: Three-step funnel (Pain → Introduction → Solution) with direct redirect to Bitly link
- **Theme Support**: Dark mode support configured in Tailwind

### Configuration Notes
- **Build flexibility**: Multiple Next.js configs (static/server) for different deployment scenarios
  - `next.config.ts` - Active config (automatically swapped by build scripts)
  - `next.config.static.ts` - Static export config (`output: 'export'`, trailing slashes, unoptimized images)
  - `next.config.server.ts` - Server deployment config
- **Images**: Unoptimized images enabled for static deployments
- **Error handling**: Build errors and ESLint ignored for deployment
- **Middleware**:
  - Works in development and server builds (`src/middleware.ts`)
  - Disabled during static builds (automatically renamed to `.disabled`)
  - Static builds use client-side redirect via `public/index.html`
- **Static Page Copying**: Script `scripts/copy-static-pages.sh` copies generated HTML from `.next/server/app/` to `out/` after build

### Development Workflow
- Uses TypeScript with React 19
- Tailwind CSS v4 with custom animations and color variables
- Custom UI components with consistent styling patterns
- Responsive design with container-based layouts

### Chat Integration
- **N8N Webhook**: Chat messages are sent to `https://n8n.aaagency.at/webhook/1eac4cc6-3cc6-4455-b740-73cd625f87e0`
- **Implementation**: Direct N8N webhook integration in chat components (no API routes in static build)
- **Components**: `enhanced-chat-bubble.tsx` and `expandable-chat.tsx` in `src/components/ui/`
- **Features**: Auto-scroll with scroll isolation, animated messages, language-aware messaging
- **Response Format**: N8N responses expected in format `[{"output": "response text"}]` or `{"output": "response text"}`
- **Fallback**: Default response shown if N8N webhook fails

## Deployment Options

### Static Hosting (Shared Hosting - Hostinger, Netlify, etc.)

**Build Command:**
```bash
npm run build:static
```

**Output:** `out/` directory + `hostinger-deploy.zip`

**What Works:**
- ✅ Client-side locale detection (JavaScript redirect)
- ✅ All pages in 3 languages
- ✅ Contact forms with N8N webhooks
- ✅ Energy Community funnel page
- ✅ Animations and UI components

**Limitations:**
- ⚠️ No server-side middleware
- ⚠️ Slight delay on first visit (JavaScript must load)
- ⚠️ SEO: root page shows loading screen to crawlers

**Deployment:**
1. Upload contents of `out/` to `public_html/`
2. Ensure `.htaccess` is present for SPA routing
3. Alternative: Use `hostinger-deploy.zip` (upload and extract)

See `DEPLOY.md` for detailed Hostinger instructions.

### Server Deployment (VPS with Node.js)

**Build Command:**
```bash
npm run build:server
```

**Output:** `.next/` directory

**What Works:**
- ✅ Server-side middleware with Accept-Language detection
- ✅ All static export features
- ✅ Better SEO (server-side redirects)
- ✅ Full Next.js features

**Deployment:**
1. Clone repository on VPS
2. Install dependencies: `npm install`
3. Build: `npm run build:server`
4. Run with PM2:
   ```bash
   pm2 start npm --name "aaa-website" -- start
   pm2 startup && pm2 save
   ```
5. Configure Nginx reverse proxy to port 3000

## Important Patterns and Conventions

When working with this codebase:

### Internationalization
- **Always consider multilingual support** when adding new content
- Use the custom `useTranslations` hook from `src/context/language-context.tsx` for all text content
- Add translations to all three locale files: `src/locales/{en,de,ru}/common.json`
- Respect the locale-based routing structure `[locale]` when adding new pages
- Translation keys use dot notation: `t('section.subsection.key')`

### Component Development
- Follow existing component patterns in `src/components/ui/`
- Use Framer Motion for animations (already imported in key components)
- Apply custom Tailwind classes: `spektr-cyan` color palette, `aurora` animation
- Implement responsive design with Tailwind container utilities
- Use `cn()` utility from `@/lib/utils` for conditional class merging

### Styling and Animations
- Custom CSS variables defined in Tailwind config via `addVariablesForColors` plugin
- Scrolling components should use `overscroll-behavior: contain` and `.chat-container` class
- Auto-scroll functionality available via `use-auto-scroll.ts` hook
- Dark mode support via `data-theme="dark"` attribute

### Static vs Server Builds
- **Static builds** (`npm run build:static`):
  - Output: `out/` directory with static HTML/CSS/JS
  - No middleware, API routes, or server-side features
  - Client-side locale detection via JavaScript
  - Ideal for: Shared hosting (Hostinger, Netlify, etc.)
- **Server builds** (`npm run build:server`):
  - Output: `.next/` directory for Node.js server
  - Full Next.js features including middleware
  - Server-side locale detection and redirects
  - Ideal for: VPS, cloud platforms with Node.js support

### Adding New Pages
When creating new pages:
1. Create page in `src/app/[locale]/your-page/page.tsx`
2. Add client component in `src/app/[locale]/your-page/your-page-client.tsx`
3. Add translations to all locale files: `src/locales/{en,de,ru}/common.json`
4. Update `generateStaticParams()` to include all locales
5. Update `scripts/copy-static-pages.sh` if adding pages for static build
6. Test in development: `npm run dev`
7. Test static build: `npm run build:static` and check `out/` directory