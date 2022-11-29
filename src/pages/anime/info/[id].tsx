import utilStyles from '../../../styles/utils.module.scss'
import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { AnimeEpisode, AnimeInfo } from '../../../types'
import Image from 'next/image'
// import {PlayCircle} from '@styled-icons/bootstrap/PlayCircle'
import { PlayCircle } from '@styled-icons/material-twotone/PlayCircle'

const fetcher: Fetcher<AnimeInfo, string> = (arg: string) => fetch(arg).then((res) => res.json())

export default function AnimeInfoPage() {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(id ? `/api/anime/info/${id}` : null, fetcher)

  const handlePlay = (ep: AnimeEpisode, index: number) => {
    router.push({
      pathname: `/anime/play`,
      query: {
        animeID: id,
        ep: JSON.stringify(ep),
        index
      }
    })
  }

  return (
    <Layout>
      {!data && !error && <p>Loading</p>}
      {!data && error && <p>Something went wrong, please try again later.</p>}
      {data && !error && (
        <>
          {/* display anime meta data */}
          <Image src={data.cover} width={240} height={80} layout='responsive' alt={data.title.userPreferred} />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h1>{data.title.english} [{data.title.native}]</h1>
            <h3>{data.releaseDate} ({data.status}) | <span style={{fontSize:'18px', fontWeight:'normal'}}>{data.totalEpisodes} episodes</span></h3>
          </div>
          {/* todo: style genres into tags */}
          <div style={{display:'flex',gap:'.5rem'}}>{data.genres.map(genre => <p>{genre}</p>)}</div>

          <p dangerouslySetInnerHTML={{ __html: data.description }} />

          {/* return a list of episodes */}
          <div className={utilStyles.btnListContainer}>
            {data.episodes.map((ep, index) => (
              <div className={utilStyles.playBtn} key={ep.id} onClick={() => handlePlay(ep, index)}>
                {/* episode image with play button icon */}
                <div style={{position:'relative'}}>
                  <Image src={ep.image} width={200} height={100} alt={ep.title} />
                  <PlayCircle style={{position:'absolute', top:'50%', left:'50%', marginLeft:'-25px', marginTop:'-25px'}} color='black' width={50} height={50} />
                </div>
                {/* ----------------------------------- */}
                <p>E{ep.number} - <span className={utilStyles.videoCaption}>{ep.title}</span></p>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  )
}
