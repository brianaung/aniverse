import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/raleway/700.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import '../styles/globals.scss'
import theme from '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('finished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  return (
    <ChakraProvider theme={theme}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Component {...pageProps} />
          <Analytics />
        </>
      )}
    </ChakraProvider>
  )
}
