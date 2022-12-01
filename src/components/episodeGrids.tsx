import Image from 'next/image'
import { AnimeEpisode } from '../types'
// import {PlayCircle} from '@styled-icons/bootstrap/PlayCircle'
import { Text } from '@chakra-ui/react'
import { PlayCircle } from '@styled-icons/material-twotone/PlayCircle'
import { useRouter } from 'next/router'
import styles from './episodeGrids.module.scss'

export default function EpisodeGrids({ animeID, episodes }: { animeID: string; episodes: AnimeEpisode[] }) {
  const router = useRouter()

  const handlePlay = (ep: AnimeEpisode, index: number) => {
    router.push({
      pathname: `/anime/play`,
      query: {
        animeID: animeID,
        ep: JSON.stringify(ep),
        index
      }
    })
  }

  return (
    <section id="epSection" className={styles.container}>
      {episodes.map((ep, index) => (
        <div className={styles.episodeBox} key={ep.id} onClick={() => handlePlay(ep, index)}>
          {/* episode image with play button icon */}
          <div className={styles.videoThumbnail}>
            <Image src={ep.image} width={250} height={150} alt={ep.title} />
            <PlayCircle className={styles.playCircle} color="black" width={50} height={50} />
          </div>
          {/* ----------------------------------- */}
          <Text as="em">
            E{ep.number} - <span className={styles.videoCaption}>{ep.title}</span>
          </Text>
        </div>
      ))}
    </section>
  )
}
