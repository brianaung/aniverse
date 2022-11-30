import Image from 'next/image'
import { AnimeEpisode } from '../types'
// import {PlayCircle} from '@styled-icons/bootstrap/PlayCircle'
import { PlayCircle } from '@styled-icons/material-twotone/PlayCircle'
import styles from './episodeGrids.module.scss'
import { useRouter } from 'next/router'

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
    <div id="epSection" className={styles.container}>
      {episodes.map((ep, index) => (
        <div className={styles.playBtn} key={ep.id} onClick={() => handlePlay(ep, index)}>
          {/* episode image with play button icon */}
          <div style={{ border: 'solid 1px black', position: 'relative' }}>
            <Image src={ep.image} width={250} height={150} alt={ep.title} />
            <PlayCircle
              style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: '-25px', marginTop: '-25px' }}
              color="black"
              width={50}
              height={50}
            />
          </div>
          {/* ----------------------------------- */}
          <p>
            E{ep.number} - <span className={styles.videoCaption}>{ep.title}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
