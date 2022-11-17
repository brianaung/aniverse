import { useRouter } from 'next/router'
import useSWRImmutable, { Fetcher } from 'swr'
import Layout from '../../../components/layout'
import Player from '../../../components/player'
import { IVideoSrc } from '../../../types'

const fetcher: Fetcher<{ allSrc: IVideoSrc[]; error: string }> = (arg: string) => fetch(arg).then((res) => res.json())
// do not revalidate data on...
const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}

export default function VideoPage() {
  const router = useRouter()
  const { episode } = router.query
  // IMPORTANT: using normal useSWR will revalidate data (fetching again after intervals) causing the video src link to change
  const { data, error } = useSWRImmutable(episode ? `/api/anime/play/${episode}` : null, fetcher, options)

  return (
    <Layout>
      <section>
        {!data && !error && <p>Loading</p>}
        {!data && error && <p>Error loading video.</p>}
        {data && !error && <Player allSrc={data.allSrc} />}
      </section>
    </Layout>
  )
}
