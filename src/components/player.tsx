import styles from './player.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import { IVideoSrc } from '../types'

/**
 * returns the video src given the video quality.
 *
 * @param quality - video quality string: '360p', '720p', etc.
 * @param allSrc - available video sources.
 */
const getUrl = (quality: string, allSrc: IVideoSrc[]) => {
  let url = allSrc[0].url
  allSrc.forEach((src) => {
    if (src.quality === quality) {
      url = src.url
    }
  })
  return url
}

export default function Player({ allSrc }: { allSrc: [IVideoSrc] }) {
  const [quality, setQuality] = useState('default')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState(getUrl(quality, allSrc))

  // get new video src whenever the user changes video quality
  useEffect(() => {
    setSrc(getUrl(quality, allSrc))
  }, [quality, allSrc])

  // get the video player ready with the src available
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.controls = true

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // hls is automatically supported on safari
      video.src = src
    } else if (Hls.isSupported()) {
      // for other unsupported browsers use Hls.js
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else {
      // even Hls.js cant help you
      console.error('Stop using an old browser')
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

      <select onChange={handleQuality}>
        {allSrc.map((src) => (
          <>
            {src.quality === 'default' ? (
              <option selected key={src.quality} value={src.quality}>
                {src.quality}
              </option>
            ) : (
              <option key={src.quality} value={src.quality}>
                {src.quality}
              </option>
            )}
          </>
        ))}
      </select>
    </div>
  )
}
