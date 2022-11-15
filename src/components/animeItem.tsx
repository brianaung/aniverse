import Image from 'next/image'
import React from 'react'
import styles from './animeItem.module.scss'

export default function AnimeItem({
  anime,
}: {
  anime: { id: string; title: string; url: string; image: string; releaseDate: string; subOrDub: string }
}) {
  return (
    <div className={styles.container}>
      <Image src={anime.image} height={180} width={180} alt={anime.title} />
      {anime.title}
    </div>
  )
}
