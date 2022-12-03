import { Heading } from '@chakra-ui/react'
import Link from 'next/link'
import styles from './sidebar.module.scss'

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <Link href="/">Home</Link>
      <div className={styles.sectionContainer}>
        <Heading as="h3" size="sm">
          Anime
        </Heading>
        <Link href="/anime/popular">Most Popular</Link>
        <Link href="/anime/trending">Trending Animes</Link>
        <Link href="/">Recently Released</Link>
      </div>
      <div className={styles.sectionContainer}>
        <Heading as="h3" size="sm">
          Manga
        </Heading>
        <Link href="/anime/popular">Popular</Link>
        <Link href="/anime/trending">Trending</Link>
      </div>
    </div>
  )
}
