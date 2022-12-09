import { Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AnimeItem from '../../../components/animeItem'
import AnimeListContainer from '../../../components/animeListContainer'
import Layout from '../../../components/layout'
import Pagination from '../../../components/pagination'
import { getAnimeSearch } from '../../../lib/anime'
import { AnimeSearchResults } from '../../../types'

const perPage = 10

function AnimeItemSkeleton() {
  return (
    <Stack
      w={['100px', '120px', '140px', '160px', '180px', '200px']}
      h={['180px', '200px', '220px', '240px', '260px', '280px']}>
      <Skeleton w="100%%" h="100%" />
      <Skeleton w="80%" h=".5rem" />
      <Stack direction="row" justifyContent="space-between">
        <Skeleton w="30%" h=".5rem" />
        <Skeleton w="30%" h=".5rem" />
      </Stack>
      <Stack direction="row" justifyContent="flex-start" gap=".1rem">
        <SkeletonCircle size="3" />
        <SkeletonCircle size="3" />
        <SkeletonCircle size="3" />
        <SkeletonCircle size="3" />
      </Stack>
    </Stack>
  )
}

function LoadingSkeleton() {
  return (
    <AnimeListContainer>
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
    </AnimeListContainer>
  )
}

export default function SearchResultsPage() {
  const router = useRouter()
  const { query } = Array.isArray(router.query) ? router.query[0] : router.query
  // const { data, error } = useSWR(query ? `/api/anime/search/${query}` : null, fetcher)
  const [page, setPage] = useState(1)
  const [searchList, setSearchList] = useState<AnimeSearchResults | null>()
  const [error, setError] = useState<Error | null>()

  useEffect(() => {
    const fetchData = async (page: number) => {
      const { data, error } = await getAnimeSearch(query, page, perPage)
      if (!data) {
        setError(error)
        console.log('[Fetch Data] ' + error.message)
      } else {
        setSearchList(data)
      }
    }

    fetchData(page)
  }, [query, page])

  return (
    <Layout>
      <Head>
        <title>search results for {query}</title>
      </Head>
      <p>
        showing results for: <em>{query}</em>
      </p>
      <AnimeListContainer>
        {!searchList && !error && <LoadingSkeleton />}
        {!searchList && error && <p>Search not found.</p>}
        {searchList && !error && searchList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
      </AnimeListContainer>
      {searchList && <Pagination page={page} setPage={setPage} />}
    </Layout>
  )
}
