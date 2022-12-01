import {
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import React from 'react'
import useSWR, { Fetcher } from 'swr'
import { AnimeResult, AnimeInfo } from '../types'
import styles from './animeItem.module.scss'
import utilStyles from '../styles/utils.module.scss'
import GenreTags from './genreTags'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeItem({ anime }: { anime: AnimeResult }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, error } = useSWR(anime.id ? `/api/anime/watch/${anime.id}` : null, fetcher)

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
          <DrawerContent>
            <DrawerCloseButton />
            {/* todo: add loading skeletons */}
            {!data &&  !error && <p>Loading</p>}
            {!data &&  error && <p>Something went wrong. Please try again later.</p>}
            {data && !error && (
            <>
            <DrawerHeader display='flex' flexDirection='column' gap='1rem'>
              <Heading className={utilStyles.textWithStroke} color={data.color} as='h1' size='xl' >
                {data.title.english} <Text fontSize='lg' as='sup'>{data.subOrDub}</Text>
              </Heading>
              {/* todo: clicking on each genre will redirect to similar animes with same genre? */}
              <GenreTags genres={data.genres} color={data.color} />
              <Text>{data.releaseDate} ({data.status}) | {data.totalEpisodes} episodes</Text>
            </DrawerHeader>

            <DrawerBody display='flex' flexDirection='column' gap='1rem'>
                <Image
                  style={{ border: 'solid 1px black', width: '100%', height: 'auto', maxHeight:'500px'}}
                  quality="100"
                  src={data.cover}
                  width={100000}
                  height={100000}
                  alt={data.title.english}
                />

              <Tabs>
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Characters</Tab>
                  <Tab>Related</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
                      <Card variant='outline'>
                        <CardBody>
                          <Heading size='sm'>Rating</Heading>
                          <Text as='i'>{data.rating}</Text>
                        </CardBody>
                      </Card>
                      <Card variant='outline'>
                        <CardBody>
                          <Heading size='sm'>Popularity</Heading>
                          <Text as='i'>{data.popularity}</Text>
                        </CardBody>
                      </Card>
                      <Card variant='outline'>
                        <CardBody>
                          <Heading size='sm'>Season</Heading>
                          <Text as='i'>{data.season}</Text>
                        </CardBody>
                      </Card>
                      <Card variant='outline'>
                        <CardBody>
                          <Heading size='sm'>Origin</Heading>
                          <Text as='i'>{data.countryOfOrigin}</Text>
                        </CardBody>
                      </Card>
                      <Card variant='outline'>
                        <CardBody>
                          <Heading size='sm'>Studio</Heading>
                          <Text as='i'>{data.studios}</Text>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                    <section>
                      <Text as='i' dangerouslySetInnerHTML={{ __html: data.description }} />
                    </section>
                  </TabPanel>
                  {/* todo: add more data */}
                  <TabPanel>
                    N/A
                  </TabPanel>
                  <TabPanel>
                    N/A
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>

            <DrawerFooter justifyContent='center'>
              <Link className={utilStyles.button} href={`/anime/watch/${anime.id}`}>Start Watching</Link>
            </DrawerFooter>
            </>
            )}
          </DrawerContent>
      </Drawer>
    </>
  )
}
