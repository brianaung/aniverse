import { Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from './layout.module.scss'
import Navbar from './navbar'
import Sidebar from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/makima.ico" />
      </Head>
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
    </div>
  )
}
