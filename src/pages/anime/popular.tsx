// import utilStyles from '../../styles/utils.module.scss'
import { useEffect, useState } from 'react'
import AnimeItem from '../../components/animeItem'
import AnimeListContainer from '../../components/animeListContainer'
import Layout from '../../components/layout'
import { getPopularAnimes } from '../../lib/anime'
import { PopularAnimes } from '../../types'
import Pagination from '../../components/pagination'

/* todo: the first page should be statically generated? */
export default function PopularPage() {
  const [page, setPage] = useState('1')
  const [popularList, setPopularList] = useState<PopularAnimes>()

  useEffect(() => {
    const fetchData = async (page: string) => {
      const data = await getPopularAnimes(page)
      setPopularList(data)
    }

    fetchData(page)
  }, [page])

  return (
    <Layout>
      <section>
        <AnimeListContainer>
          {!popularList && <p>Loading</p>}
          {popularList && popularList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>
      {/* add hasnextpage check */}
      {popularList && <Pagination page={page} setPage={setPage} />}
    </Layout>
  )
}
