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
  }
})

export default theme
