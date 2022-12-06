import {
  Button,
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
import { useRouter } from 'next/router'
// import { useRouter } from 'next/router'
import useSWR, { Fetcher } from 'swr'
// import utilStyles from '../styles/utils.module.scss'
import { AnimeInfo, AnimeResult } from '../types'
import GenreTags from './genreTags'
import AnimeItemDisplay from './animeItemDisplay'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeItem({ anime }: { anime: AnimeResult }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, error } = useSWR(anime.id ? `/api/anime/watch/${anime.id}` : null, fetcher)

  const router = useRouter()

  return (
    <>
      {/* anime display item component */}
      <AnimeItemDisplay anime={anime} onOpen={onOpen} />

      {/* anime info page drawer */}
      <Drawer isOpen={isOpen} placement="top" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {/* todo: add loading skeletons */}
          {!data && !error && <p>Loading</p>}
          {!data && error && <p>Something went wrong. Please try again later.</p>}
          {data && !error && (
            <>
              <DrawerHeader display="flex" flexDirection="column" gap="1rem">
                <Heading as="h1" size="xl">
                  {data.title.english}
                </Heading>
                {/* todo: clicking on each genre will redirect to similar animes with same genre? */}
                <GenreTags genres={data.genres} color={data.color} />
                <Text>
                  {data.releaseDate} ({data.status})
                </Text>
              </DrawerHeader>

              <DrawerBody display="flex" flexDirection="column" gap="1rem">
                <Image
                  style={{ border: 'solid 1px black', width: '100%', height: 'auto', maxHeight: '500px' }}
                  quality="100"
                  src={data.cover}
                  width={100000}
                  height={100000}
                  alt={data.title.english}
                />

                <Tabs>
                  <TabList>
                    <Tab>About</Tab>
                    <Tab>Characters</Tab>
                    <Tab>Related</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(150px, 1fr))">
                        <Card variant="outline">
                          <CardBody>
                            <Heading size="sm">Episodes</Heading>
                            <Text as="i">{data.totalEpisodes}</Text>
                          </CardBody>
                        </Card>
                        <Card variant="outline">
                          <CardBody>
                            <Heading size="sm">Rating</Heading>
                            <Text as="i">{data.rating}</Text>
                          </CardBody>
                        </Card>
                        <Card variant="outline">
                          <CardBody>
                            <Heading size="sm">Popularity</Heading>
                            <Text as="i">{data.popularity}</Text>
                          </CardBody>
                        </Card>
                        <Card variant="outline">
                          <CardBody>
                            <Heading size="sm">Season</Heading>
                            <Text as="i">{data.season}</Text>
                          </CardBody>
                        </Card>
                        <Card variant="outline">
                          <CardBody>
                            <Heading size="sm">Origin</Heading>
                            <Text as="i">{data.countryOfOrigin}</Text>
                          </CardBody>
                        </Card>
                        <Card variant="outline">
                          <CardBody>
                            <Heading size="sm">Studio</Heading>
                            <Text as="i">{data.studios}</Text>
                          </CardBody>
                        </Card>
                      </SimpleGrid>
                      <section>
                        <Text dangerouslySetInnerHTML={{ __html: data.description }} />
                      </section>
                    </TabPanel>
                    {/* todo: add more data */}
                    <TabPanel>N/A</TabPanel>
                    <TabPanel>N/A</TabPanel>
                  </TabPanels>
                </Tabs>
              </DrawerBody>

              <DrawerFooter justifyContent="center">
                <Button onClick={() => router.push(`/anime/watch/${anime.id}`)}>Start Watching</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
