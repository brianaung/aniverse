import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './animeItem.module.scss'

export default function AnimeItem({
  anime,
}: {
  anime: { id: string; title: string; url: string; image: string; releaseDate: string; subOrDub: string }
}) {
  const router = useRouter()
  const handleOpen = () => {
    router.push(`/anime/info/${anime.id}`)
  }

  return (
    <div onClick={handleOpen} className={styles.container}>
      <Image src={anime.image} height={180} width={180} alt={anime.title} />
      {anime.title}
    </div>
  )
}
