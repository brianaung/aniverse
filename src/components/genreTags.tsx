import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import styles from './genreTags.module.scss'

export default function GenreTags({ genres, fontSize }: { genres: string[]; fontSize: string }) {
  const router = useRouter()
  const handleClick = (genre: string) => {
    router.push(`/anime/genre/${genre}`)
  }
  return (
    <div className={styles.container}>
      {genres.map((genre) => (
        <div onClick={() => handleClick(genre)} className={styles.pill} key={genre}>
          <Text as="b" fontSize={fontSize} color="black">
            {genre}
          </Text>
        </div>
      ))}
    </div>
  )
}
