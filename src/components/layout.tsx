import { Box, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from './layout.module.scss'
import Navbar from './navbar'
import Sidebar from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/makima.ico" />
      </Head>
      {/* a place to add version changes notes to display to users */}
      {/* todo: handle really long text*/}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderBottom="solid 1px black"
        height="3rem"
        width="100%">
        <Text fontSize={['xs', 'sm', 'md', null, null, null, null]}>Lorem ipsum dolor sit amet</Text>
      </Box>
      {/* -------------------------------------------------------- */}

      {/* THIS IS THE MAIN LAYOUT FOR THE ENTIRE WEBPAGE */}
      <Stack w={['90%', null, '80%', null, '70%', '60%', '50%']} m="0 auto">
        <Navbar />
        <main>
          {' '}
          {/* main content: sidebar and body */}
          <Stack direction="row" w="100%" h="100%">
            <div className={styles.sidebar}>
              <Sidebar />
            </div>

            <div className={styles.body} style={{ marginLeft: '0' }}>
              {children}

              <footer className={styles.footer}>
                <Text fontSize="sm" as="cite">
                  created by <Link href="https://github.com/brianaung">@brianaung</Link>
                </Text>
              </footer>
            </div>
          </Stack>
        </main>
      </Stack>
    </>
  )
}
