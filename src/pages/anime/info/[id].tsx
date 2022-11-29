import utilStyles from '../../../styles/utils.module.scss'
import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { AnimeEpisode, AnimeInfo } from '../../../types'
import Image from 'next/image'
// import {PlayCircle} from '@styled-icons/bootstrap/PlayCircle'
import { PlayCircle } from '@styled-icons/material-twotone/PlayCircle'

/* taken from stack overflow */
function pickContrastColor(bgColor: string, lightColor: string, darkColor: string) {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? darkColor : lightColor;
}

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
          <div style={{position:'relative',width:'100%', height:'auto', maxHeight:'500px', overflow:'hidden'}}>
            <Image style={{width:'100%', height:'auto'}} quality="100" src={data.cover} width={10000} height={100000} alt={data.title.english} />
            <a
              style={{
                all:'unset',
                cursor:'pointer',
                color: 'black',
                backgroundColor: '#e40059',
                padding: '.5rem 1rem',
                borderRadius: '9999px',
                border: 'solid 1px black',
                position:'absolute', top:'50%', left:'50%'
              }}
              href="#epSection">Watch now
            </a>
          </div>

          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <h1>{data.title.english}</h1>
            <h4>{data.releaseDate} ({data.status}) | {data.totalEpisodes} episodes</h4>
          </div>

          {/* todo: seperate genres into tags components */}
          <div style={{display:'flex',gap:'.5rem'}}>
            {data.genres.map(genre => 
              <div style={{
                backgroundColor:`${data.color}`,
                // filter: 'invert(100%)',
                color: pickContrastColor(`${data.color}`, 'white', 'black'),
                borderRadius:'9999px',
                border:'solid 1px',
                borderColor: pickContrastColor(`${data.color}`, 'white', 'black'),
                padding:'0 .5rem'}}>
                {genre}
              </div>
            )}
          </div>

          {/*{data.trailer && <iframe style={{all:'unset', width:'1200px', height:'500px'}} src={`https://www.youtube.com/embed/${data.trailer.id}?controls=0&disablekb=1&mute=1&autoplay=1&playlist=${data.trailer.id}&loop=1&cc_load_policy=3&iv_load_policy=3&modestbranding=0&rel=0`} />}
          */}
            <p style={{fontStyle:'italic'}} dangerouslySetInnerHTML={{ __html: data.description }} />

          {/* return a list of episodes */}
          <div id="epSection" className={utilStyles.btnListContainer}>
            {data.episodes.map((ep, index) => (
              <div className={utilStyles.playBtn} key={ep.id} onClick={() => handlePlay(ep, index)}>
                {/* episode image with play button icon */}
                <div style={{position:'relative'}}>
                  <Image src={ep.image} width={250} height={150} alt={ep.title} />
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
