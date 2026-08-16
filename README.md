# Austrian AI Agency

Mehrsprachige Website für KI-Beratung im DACH-Raum · Multilingual website for AI consulting in the DACH region

---

## 🇩🇪 Über dieses Projekt

Offizielle Website der **Austrian AI Agency** — einer KI-Beratung mit Sitz in Österreich. Die Seite ist als statischer Export einer **Next.js 15**-App gebaut und wird über **GitHub Actions** automatisch auf **GitHub Pages** deployed.

### Technologie-Stack

- **Next.js 15** (App Router) mit statischem Export (`output: 'export'`)
- **Tailwind CSS v4** mit custom Aurora-Animationen
- **Framer Motion** für UI-Animationen
- **i18n**: Deutsch (`de`), Englisch (`en`), Russisch (`ru`)
- **n8n-Webhooks** für Kontaktformulare
- **Google Analytics 4** (opt-in, aus Umgebungsvariablen)

### Seiten

| Route | Inhalt |
|---|---|
| `/` | Locale-Detection & Redirect |
| `/[locale]` | Startseite |
| `/[locale]/contact` | Kontakt-Chat (n8n-Webhook) |
| `/[locale]/energyconsume` | Energie-Community-Landingpage |
| `/[locale]/eu-ai-act-readiness` | EU AI Act Readiness Check |
| `/[locale]/vet/*` | VetCall AI Unterseiten |

### Entwicklung

```bash
npm install
npm run dev          # Dev-Server (localhost:3000)
npm run build:static # Statischer Export nach out/
```

### Deployment

Automatisch bei jedem Push auf `main` (GitHub Actions → GitHub Pages).

Umgebungsvariablen werden **nicht** im Repository gespeichert, sondern als **GitHub Secrets** injiziert:

| Secret | Zweck |
|---|---|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Kontakt-Chat + Readiness-Formular |
| `NEXT_PUBLIC_VETCALL_WEBHOOK_URL` | VetCall CTA-Modal |
| `NEXT_PUBLIC_VETCALL_CONTACT_WEBHOOK_URL` | VetCall Kontaktseite |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |

Lokal: Kopie von `.env.example` nach `.env` (wird von Git ignoriert).

---

## 🇬🇧 About This Project

Official website of **Austrian AI Agency** — an AI consulting company based in Austria. The site is built as a static export of a **Next.js 15** app and deployed automatically to **GitHub Pages** via **GitHub Actions**.

### Tech Stack

- **Next.js 15** (App Router) with static export (`output: 'export'`)
- **Tailwind CSS v4** with custom aurora animations
- **Framer Motion** for UI animations
- **i18n**: German (`de`), English (`en`), Russian (`ru`)
- **n8n webhooks** for contact forms
- **Google Analytics 4** (opt-in, from environment variables)

### Pages

| Route | Content |
|---|---|
| `/` | Locale detection & redirect |
| `/[locale]` | Home page |
| `/[locale]/contact` | Contact chat (n8n webhook) |
| `/[locale]/energyconsume` | Energy community landing page |
| `/[locale]/eu-ai-act-readiness` | EU AI Act readiness check |
| `/[locale]/vet/*` | VetCall AI subpages |

### Development

```bash
npm install
npm run dev          # Dev server (localhost:3000)
npm run build:static # Static export to out/
```

### Deployment

Automatic on every push to `main` (GitHub Actions → GitHub Pages).

Environment variables are **not** stored in the repository — they are injected as **GitHub Secrets**:

| Secret | Purpose |
|---|---|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Contact chat + readiness form |
| `NEXT_PUBLIC_VETCALL_WEBHOOK_URL` | VetCall CTA modal |
| `NEXT_PUBLIC_VETCALL_CONTACT_WEBHOOK_URL` | VetCall contact page |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |

Locally: copy `.env.example` to `.env` (git-ignored).

---

## 🔗 Links

- Live: [aaagency.at](https://aaagency.at)
- EU AI Act Readiness: [aaagency.at/en/eu-ai-act-readiness](https://aaagency.at/en/eu-ai-act-readiness)

© Austrian AI Agency · Vienna, Austria
