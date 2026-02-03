import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PALETTE AUTUMN ORIGINALE (correcte)
        primary: {
          50: '#F7F1E8',    // Crème très clair (background)
          100: '#EFE9DE',   // Crème clair
          200: '#E7D7C5',   // Beige clair
          300: '#D5B8A1',   // Beige moyen
          400: '#C46A2A',   // Orange brûlé (accent)
          500: '#B68B2B',   // Jaune foncé
          600: '#5A3A2B',   // Marron foncé (texte)
          700: '#2B1B12',   // Marron très foncé (headings)
          900: '#1A0F08',   // Presque noir
        },
        accent: {
          orange: '#C46A2A',  // Orange pour boutons
          yellow: '#B68B2B',  // Jaune pour accents
        },
        neutral: {
          cream: '#F7F1E8',   // Crème
          light: '#EFE9DE',   // Light beige
          dark: '#2B1B12',    // Dark brown
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(43, 27, 18, 0.08)',
        'soft-lg': '0 8px 24px rgba(43, 27, 18, 0.12)',
        'soft-xl': '0 12px 32px rgba(43, 27, 18, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config