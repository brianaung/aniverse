import { Heading, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import styles from './sidebar.module.scss'

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <Link href="/">Home</Link>
      <div className={styles.sectionContainer}>
        <Heading as="h3" size="sm">
          ANIME
        </Heading>
        <Stack p="3">
          <Link href="/anime/popular">Most Popular</Link>
          <Link href="/anime/trending">Trending Now</Link>
          <Link href="/">New Releases</Link>
        </Stack>
      </div>
      {/*
      <div className={styles.sectionContainer}>
        <Heading as="h3" size="sm">
          Manga
        </Heading>
        <Link href="/anime/popular">Popular</Link>
        <Link href="/anime/trending">Trending</Link>
      </div>
        */}
    </div>
  )
}
