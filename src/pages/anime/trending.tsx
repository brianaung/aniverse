import utilStyles from '../../styles/utils.module.scss'
import { useEffect, useState } from "react";
import AnimeItem from "../../components/animeItem";
import AnimeListContainer from "../../components/animeListContainer";
import Layout from "../../components/layout";
import { getAllTopAnime } from "../../lib/anime";
import { IAnimeTopResults } from "../../types";

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
      {topList &&
      <div className={utilStyles.navBtnContainer}>
        <button className={utilStyles.navBtn} onClick={() => setPage(Math.max(1, (parseInt(page) - 1)).toString())}>previous</button>
        <button className={utilStyles.navBtn} onClick={() => setPage((parseInt(page) + 1).toString())}>next</button>
      </div>
      }
    </Layout>
  )
}
