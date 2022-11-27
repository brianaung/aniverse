import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AnimeResults } from '../types'
import styles from './animeItem.module.scss'

// todo: add more meta data
export default function AnimeItem({ anime }: { anime: AnimeResults }) {
  const router = useRouter()
  const handleOpen = () => {
    router.push(`/anime/info/${anime.id}`)
  }

  return (
    <div onClick={handleOpen} className={styles.container}>
      <Image className={styles.image} src={anime.image} height={240} width={180} alt={anime.title.userPreferred} />
      <Link className={styles.title} href={`/anime/info/${anime.id}`}>
        {anime.title.userPreferred}
      </Link>
    </div>
  )
}
