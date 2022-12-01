// import utilStyles from '../../styles/utils.module.scss'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import AnimeItem from '../../components/animeItem'
import AnimeListContainer from '../../components/animeListContainer'
import Layout from '../../components/layout'
import Pagination from '../../components/pagination'
import { getPopularAnimes } from '../../lib/anime'
import { PopularAnimes } from '../../types'

const perPage = 14

export default function PopularPage() {
  const [page, setPage] = useState(1)
  const [popularList, setPopularList] = useState<PopularAnimes>()
  const [error, setError] = useState<Error | null>()

  useEffect(() => {
    const fetchData = async (page: number) => {
      const { data, error } = await getPopularAnimes(page, perPage)
      if (!data) {
        setError(error)
        console.log(`[Fetch Data @ page ${page}] ` + error.message)
      } else {
        setPopularList(data)
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
          {!popularList && !error && <p>Loading</p>}
          {!popularList && error && <p>Error loading data.</p>}
          {popularList && !error && popularList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>
      {/* add hasnextpage check */}
      {popularList && <Pagination page={page} setPage={setPage} />}
    </Layout>
  )
}
