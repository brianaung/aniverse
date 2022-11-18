import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
import useSWRImmutable, { Fetcher } from 'swr'
import Layout from '../../../components/layout'
import Player from '../../../components/player'
import { IVideoSrc } from '../../../types'

type ApiDataType = {
  allSrc: IVideoSrc[]
  error: string
}
const fetcher: Fetcher<ApiDataType> = (arg: string) => fetch(arg).then((res) => res.json())
// do not revalidate data on...
const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
}

export default function VideoPage() {
  const router = useRouter()
  const { episode } = router.query
  // IMPORTANT: using normal useSWR will revalidate data (fetching again after intervals) causing the video src link to change
  const { data, error } = useSWRImmutable(episode ? `/api/anime/play/${episode}` : null, fetcher, options)

  return (
    <Layout>
      <h3>{episode}</h3>
      <section>
        {!data && !error && <p>Loading</p>}
        {!data && error && <p>Error loading video.</p>}
        {data && !error && <Player allSrc={data.allSrc} />}
      </section>
    </Layout>
  )
}
