module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  darkMode: false,

  theme: {
    extend: {
      fontFamily: {
        antonio: ['Antonio', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        redhat: ['Red Hat Display', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        ember: ['Amazon Ember', 'sans-serif'],
      },

      backgroundImage: {
        'hero-image':
          "url('https://res.cloudinary.com/euyome/image/upload/v1620067471/idiomascombasi/basi_hero_wider_ehkspo.jpg')",
        'banner-pattern':
          "url('https://res.cloudinary.com/euyome/image/upload/v1622573382/idiomascombasi/geomtric_pattern_wlb6kw.jpg')",
      },

      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },

      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      colors: {
        primary: '#A7DADC',
        secondary: '#120e41',
        gold: '#c6a869',
        blueaws: '#0073bb',
        fafa: '#fafafa',
      },

      transitionProperty: {
        'max-height': 'max-height',
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
