import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      boxShadow: {
        '3xl': 'rgba(99, 99, 99, 0.2) 0px 0 8px 0px',
      },
      typography: () => ({
        basic: {
          css: {
            '--tw-prose-code': '#172B4D',
            '--tw-prose-bullets': '#000000',
            '--tw-prose-counters': '#000000',
          },
        },
      }),
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    container: false,
  },
  plugins: [typography],
};
export default config;
