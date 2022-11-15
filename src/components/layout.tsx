import React from 'react'
import styles from './layout.module.scss'
import Navbar from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
