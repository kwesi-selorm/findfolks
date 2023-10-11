let customFonts = {
  'Bricolage Grotesque Light': require('../assets/fonts/BricolageGrotesque-Light.ttf'),
  'Bricolage Grotesque': require('../assets/fonts/BricolageGrotesque-Regular.ttf'),
  'Bricolage Grotesque Medium': require('../assets/fonts/BricolageGrotesque-Medium.ttf'),
  'Bricolage Grotesque Bold': require('../assets/fonts/BricolageGrotesque-Bold.ttf'),
  'Bricolage Grotesque SemiBold': require('../assets/fonts/BricolageGrotesque-SemiBold.ttf'),
  'Bricolage Grotesque ExtraBold': require('../assets/fonts/BricolageGrotesque-ExtraBold.ttf')
}

const appFont = {
  light: 'Bricolage Grotesque Light',
  regular: 'Bricolage Grotesque',
  medium: 'Bricolage Grotesque Medium',
  bold: 'Bricolage Grotesque Bold',
  semiBold: 'Bricolage Grotesque SemiBold',
  extraBold: 'Bricolage Grotesque ExtraBold'
}

const appColors = {
  blue: '#3085C3',
  darkBlue: '#1D5D9B',
  grey: '#D1D1D1',
  green: '#539165',
  white: '#fff',
  black: '#000',
  red: '#C63D2F'
}

const appBorderRadius = {
  pressablePressedRadius: 8,
  cardRadius: 10
}

const widths = {
  formWidth: 300
}

export { appColors, appFont, customFonts, appBorderRadius, widths }
