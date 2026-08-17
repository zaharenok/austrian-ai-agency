# AGENTS.md — Austrian AI Agency Website (aaagency.at)

Guidance for AI agents working in this repository. Full project manual: Hermes skill `aaagency-website` (and `landing-page-i18n` for new landing recipes).

## Quick facts
- Next.js 15 App Router + React 19 + Tailwind v4 (`spektr-cyan`) + Framer Motion + TypeScript.
- Custom i18n (no next-intl): `src/locales/{en,de,ru}/common.json` — identical key structure in all 3, no empty values. Use `useTranslations()` → `t('key')` from `@/context/language-context`.
- Deploy: `git push origin main` → GitHub Actions (`deploy.yml`) → GitHub Pages (CNAME aaagency.at). Build: `npm run build:static` → `out/`.
- **Every new page must be added to `scripts/copy-static-pages.sh`** (copy from `.next/server/app/` to `out/`).

## Commands
- `npm run dev` — dev server :3000
- `npm run build:static` — static export to `out/`
- `npm run build:server` — server build (PM2 on VPS)
- Test static: serve `out/` as root (`python3 -m http.server 4321 --directory out`), check via Playwright MCP.

## Conventions
- Texts live ONLY in locale JSONs — do not hardcode UI strings in components.
- `t()` returns `string | string[]`; for arrays of objects read via `translations` object or direct JSON access.
- Components: `AuroraBackground`, `SiteFooter` inside scroll-boundary div, `cn()` from `@/lib/utils`, icons from `lucide-react`.
- Form fields must match n8n webhook payload keys.
- `?domain=` on /ki-pakete = funnel lead (Audit preselected + banner). Do not break.

## Webhooks (n8n.aaagency.at)
- Chat: `NEXT_PUBLIC_N8N_WEBHOOK_URL` (AI chat responder — NOT for orders).
- Orders: `NEXT_PUBLIC_N8N_ORDER_WEBHOOK_URL` = https://n8n.aaagency.at/webhook/ki-pakete-orders (workflow «KI-Pakete Order Form» → Telegram → `{ok:true}`; frontend falls back to mailto).
- VetCall: `NEXT_PUBLIC_VETCALL_*` env/secrets.

## Pitfalls
- Serve from `out/` as root, otherwise `/_next/*` 404.
- Don't sum monthly + one-time prices into a single «einmalig» total on ki-pakete — keep them separate.
- Verify claims against real data (e.g. report counts vs `~/projects/eu-ai-act-scanner/leads.db`). No invented numbers.
- Machine identity: VPS = srv1303227 / 100.116.28.100; minix = 100.116.28.12. Check `hostname` before quoting URLs.