// Конфигурация для статического экспорта
import type { NextConfig } from "next";

const nextConfigStatic: NextConfig = {
  /* config options for static export */
  output: 'export',
  images: {
    unoptimized: true  // Необходимо для статического экспорта
  },
  trailingSlash: true,  // Помогает с путями к ресурсам
  eslint: {
    // Игнорировать ошибки ESLint при сборке для деплоя
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Игнорировать ошибки TypeScript при сборке для деплоя
    ignoreBuildErrors: true,
  },
};

export default nextConfigStatic;
