import React from "react";
import styles from './animeListContainer.module.scss'

export default function AnimeListContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
