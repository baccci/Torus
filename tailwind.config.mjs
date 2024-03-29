/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Geist', 'system-ui', 'sans-serif'],
      mono: ['GeistMono', 'monospace']
    },
    extend: {
      colors: {
        black: '#111',
        borderblack: '#222'
      }
    }
  },
  plugins: []
}
