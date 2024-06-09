import { Colors } from '@blueprintjs/core'

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-strip':
          'repeating-linear-gradient(45deg, #8ABBFF 0px, #8ABBFF 2px, transparent 2px, transparent 9px )'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',

      lightgray: '#d3d8de',
      lightGray1: Colors.LIGHT_GRAY1,
      lightGray2: Colors.LIGHT_GRAY2,
      lightGray3: Colors.LIGHT_GRAY3,
      lightGray4: Colors.LIGHT_GRAY4,
      lightGray5: Colors.LIGHT_GRAY5,

      gray1: Colors.GRAY1,
      gray2: Colors.GRAY2,
      gray3: Colors.GRAY3,
      gray4: Colors.GRAY4,
      gray5: Colors.GRAY5,

      blue1: Colors.BLUE1,
      blue2: Colors.BLUE2,
      blue3: Colors.BLUE3,
      blue4: Colors.BLUE4,
      blue5: Colors.BLUE5,

      cerulean1: Colors.CERULEAN1,
      cerulean2: Colors.CERULEAN2,
      cerulean3: Colors.CERULEAN3,
      cerulean4: Colors.CERULEAN4,
      cerulean5: Colors.CERULEAN5,

      gold1: Colors.GOLD1,
      gold2: Colors.GOLD2,
      gold3: Colors.GOLD3,
      gold4: Colors.GOLD4,
      gold5: Colors.GOLD5,

      forest1: Colors.FOREST1,
      forest2: Colors.FOREST2,
      forest3: Colors.FOREST3,
      forest4: Colors.FOREST4,
      forest5: Colors.FOREST5,

      white: Colors.WHITE,
      black: Colors.BLACK,

      red3: Colors.RED3
    }
  }
}
