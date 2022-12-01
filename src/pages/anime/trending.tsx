// import utilStyles from '../../styles/utils.module.scss'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import AnimeItem from '../../components/animeItem'
import AnimeListContainer from '../../components/animeListContainer'
import Layout from '../../components/layout'
import Pagination from '../../components/pagination'
import { getTrendingAnimes } from '../../lib/anime'
import { TrendingAnimes } from '../../types'

const perPage = 14

export default function TrendingPage() {
  const [page, setPage] = useState(1)
  const [trendingList, setTrendingList] = useState<TrendingAnimes | null>()
  const [error, setError] = useState<Error | null>()

  useEffect(() => {
    const fetchData = async (page: number) => {
      const { data, error } = await getTrendingAnimes(page, perPage)
      if (!data) {
        setError(error)
        console.log(`[Fetch Data @ page ${page}] ` + error.message)
      } else {
        setTrendingList(data)
      }
    }

    fetchData(page)
  }, [page])

  return (
    <Layout>
      <Head>
        <title>popular animes</title>
      </Head>
      <section>
        <AnimeListContainer>
          {!trendingList && !error && <p>Loading</p>}
          {!trendingList && error && <p>Error loading data.</p>}
          {trendingList && !error && trendingList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>
      {trendingList && <Pagination page={page} setPage={setPage} />}
    </Layout>
  )
}
