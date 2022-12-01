import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  )
}
