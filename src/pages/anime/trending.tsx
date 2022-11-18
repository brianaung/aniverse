import utilStyles from '../../styles/utils.module.scss'
import { useEffect, useState } from 'react'
import AnimeItem from '../../components/animeItem'
import AnimeListContainer from '../../components/animeListContainer'
import Layout from '../../components/layout'
import { getAllTopAnime } from '../../lib/anime'
import { IAnimeTopResults } from '../../types'
import Pagination from '../../components/pagination'

/* todo: the first page should be statically generated? */
export default function TrendingPage() {
  const [page, setPage] = useState('1')
  const [topList, setTopList] = useState<IAnimeTopResults>()

  useEffect(() => {
    const fetchData = async (page: string) => {
      const data = await getAllTopAnime(page)
      setTopList(data)
    }

    fetchData(page)
  }, [page])

  return (
    <Layout>
      <section>
        {/* todo: no need for loading state since it is rendered on server side? */}
        <AnimeListContainer>
          {topList && topList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>
      {topList && <Pagination page={page} setPage={setPage} />}
    </Layout>
  )
}
