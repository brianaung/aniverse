import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const colorConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
  '3xl': '110em'
}

// todo: choose color palette
const theme = extendTheme({
  // set initial colormode
  colorConfig,
  breakpoints,

  fonts: {
    heading: `'Montserrat', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, SegoeUI, sans-serif`,
    body: `'Montserrat', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, SegoeUI, sans-serif`
  },

  colors: {
    bg: {
      500: '#fgf4e4',
    },
    primary: {
      100: '#c6f6d5',
      500: '#db929d',
      900: '#c6f6d5'
    },
    secondary: {
      100: '#c6f6d5',
      500: '#c6f6d5',
      900: '#c6f6d5'
    }
  },

  // set global style (mainly used to dark and light theme bg and font color)
  styles: {
    global: ({ colorMode }: { colorMode: string }) => ({
      body: {
        bg: colorMode === 'dark' ? 'black' : '#fbf4e4',
        color: colorMode === 'dark' ? 'white' : '#323232'
      }
    })
  },

  // override component styles
  components: {
    Button: {
      variants: {
        // primary button style for the brand
        primary: {
          border: 'solid 1px black',
          bg: 'primary.500',
          color: 'black',
          transition: 'all 200ms ease',
          _hover: {
            // transform: 'translateY(-2px)'
            filter: 'drop-shadow(5px 5px 0px black)'
          }
        },
        searchbar: {
          border: 'solid 1px black',
          bg: 'white',
          fontWeight: '400'
        }
      },
      defaultProps: {
        variant: 'primary'
      }
    },
    Input: {
      variants: {
        primary: {
          field: {
            border: 'solid 1px black',
            minWidth: '350px'
          }
        }
      },
      defaultProps: {
        variant: 'primary'
      }
    }
  }
})

export default theme
