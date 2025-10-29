// Конфигурация для серверного деплоя (с API-маршрутами)
import type { NextConfig } from "next";

const nextConfigServer: NextConfig = {
  /* config options for server deployment */
  images: {
    unoptimized: true
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

export default nextConfigServer;
