import { extendTheme } from '@chakra-ui/react'
import { colorConfig, colorPalette } from './colors'
import { componentStyles } from './components'

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
  '3xl': '110em'
}

const theme = extendTheme({
  colorConfig,
  breakpoints,
  colors: colorPalette,
  fonts: {
    heading: `'Noto Sans JP', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, SegoeUI, sans-serif`,
    body: `'Inter', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, SegoeUI, sans-serif`
  },

  // set global style (mainly used to dark and light theme bg and font color)
  styles: {
    global: ({ colorMode }: { colorMode: string }) => ({
      body: {
        bg: colorMode === 'dark' ? 'black' : 'bg.500',
        color: colorMode === 'dark' ? 'white' : 'fg.500',
        lineHeight: '1.6',
        fontSize: '18px',
        padding: '0',
        margin: '0',
        scrollBehavior: 'smooth',
        minWidth: '375px' // smallest supported screen size (iphone 6)
      },
      button: {
        _hover: {
          bg: 'none'
        }
      }
    })
  },

  // override component styles
  components: componentStyles
})

export default theme
