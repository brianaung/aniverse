import { useRouter } from "next/router"
import useSWR, { Fetcher } from 'swr'
import Image from "next/image"
import Link from "next/link"
import Layout from "../../../components/layout"

// fetcher for useSWR
const fetcher: Fetcher<
  { id: string; title: string; url: string; image: string; releaseDate: string; subOrDub: string }[],
  string
> = (arg: string) => fetch(arg).then((res) => res.json())

export default function Results() {
  const router = useRouter()
  // get .../search/anime/[query]
  const { query } = router.query
  const { data, error } = useSWR(`/api/search/anime/${query}`, fetcher)

  return (
    <Layout>
      <h2>results page</h2>
      <p>{query}</p>
      <section>
        <ul>
          {!error &&
            typeof data !== 'undefined' &&
            data.map((anime) => (
              <li key={anime.id}>
                {anime.title}
                <Image src={anime.image} height={180} width={180} alt={anime.title} />
              </li>
            ))}
        </ul>
      </section>
      <Link href='/'>Back to home</Link>
    </Layout>
  )
}
