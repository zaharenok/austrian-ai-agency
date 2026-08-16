#!/bin/bash

echo "Copying static pages to out directory..."

# Create directories
mkdir -p out/en out/de out/ru

# Copy main locale pages
cp .next/server/app/en.html out/en/index.html
cp .next/server/app/de.html out/de/index.html
cp .next/server/app/ru.html out/ru/index.html

# Copy contact pages
mkdir -p out/en/contact out/de/contact out/ru/contact
cp .next/server/app/en/contact.html out/en/contact/index.html
cp .next/server/app/de/contact.html out/de/contact/index.html
cp .next/server/app/ru/contact.html out/ru/contact/index.html

# Copy energyconsume pages
mkdir -p out/en/energyconsume out/de/energyconsume out/ru/energyconsume
cp .next/server/app/en/energyconsume.html out/en/energyconsume/index.html
cp .next/server/app/de/energyconsume.html out/de/energyconsume/index.html
cp .next/server/app/ru/energyconsume.html out/ru/energyconsume/index.html

# Copy eu-ai-act-readiness pages
mkdir -p out/en/eu-ai-act-readiness out/de/eu-ai-act-readiness out/ru/eu-ai-act-readiness
cp .next/server/app/en/eu-ai-act-readiness.html out/en/eu-ai-act-readiness/index.html
cp .next/server/app/de/eu-ai-act-readiness.html out/de/eu-ai-act-readiness/index.html
cp .next/server/app/ru/eu-ai-act-readiness.html out/ru/eu-ai-act-readiness/index.html

# Copy ki-verordnung-readiness-check pages (German slug)
mkdir -p out/de/ki-verordnung-readiness-check
cp .next/server/app/de/ki-verordnung-readiness-check.html out/de/ki-verordnung-readiness-check/index.html

# Copy vet pages (main landing)
mkdir -p out/en/vet out/de/vet out/ru/vet
cp .next/server/app/en/vet.html out/en/vet/index.html
cp .next/server/app/de/vet.html out/de/vet/index.html
cp .next/server/app/ru/vet.html out/ru/vet/index.html

# Copy vet/contact pages
mkdir -p out/en/vet/contact out/de/vet/contact out/ru/vet/contact
cp .next/server/app/en/vet/contact.html out/en/vet/contact/index.html
cp .next/server/app/de/vet/contact.html out/de/vet/contact/index.html
cp .next/server/app/ru/vet/contact.html out/ru/vet/contact/index.html

# Copy vet/privacy pages
mkdir -p out/en/vet/privacy out/de/vet/privacy out/ru/vet/privacy
cp .next/server/app/en/vet/privacy.html out/en/vet/privacy/index.html
cp .next/server/app/de/vet/privacy.html out/de/vet/privacy/index.html
cp .next/server/app/ru/vet/privacy.html out/ru/vet/privacy/index.html

# Copy vet/impressum pages
mkdir -p out/en/vet/impressum out/de/vet/impressum out/ru/vet/impressum
cp .next/server/app/en/vet/impressum.html out/en/vet/impressum/index.html
cp .next/server/app/de/vet/impressum.html out/de/vet/impressum/index.html
cp .next/server/app/ru/vet/impressum.html out/ru/vet/impressum/index.html

echo "✓ Static pages copied successfully!"
