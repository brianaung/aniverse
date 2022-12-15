import { Center, Show, Stack, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './layout.module.scss'

const jpMessage = 'テレビアニメを見るときは部屋を明るくして、テレビからはなれて見てください！'
const engMessage = 'When watching anime, light up the room, and leave some distance between the TV and yourself!'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState(jpMessage)
  const [isJpn, setIsJpn] = useState(true)
  const Navbar = dynamic(() => import('./navbar'), {
    ssr: false
  })
  const Sidebar = dynamic(() => import('./sidebar'), {
    ssr: false
  })

  const handleTranslate = () => {
    if (isJpn) {
      setMessage(engMessage)
      setIsJpn(false)
    } else {
      setMessage(jpMessage)
      setIsJpn(true)
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/makima.ico" />
      </Head>
      {/* a place to add version changes notes to display to users */}
      <Center
        p=".5rem"
        bg="pink.500"
        onClick={handleTranslate}
        borderBottom="solid 2px black"
        minHeight="3rem"
        width="100%">
        <Text fontSize={['xs', null, 'sm', null, 'md', null, 'lg']}>{message}</Text>
      </Center>
      {/* -------------------------------------------------------- */}

      <Navbar />
      {/* THIS IS THE MAIN LAYOUT FOR THE ENTIRE WEBPAGE */}
      <Stack>
        {/* main content: sidebar and body */}
        <Stack direction="row" w="100%" h="100%">
          <Show above="md">
            <div className={styles.sidebar}>
              <Sidebar />
            </div>
          </Show>
          <div className={styles.body} style={{ marginLeft: '0' }}>
            {children}

            <footer className={styles.footer}>
              <Text fontSize="sm" as="cite">
                created by{' '}
                <Link target="_blank" rel="noreferrer" href="https://github.com/brianaung">
                  @brianaung
                </Link>
              </Text>
            </footer>
          </div>
        </Stack>
      </Stack>
    </>
  )
}
