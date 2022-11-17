import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { IAnimeBaseInfo } from '../types'
import styles from './animeItem.module.scss'

export default function AnimeItem({ anime }: { anime: IAnimeBaseInfo }) {
  const router = useRouter()
  const handleOpen = () => {
    router.push(`/anime/info/${anime.id}`)
  }

  return (
    <div onClick={handleOpen} className={styles.container}>
      <Image className={styles.image} src={anime.image} height={180} width={180} alt={anime.title} />
      <Link className={styles.title} href={`/anime/info/${anime.id}`}>
        {anime.title}
      </Link>
    </div>
  )
}
