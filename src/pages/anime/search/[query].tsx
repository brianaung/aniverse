import { useRouter } from 'next/router'
import useSWR, { Fetcher } from 'swr'
import Link from 'next/link'
import Layout from '../../../components/layout'
import AnimeItem from '../../../components/animeItem'
import AnimeListContainer from '../../../components/animeListContainer'

// fetcher for useSWR
const fetcher: Fetcher<
  { id: string; title: string; url: string; image: string; releaseDate: string; subOrDub: string }[],
  string
> = (arg: string) => fetch(arg).then((res) => res.json())

export default function Results() {
  const router = useRouter()
  // get .../search/anime/[query]
  const { query } = router.query
  const { data, error } = useSWR(`/api/anime/search/${query}`, fetcher)

  return (
    <Layout>
      <h2>results page</h2>
      <p>searching for: {query}</p>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Search not found.</p>}
      <AnimeListContainer>
        {data && !error && data.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
      </AnimeListContainer>
      <Link href="/">Back to home</Link>
    </Layout>
  )
}
