import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import styles from './player.module.scss'

export default function Player({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

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
  }, [videoRef])

  return (
    <div className={styles.container}>
      <video className={styles.player} ref={videoRef} />
    </div>
  )
}
