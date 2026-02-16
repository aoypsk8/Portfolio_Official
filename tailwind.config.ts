import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Noto Sans Thai', 'system-ui', 'sans-serif']
      },
      colors: {
        accent: { DEFAULT: 'rgb(245 158 11)' }
      }
    }
  }
}
