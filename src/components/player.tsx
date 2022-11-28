import styles from './player.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { VideoSrc } from '../types'

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
  }, [src, videoRef])

  const handleQuality = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuality(e.target.value)
  }

  return (
    <div className={styles.container}>
      <main>
        <video className={styles.player} ref={videoRef} />
      </main>

      <p>Current quality: {quality}</p>

      <select value={quality} onChange={handleQuality}>
        {allSrc.map((src) => (
          <option key={src.url} value={src.quality}>
            {src.quality}
          </option>
        ))}
      </select>
    </div>
  )
}
