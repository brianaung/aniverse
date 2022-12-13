import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
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
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AnimeItem from '../../../components/animeItem'
import AnimeListContainer from '../../../components/animeListContainer'
import CharactersList from '../../../components/charactersList'
import EpisodeGrids from '../../../components/episodeGrids'
import GenreTags from '../../../components/genreTags'
import Layout from '../../../components/layout'
import { getAnimeInfo } from '../../../lib/anime'
import { AnimeInfo } from '../../../types'

function AboutInfo({ data }: { data: AnimeInfo }) {
  return (
    <>
      <SimpleGrid mb="4" spacing={2} templateColumns="repeat(auto-fill, minmax(120px, 1fr))">
        <Center bg="primary.500" p=".5rem" flexDirection="column" border="solid 2px black">
          <Heading size="sm">Episodes</Heading>
          <Text as="i">{data.totalEpisodes}</Text>
        </Center>
        <Center bg="primary.500" p=".5rem" flexDirection="column" border="solid 2px black">
          <Heading size="sm">Rating</Heading>
          <Text textAlign="center" as="i">
            {data.rating}
          </Text>
        </Center>
        <Center bg="primary.500" p=".5rem" flexDirection="column" border="solid 2px black">
          <Heading size="sm">Popularity</Heading>
          <Text as="i">{data.popularity}</Text>
        </Center>
        <Center bg="primary.500" p=".5rem" flexDirection="column" border="solid 2px black">
          <Heading size="sm">Origin</Heading>
          <Text as="i">{data.countryOfOrigin}</Text>
        </Center>
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

export default function AnimeInfoPage({ data }: { data: AnimeInfo }) {
  const router = useRouter()

  const handleStartWatching = (index: number) => {
    router.push(`/anime/play/${data.id}?ep=${index}`)
  }

  return (
    <Layout>
      <Head>
        <title>
          {(data && data.title.english) || data.title.romaji || data.title.native || data.title.userPreferred}
        </title>
      </Head>
      <Stack width="100%" gap=".2rem">
        {/* anime info page drawer */}
        <Heading textTransform="uppercase" as="h1" size="xl">
          {data.title.english || data.title.native || data.title.romaji || data.title.userPreferred}
        </Heading>
        <GenreTags genres={data.genres} fontSize="sm" />
        <Text>
          {data.releaseDate} ({data.status})
        </Text>

        <Image
          style={{ border: 'solid 2px black', width: '100%', height: 'auto', minHeight: '120px', maxHeight: '500px' }}
          quality="100"
          src={data.cover}
          width={100000}
          height={100000}
          alt={data.title.english}
        />

        {/* todo: start or continue watching by tracking user watch progress? */}
        <Button
          size={['xs', null, 'sm', null, 'md', null, 'lg']}
          alignSelf="center"
          onClick={() => handleStartWatching(1)}>
          START WATCHING
        </Button>

        {/* tabs in larger display */}
        <Show above="md">
          <Tabs colorScheme="black" isFitted size="sm">
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
                <EpisodeGrids data={data} />
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
                <Box flex="1" textAlign="left">
                  About
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <AboutInfo data={data} />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Episodes
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <EpisodeGrids data={data} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Characters
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <CharactersInfo data={data} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Related
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <RelatedInfo data={data} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Show>
      </Stack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // caching
  // the cached value will be fresh for 1day(86400s), after that a revalidation request is needed to refresh to stale value. The stale value will still be usable if more req is made within 1hr(3600s) after becoming stale.
  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600')

  const { id } = Array.isArray(context.query) ? context.query[0] : context.query

  try {
    const { data, error } = await getAnimeInfo(id)
    if (error || !data) {
      return { notFound: true }
    }
    return {
      props: { data }
    }
  } catch (e) {
    return { notFound: true }
  }
}
