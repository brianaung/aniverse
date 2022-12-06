import Image from 'next/image'
import { AnimeEpisode } from '../types'
// import {PlayCircle} from '@styled-icons/bootstrap/PlayCircle'
import { Text, Tooltip } from '@chakra-ui/react'
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
          <Image className={styles.videoThumbnail} src={ep.image} width={220} height={130} alt={ep.title} />
          <Tooltip textTransform="lowercase" label={ep.title}>
            <Text as="b" fontSize="xs" noOfLines={1} textTransform="uppercase">
              E{ep.number} - {ep.title}
            </Text>
          </Tooltip>
        </div>
      ))}
    </section>
  )
}
