import type { Config } from "tailwindcss";

const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'spektr-cyan': {
          '50': '#e6f8fa',
          '100': '#cdf0f6',
          '200': '#9fe0ed',
          '300': '#70c7e0',
          '400': '#42a9cf',
          '500': '#2a8bb4',
          '600': '#226f96',
          '700': '#1f5879',
          '800': '#1e4962',
          '900': '#1d3f52',
          '950': '#0d2736',
        },
      },
      animation: {
        "aurora": "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors
  ],
};

// Этот плагин добавляет каждый цвет Tailwind как глобальную CSS переменную, например, var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": {
      ...newVars,
      "--transparent": "transparent",
      "--white": "#ffffff",
      "--black": "#000000",
    },
  });
}

export default config;