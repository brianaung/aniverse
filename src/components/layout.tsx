import { Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from './layout.module.scss'
import Navbar from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/makima.ico" />
      </Head>
      <Navbar />
      <main style={{minHeight:"90vh"}}>{children}</main>
      <footer style={{marginTop: 'auto'}}><Text fontSize='sm' as='cite'>created by <Link href='https://github.com/brianaung'>@brianaung</Link></Text></footer>
    </div>
  )
}
