import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/raleway/700.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import theme from '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  )
}
