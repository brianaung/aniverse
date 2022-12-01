import Head from 'next/head'
import React from 'react'
import styles from './layout.module.scss'
import Navbar from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/makima.ico' />
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
