import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";

const fetcher: Fetcher = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeInfoPage() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(`/api/anime/info/${id}`, fetcher)
  console.log(data)

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
    </Layout>
  )
}
