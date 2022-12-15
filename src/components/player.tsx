import { Stack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { VideoSrc } from '../types'
import styles from './player.module.scss'

/**
 * returns the video src given the video quality.
 *
 * @param quality - video quality string: '360p', '720p', etc.
 * @param allSrc - available video sources.
 */
const getUrl = (quality: string, allSrc: VideoSrc[]) => {
  let url = allSrc[0].url
  allSrc.forEach((src) => {
    if (src.quality === quality) {
      url = src.url
    }
  })
  return url
}

export default function Player({ allSrc }: { allSrc: VideoSrc[] }) {
  const [quality, setQuality] = useState('default')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState(getUrl(quality, allSrc))

  // get new video src whenever the user changes video quality
  useEffect(() => {
    console.log(quality)
    setSrc(getUrl(quality, allSrc))
  }, [quality, allSrc])

  // get the video player ready with the src available
  useEffect(() => {
    const initPlayer = async () => {
      // dynamically import Hls.js
      const Hls = (await import('hls.js')).default
      const video = videoRef.current
      if (!video) {
        return
      }

      video.controls = true

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // hls is automatically supported on safari
        video.src = src
      } else if (Hls.isSupported()) {
        // for other unsupported browsers use Hls.js
        const hls = new Hls()
        if (hls) {
          hls.loadSource(src)
          hls.attachMedia(video)
        }
      }
    }
    initPlayer()
  }, [src, videoRef])

  const handleQuality = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuality(e.target.value)
  }

  return (
    <Stack position="relative" align="center" w={['90%', '80%', '70%', '60%', null, null]}>
      <video className={styles.player} ref={videoRef} />
      <select
        style={{
          all: 'unset',
          color: 'white',
          backgroundColor: 'black',
          borderRadius: '9999px',
          padding: '.1rem .5rem',
          position: 'absolute',
          top: '1%',
          right: '1%'
        }}
        value={quality}
        onChange={handleQuality}>
        {allSrc.map((src) => (
          <option key={src.url} value={src.quality}>
            {src.quality}
          </option>
        ))}
      </select>
    </Stack>
  )
}
