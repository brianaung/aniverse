import utilStyles from '../../styles/utils.module.scss'
import { useEffect, useState } from "react";
import AnimeItem from "../../components/animeItem";
import AnimeListContainer from "../../components/animeListContainer";
import Layout from "../../components/layout";
import { getAllRecentAnime } from "../../lib/anime";
import { IAnimeRecentResults } from "../../types";

export default function RecentPage() {
  const [page, setPage] = useState('1')
  const [topList, setTopList] = useState<IAnimeRecentResults>()

  useEffect(() => {
    const fetchData = async (page: string) => {
      const data = await getAllRecentAnime(page)
      setTopList(data)
    }

    fetchData(page)
  }, [page])

  return (
    <Layout>
      <section>
        <AnimeListContainer>
          {topList && topList.results.map((anime) => <AnimeItem key={anime.id} anime={anime} />)}
        </AnimeListContainer>
      </section>
      <div className={utilStyles.navBtnContainer}>
        <button className={utilStyles.navBtn} onClick={() => setPage(Math.max(1, (parseInt(page) - 1)).toString())}>prev</button>
        <button className={utilStyles.navBtn} onClick={() => setPage((parseInt(page) + 1).toString())}>next</button>
      </div>
    </Layout>
  )
}
