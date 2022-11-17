import { useRouter } from 'next/router'
import useSWR, { Fetcher } from 'swr'
import Link from 'next/link'
import Layout from '../../../components/layout'
import AnimeItem from '../../../components/animeItem'
import AnimeListContainer from '../../../components/animeListContainer'
import { IAnimeMinimalInfo } from '../../../types'

// fetcher for useSWR
const fetcher: Fetcher<[IAnimeMinimalInfo], string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function SearchResultsPage() {
  const router = useRouter()
  // get .../search/anime/[query]
  const { query } = router.query
  const { data, error } = useSWR(query ? `/api/anime/search/${query}` : null, fetcher)

  return (
    <Layout>
      <p>showing results for: <em>{query}</em></p>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Search not found.</p>}
      <AnimeListContainer>
        {data && !error && data.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
      </AnimeListContainer>
      <Link href="/">Back to home</Link>
    </Layout>
  )
}