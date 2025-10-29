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

echo "✓ Static pages copied successfully!"
