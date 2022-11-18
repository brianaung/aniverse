import utilStyles from '../../styles/utils.module.scss'
import { useEffect, useState } from 'react'
import AnimeItem from '../../components/animeItem'
import AnimeListContainer from '../../components/animeListContainer'
import Layout from '../../components/layout'
import { getAllRecentAnime } from '../../lib/anime'
import { IAnimeRecentResults } from '../../types'
import Pagination from '../../components/pagination'

export default function RecentPage() {
  const [page, setPage] = useState('1')
  const [recentList, setRecentList] = useState<IAnimeRecentResults>()

  useEffect(() => {
    const fetchData = async (page: string) => {
      const data = await getAllRecentAnime(page)
      setRecentList(data)
    }

    fetchData(page)
  }, [page])

  return (
    <Layout>
      <section>
        <AnimeListContainer>
          {recentList && recentList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>
      {recentList && <Pagination page={page} setPage={setPage} />}
    </Layout>
  )
}
