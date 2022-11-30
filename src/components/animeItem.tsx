import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import React from 'react'
import useSWR, { Fetcher } from 'swr'
import { AnimeResult, AnimeInfo } from '../types'
import styles from './animeItem.module.scss'
import GenreTags from './genreTags'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

// todo: add more meta data
export default function AnimeItem({ anime }: { anime: AnimeResult }) {
  // const router = useRouter()
  /* const handleOpen = () => {
    router.push(`/anime/info/${anime.id}`)
  } */

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = useSWR(anime.id ? `/api/anime/watch/${anime.id}` : null, fetcher)

  return (
    <>
      {/* anime item component */}
      <div onClick={onOpen} className={styles.container}>
        <Image className={styles.image} src={anime.image} height={240} width={180} alt={anime.title.english} />
        <Link className={styles.title} href={`/anime/watch/${anime.id}`}>
          {anime.title.english}
        </Link>
      </div>

      <Drawer isOpen={isOpen} placement="top" onClose={onClose} size="full">
        <DrawerOverlay />
        {data && (
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <h1 style={{ color: data.color, textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>
                {data.title.english}
              </h1>

              {/* todo: clicking on each genre will redirect to similar animes with same genre? */}
              <GenreTags genres={data.genres} color={data.color} />
            </DrawerHeader>

            <DrawerBody>
              <div style={{ width: '100%', height: 'auto', maxHeight: '500px', overflow: 'hidden' }}>
                <Image
                  style={{ border: 'solid 1px black', width: '100%', height: 'auto' }}
                  quality="100"
                  src={data.cover}
                  width={100000}
                  height={100000}
                  alt={data.title.english}
                />
              </div>

              <section style={{ margin: '1rem 0' }}>
                <p style={{ fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: data.description }} />
              </section>

              <div style={{ border: 'solid 5px red' }}>
                <h3>todo: present these data in proper fashion</h3>
                {data.releaseDate} ({data.status}) | {data.totalEpisodes} episodes | duration {data.duration} | rating{' '}
                {data.rating} | season {data.season} | studios {data.studios} | subordub? {data.subOrDub} |
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  characters{' '}
                  {data.characters.map((c) => (
                    <>
                      <p>{c.name.first}</p>
                      <Image
                        style={{ border: 'solid 1px black', borderRadius: '9999px' }}
                        src={c.image}
                        width={50}
                        height={50}
                        alt={c.name.full}
                      />
                    </>
                  ))}
                </div>
              </div>
            </DrawerBody>

            <DrawerFooter>
              <Link href={`/anime/watch/${anime.id}`}>Start Watching</Link>
              {/* todo: show this in seperate page when clicked on start watching */}
              {/* <EpisodeGrids animeID={anime.id} episodes={data.episodes} /> */}
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </>
  )
}
