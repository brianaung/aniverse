import Image from 'next/image'
import { AnimeInfo } from '../types'
// import {PlayCircle} from '@styled-icons/bootstrap/PlayCircle'
import { Text, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import styles from './episodeGrids.module.scss'

export default function EpisodeGrids({ data }: { data: AnimeInfo }) {
  const episodes = data.episodes

  const router = useRouter()

  const handlePlay = (index: number) => {
    router.push(`/anime/play/${data.id}?ep=${index}`)
  }

  return (
    <div className={styles.container}>
      {episodes.map((ep, index) => (
        <div className={styles.episodeBox} key={ep.id} onClick={() => handlePlay(index + 1)}>
          <Image
            className={styles.videoThumbnail}
            src={ep.image}
            quality={100}
            width={10000}
            height={10000}
            alt={ep.title}
          />
          <Tooltip textTransform="lowercase" label={ep.title}>
            <Text as="b" fontSize="xs" noOfLines={1} textTransform="uppercase">
              E{ep.number} - {ep.title}
            </Text>
          </Tooltip>
        </div>
      ))}
    </div>
  )
}
