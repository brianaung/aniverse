import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const colorConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ 
  colorConfig,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, SegoeUI, Roboto, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, SegoeUI, Roboto, sans-serif`,
  },
  colors: {
    primary: {
      100: '#c6f6d5',
      500: '#c6f6d5',
      900: '#c6f6d5',
    },
    secondary: {
      100: '#c6f6d5',
      500: '#c6f6d5',
      900: '#c6f6d5',
    }
  },
  components: {
    Button: {
      variants: {
        // primary button style for the brand
        'primary': {
          border: 'solid 1px black',
          bg: 'primary.500',
          '&:hover': {
            transform: 'translateY(-2px)'
          }
        }
      },
      defaultProps: {
        variant: 'primary',
        colorScheme: 'primary',
        color: 'black',
      }
    },
  }
})

export default theme
