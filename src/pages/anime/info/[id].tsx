import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { IAnimeInfo } from "../../../types";

const fetcher: Fetcher<IAnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeInfoPage() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(id ? `/api/anime/info/${id}` : null, fetcher)

  return (
    <Layout>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Error occured</p>}
      {data && !error && 
        <>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <p>{data.releaseDate}</p>
          <p>{data.totalEpisodes}</p>
        </>
      }
      <p>Testing video player</p>
      {data && !error && <button onClick={() => router.push(`/anime/player/${data.episodes[0].id}`)}>Play first episode</button>}
    </Layout>
  )
}
