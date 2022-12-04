import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const colorConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// todo: choose color palette
const theme = extendTheme({ 
  // set initial colormode
  colorConfig,

  // set global style (mainly used to dark and light theme bg and font color)
  styles: {
    global: ({ colorMode }: { colorMode: string }) => ({
      body: {
        bg: colorMode === 'dark' ? 'black' : 'white',
        color: colorMode === 'dark' ? 'white' : 'black'
      }
    }),
  },

  fonts: {
    heading: `'Raleway', -apple-system, BlinkMacSystemFont, SegoeUI, Roboto, sans-serif`,
    body: `'Raleway', -apple-system, BlinkMacSystemFont, SegoeUI, Roboto, sans-serif`,
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

  // override component styles
  components: {
    Button: {
      variants: {
        // primary button style for the brand
        'primary': {
          border: 'solid 1px black',
          bg: 'primary.500',
          color: 'black',
          _hover: {
            transform: 'translateY(-2px)'
          },
        },
        'searchbar': {
          border: 'solid 1px black',
          fontWeight: '400',
        }
      },
      defaultProps: {
        variant: 'primary',
      }
    },
    Input: {
      variants: {
        'primary': {
          field: {
            border: 'solid 1px black',
            minWidth: '350px',
          },
        }
      },
      defaultProps: {
        variant: 'primary',
      }
    }
  }
})

export default theme
