import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  CardBody,
  Heading,
  Show,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR, { Fetcher } from 'swr'
import AnimeItem from '../../../components/animeItem'
import AnimeListContainer from '../../../components/animeListContainer'
import CharactersList from '../../../components/charactersList'
import EpisodeGrids from '../../../components/episodeGrids'
import GenreTags from '../../../components/genreTags'
import Layout from '../../../components/layout'
import { AnimeEpisode, AnimeInfo } from '../../../types'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

function AboutInfo({ data }: { data: AnimeInfo }) {
  return (
    <>
      <SimpleGrid mb="4" spacing={2} templateColumns="repeat(auto-fill, minmax(100px, 1fr))">
        <Card size="sm" align="center" variant="outline">
          <CardBody display='flex' flexDirection='column' alignItems='center'>
            <Heading size="sm">Episodes</Heading>
            <Text as="i">{data.totalEpisodes}</Text>
          </CardBody>
        </Card>
        <Card size="sm" align="center" variant="outline">
          <CardBody display='flex' flexDirection='column' alignItems='center'>
            <Heading size="sm">Rating</Heading>
            <Text textAlign='center' as="i">{data.rating}</Text>
          </CardBody>
        </Card>
        <Card size="sm" align="center" variant="outline">
          <CardBody display='flex' flexDirection='column' alignItems='center'>
            <Heading size="sm">Popularity</Heading>
            <Text as="i">{data.popularity}</Text>
          </CardBody>
        </Card>
        <Card size="sm" align="center" variant="outline">
          <CardBody display='flex' flexDirection='column' alignItems='center'>
            <Heading size="sm">Origin</Heading>
            <Text as="i">{data.countryOfOrigin}</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
      <section>
        <Text dangerouslySetInnerHTML={{ __html: data.description }} />
      </section>
    </>
  )
}

function CharactersInfo({ data }: { data: AnimeInfo }) {
  return (
    <>
      <CharactersList characters={data.characters} />
      <Text>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/search?q=List of ${data.title.english} Characters`}>
          and more
        </a>
      </Text>
    </>
  )
}

function RelatedInfo({ data }: { data: AnimeInfo }) {
  return (
    <AnimeListContainer>
      {data.recommendations.map((anime) => (
        <AnimeItem key={anime.id} anime={anime} />
      ))}
    </AnimeListContainer>
  )
}

export default function AnimeInfoPage() {
  const router = useRouter()
  const { id } = Array.isArray(router.query) ? router.query[0] : router.query
  const { data, error } = useSWR(id ? `/api/anime/info/${id}` : null, fetcher)

  const handleStartWatching = (ep: AnimeEpisode, index: number) => {
    router.push({
      pathname: `/anime/play`,
      query: {
        animeID: data?.id,
        ep: JSON.stringify(ep),
        index
      }
    })
  }

  return (
    <Layout>
      <Head>
        <title>watch {data && data.title.english}</title>
      </Head>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Something went wrong, please try again later.</p>}
      {data && !error && (
        <Stack width="100%" gap=".2rem">
          {/* anime info page drawer */}
          {/* todo: add loading skeletons */}
          <Heading as="h1" size="xl">
            {data.title.english}
          </Heading>
          {/* todo: clicking on each genre will redirect to similar animes with same genre? */}
          <GenreTags genres={data.genres} />
          <Text>
            {data.releaseDate} ({data.status})
          </Text>

          <Image
            style={{ border: 'solid 1px black', width: '100%', height: 'auto', maxHeight: '500px' }}
            quality="100"
            src={data.cover}
            width={100000}
            height={100000}
            alt={data.title.english}
          />

          {/* todo: start or continue watching by tracking user watch progress? */}
          <Button size={['xs',null,'sm',null,'md',null,'lg']} alignSelf="center" onClick={() => handleStartWatching(data.episodes[0], 0)}>
            Start Watching
          </Button>

          {/* tabs in larger display */}
          <Show above="md">
            <Tabs overflow="scroll" isFitted variant="enclosed" size="sm">
              <TabList>
                <Tab>About</Tab>
                <Tab>Episodes</Tab>
                <Tab>Characters</Tab>
                <Tab>Related</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AboutInfo data={data} />
                </TabPanel>
                <TabPanel>
                  <EpisodeGrids animeID={id} episodes={data.episodes} />
                </TabPanel>
                <TabPanel display="flex" flexDirection="column" alignItems="center">
                  <CharactersInfo data={data} />
                </TabPanel>
                <TabPanel>
                  <RelatedInfo data={data} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Show>

          {/* accordions in smaller display */}
          <Show below="md">
            <Accordion allowToggle defaultIndex={0}>
              <AccordionItem>
                <AccordionButton>
                  About
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <AboutInfo data={data} />
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  Episodes
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <EpisodeGrids animeID={id} episodes={data.episodes} />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  Characters
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <CharactersInfo data={data} />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  Related
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <RelatedInfo data={data} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Show>
        </Stack>
      )}
    </Layout>
  )
}
