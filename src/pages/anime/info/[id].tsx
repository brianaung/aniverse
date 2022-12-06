import {
  Button,
  Card,
  CardBody,
  Heading,
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
          <Button alignSelf="center" onClick={() => handleStartWatching(data.episodes[0], 0)}>
            Start Watching
          </Button>

          <Tabs overflow="scroll" isFitted variant="enclosed" size="sm">
            <TabList>
              <Tab>About</Tab>
              <Tab>Episodes</Tab>
              <Tab>Characters</Tab>
              <Tab>Related</Tab>
            </TabList>

            <TabPanels>
              {/* About */}
              <TabPanel>
                <SimpleGrid mb="4" spacing={2} templateColumns="repeat(auto-fill, minmax(130px, 1fr))">
                  <Card size="sm" align="center" variant="outline">
                    <CardBody>
                      <Heading size="sm">Episodes</Heading>
                      <Text as="i">{data.totalEpisodes}</Text>
                    </CardBody>
                  </Card>
                  <Card size="sm" align="center" variant="outline">
                    <CardBody>
                      <Heading size="sm">Rating</Heading>
                      <Text as="i">{data.rating}</Text>
                    </CardBody>
                  </Card>
                  <Card size="sm" align="center" variant="outline">
                    <CardBody>
                      <Heading size="sm">Popularity</Heading>
                      <Text as="i">{data.popularity}</Text>
                    </CardBody>
                  </Card>
                  <Card size="sm" align="center" variant="outline">
                    <CardBody>
                      <Heading size="sm">Season</Heading>
                      <Text as="i">{data.season}</Text>
                    </CardBody>
                  </Card>
                  <Card size="sm" align="center" variant="outline">
                    <CardBody>
                      <Heading size="sm">Origin</Heading>
                      <Text as="i">{data.countryOfOrigin}</Text>
                    </CardBody>
                  </Card>
                  <Card size="sm" align="center" variant="outline">
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

              {/* Episodes */}
              <TabPanel>
                {/* return a list of episodes */}
                <EpisodeGrids animeID={id} episodes={data.episodes} />
              </TabPanel>

              {/* Characters */}
              <TabPanel display="flex" flexDirection="column" alignItems="center">
                <CharactersList characters={data.characters} />
                <Text>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/search?q=List of ${data.title.english} Characters`}>
                    and more
                  </a>
                </Text>
              </TabPanel>

              {/* Related */}
              <TabPanel>
                <AnimeListContainer>
                  {data.recommendations.map((anime) => (
                    <AnimeItem key={anime.id} anime={anime} />
                  ))}
                </AnimeListContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      )}
    </Layout>
  )
}
