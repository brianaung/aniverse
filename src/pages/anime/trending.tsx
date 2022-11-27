// import utilStyles from '../../styles/utils.module.scss'
import { useEffect, useState } from 'react'
import AnimeItem from '../../components/animeItem'
import AnimeListContainer from '../../components/animeListContainer'
import Layout from '../../components/layout'
import { getTrendingAnimes } from '../../lib/anime'
import { TrendingAnimes } from '../../types'
import Pagination from '../../components/pagination'

export default function TrendingPage() {
  const [page, setPage] = useState('1')
  const [trendingList, setTrendingList] = useState<TrendingAnimes>()

  useEffect(() => {
    const fetchData = async (page: string) => {
      const data = await getTrendingAnimes(page)
      setTrendingList(data)
    }

    fetchData(page)
  }, [page])

  return (
    <Layout>
      <section>
        <AnimeListContainer>
          {!trendingList && <p>Loading</p>}
          {trendingList && trendingList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>
      {trendingList && <Pagination page={page} setPage={setPage} />}
    </Layout>
  )
}
