import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from './layout.module.scss'
import Navbar from './navbar'
import Sidebar from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/makima.ico" />
      </Head>
      {/* a place to add version changes notes to display to users */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="primary.500"
        color="black"
        borderBottom="solid 1px black"
        height="50px"
        width="100%">
        <Text as="b" fontSize={['xs', 'sm', 'md', null, null, null]}>
          Lorem ipsum dolor sit amet
        </Text>
      </Box>
      {/* -------------------------------------------------------- */}
      <section className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.main}>
          <Navbar />
          <main>{children}</main>
          <footer className={styles.footer}>
            <Text fontSize="sm" as="cite">
              created by <Link href="https://github.com/brianaung">@brianaung</Link>
            </Text>
          </footer>
        </div>
      </section>
    </div>
  )
}
