#!/bin/bash

echo "Building static export..."
npm run build:static

echo "Copying locale pages..."
mkdir -p out/en out/de out/ru out/en/contact out/de/contact out/ru/contact

cp .next/server/app/en.html out/en/index.html
cp .next/server/app/de.html out/de/index.html
cp .next/server/app/ru.html out/ru/index.html
cp .next/server/app/en/contact.html out/en/contact/index.html
cp .next/server/app/de/contact.html out/de/contact/index.html
cp .next/server/app/ru/contact.html out/ru/contact/index.html

echo "Creating deployment package..."
mkdir -p deployment
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ZIP_NAME="aaa-website-deploy-${TIMESTAMP}.zip"
zip -r9 "deployment/${ZIP_NAME}" out/* -x '**/.DS_Store'

echo ""
echo "✅ Deployment package created successfully!"
echo "📦 File: deployment/${ZIP_NAME}"
echo "📊 Size: $(du -h "deployment/${ZIP_NAME}" | cut -f1)"
echo ""
