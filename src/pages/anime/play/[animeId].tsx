import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Heading, Select, Skeleton, Stack, Text } from '@chakra-ui/react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { default as useSWRImmutable, Fetcher } from 'swr'
import Layout from '../../../components/layout'
import Player from '../../../components/player'
import { getAnimeInfo } from '../../../lib/anime'
import { AnimeEpisode, AnimeInfo, VideoSrc } from '../../../types'

type ApiDataType = {
  allSrc: VideoSrc[]
  error: string
}
const epFetcher: Fetcher<ApiDataType> = (arg: string) => fetch(arg).then((res) => res.json())
// do not revalidate data on...
const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
}

export default function VideoPage({ animeData }: { animeData: AnimeInfo }) {
  const router = useRouter()
  // ep:  1 2 3 4 ... (to display right ep number in url for UX)
  // idx: 0 1 2 3 ...
  const { ep } = Array.isArray(router.query) ? router.query[0] : router.query
  const index = parseInt(ep) - 1

  const episode = animeData ? animeData.episodes[index] : null

  // IMPORTANT: using normal useSWR will revalidate data (fetching again after intervals) causing the video src link to change
  const { data: epData, error: epError } = useSWRImmutable(
    episode ? `/api/anime/play/${episode.id}` : null,
    epFetcher,
    options
  )

  const [prev, setPrev] = useState<AnimeEpisode | null>(null)
  const [next, setNext] = useState<AnimeEpisode | null>(null)

  // check for prev and next episodes
  useEffect(() => {
    if (animeData) {
      const prev = animeData.episodes[index - 1]
      const next = animeData.episodes[index + 1]
      if (!prev && !next) {
        setPrev(null)
        setNext(null)
      } else if (!prev && next) {
        setPrev(null)
        setNext(next)
      } else if (prev && !next) {
        setPrev(prev)
        setNext(null)
      } else if (prev && next) {
        setNext(next)
        setPrev(prev)
      }
    }
  }, [animeData, index])

  const handleNext = () => {
    router.push(`/anime/play/${animeData.id}?ep=${parseInt(ep) + 1}`)
  }

  const handlePrev = () => {
    router.push(`/anime/play/${animeData.id}?ep=${parseInt(ep) - 1}`)
  }

  const handleSelectEp = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/anime/play/${animeData.id}?ep=${e.target.value}`)
  }

  return (
    <Layout>
      <Head>
        <title>
          {animeData && animeData.title.english} Ep{episode && episode.number}
        </title>
      </Head>
      {animeData && episode && (
        <>
          <Stack width="100%" m="1rem" spacing="1rem">
            <Heading as="h1" size="xl">
              <Link href={`/anime/info/${animeData.id}`}>{animeData.title.english}</Link>
            </Heading>
            <Heading as="h2" size="md">
              Episode {episode.number} - {episode.title} ({animeData.duration}mins)
            </Heading>
            <Text>{episode.description}</Text>
            {/* select episode in a dropdown selector */}
            <Stack alignSelf="center" direction="row" align="center">
              {prev && (
                <Button variant="ghost" onClick={handlePrev}>
                  <ArrowBackIcon />
                </Button>
              )}
              <Text>Episode</Text>
              <Select size="sm" value={episode.number} onChange={handleSelectEp}>
                {animeData && animeData.episodes.map((ep) => <option key={ep.id}>{ep.number}</option>)}
              </Select>
              {next && (
                <Button variant="ghost" onClick={handleNext}>
                  <ArrowForwardIcon />
                </Button>
              )}
            </Stack>
          </Stack>
          <Stack width="100%" align="center">
            {!epData && !epError && (
              <Skeleton
                alignSelf="center"
                mt="4"
                width={['90%', '80%', '70%', '60%', null, null]}
                height={['100px', '120px', '140px', '160px', '180px', '200px', '220px']}
              />
            )}
            {!epData && epError && <p>Error loading video.</p>}
            {epData && !epError && <Player allSrc={epData.allSrc} />}
          </Stack>
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // caching
  // the cached value will be fresh for 1day(86400s), after that a revalidation request is needed to refresh to stale value. The stale value will still be usable if more req is made within 1hr(3600s) after becoming stale.
  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600')

  const { animeId } = Array.isArray(context.query) ? context.query[0] : context.query

  try {
    const { data, error } = await getAnimeInfo(animeId)
    if (error || !data) {
      return { notFound: true }
    }
    return {
      props: { animeData: data }
    }
  } catch (e) {
    return { notFound: true }
  }
}
