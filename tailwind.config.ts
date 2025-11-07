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
        'vet-emerald': {
          '50': '#ecfdf5',
          '100': '#d1fae5',
          '200': '#a7f3d0',
          '300': '#6ee7b7',
          '400': '#34d399',
          '500': '#10b981',
          '600': '#059669',
          '700': '#047857',
          '800': '#065f46',
          '900': '#064e3b',
          '950': '#022c22',
        },
        'vet-teal': {
          '50': '#f0fdfa',
          '100': '#ccfbf1',
          '200': '#99f6e4',
          '300': '#5eead4',
          '400': '#2dd4bf',
          '500': '#14b8a6',
          '600': '#0d9488',
          '700': '#0f766e',
          '800': '#115e59',
          '900': '#134e4a',
          '950': '#042f2e',
        },
      },
      animation: {
        "aurora": "aurora 60s linear infinite",
        "fade-in": "fadeIn 0.3s ease-in-out forwards",
        "slide-up": "slideUp 0.3s ease-in-out forwards"
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
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        slideUp: {
          from: { transform: "translateY(20px)" },
          to: { transform: "translateY(0)" }
        }
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