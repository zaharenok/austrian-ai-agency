# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Standard Next.js build
- `npm run build:static` - Build for static export (swaps to static config, runs blog page generation script)
- `npm run build:server` - Build for server deployment (swaps to server config)
- `npm run build:zip` - Create deployment ZIP archive in deployment/ folder
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture Overview

This is a **multilingual Next.js 15 website** for Austrian AI Agency with the following key architectural decisions:

### Internationalization (i18n)
- **Supported locales**: English (`en`), German (`de`), Russian (`ru`)  
- **Default locale**: English (`en`)
- **Routing**: Locale-based routing via middleware (e.g., `/en/contact`, `/de/contact`)
- **Translations**: JSON files in `src/locales/{locale}/common.json`
- **Implementation**: Custom context-based i18n system using `TranslationsProvider` and `useTranslations` hook
- **Middleware**: Automatic locale detection from Accept-Language header and cookie persistence

### Project Structure
- **App Router**: Next.js 13+ app directory structure with `[locale]` dynamic segments
- **UI Components**: Located in `src/components/ui/` with custom animated components
- **Styling**: Tailwind CSS with custom color palette (`spektr-cyan`) and animations
- **Context**: Custom translations context in `src/context/language-context.tsx`

### Key Features
- **Animated UI**: Custom aurora backgrounds, moving borders, rainbow buttons with Framer Motion
- **Chat Interface**: Interactive expandable chat components with auto-scroll functionality
- **Contact Forms**: Multilingual contact forms with API integration
- **Theme Support**: Dark mode support configured in Tailwind

### Configuration Notes
- **Build flexibility**: Multiple Next.js configs (static/server) for different deployment scenarios
  - `next.config.ts` - Main config (automatically swapped by build scripts)
  - `next.config.static.ts` - Static export config (output: 'export', trailing slashes, unoptimized images)
  - `next.config.server.ts` - Server deployment config
- **Images**: Unoptimized images enabled for static deployments
- **Error handling**: Build errors and ESLint ignored for deployment (configured in next.config.ts)
- **Middleware**: Automatic locale detection and redirection (src/middleware.ts) - does not work in static export

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

## Deployment to Hostinger

### Prerequisites
1. Hostinger VPS or Business hosting plan with Node.js support
2. SSH access to your Hostinger server
3. Domain configured and pointing to your server

### Build Process
```bash
# For static hosting (shared hosting)
npm run build:static

# For VPS/server hosting  
npm run build:server
```

### Static Deployment (Shared Hosting)
1. Run `npm run build:static` to generate static files
2. Upload contents of `out/` folder to your domain's public_html directory
3. Ensure `.htaccess` is configured for SPA routing if needed

### VPS Deployment
1. Connect via SSH: `ssh username@your-server-ip`
2. Install Node.js 18+ and npm
3. Clone repository: `git clone [your-repo-url]`
4. Install dependencies: `npm install`
5. Build: `npm run build:server` 
6. Configure PM2 or similar process manager:
   ```bash
   npm install -g pm2
   pm2 start npm --name "aaa-website" -- start
   pm2 startup
   pm2 save
   ```
7. Configure Nginx reverse proxy to port 3000

### Environment Variables
Create `.env.local` file with any required environment variables for production.

### Domain Configuration
- Update any hardcoded localhost references to your domain
- Configure CORS settings if needed for API endpoints
- Update N8N webhook URL if using different instance

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
- **Static builds** do not support middleware, API routes, or server-side features
- Chat functionality uses direct N8N webhook calls in static builds
- Use `npm run build:static` for shared hosting (Hostinger)
- Use `npm run build:server` for VPS/server deployments with full Next.js features