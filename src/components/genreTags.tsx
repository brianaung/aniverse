import { Text } from '@chakra-ui/react'
import styles from './genreTags.module.scss'

export default function GenreTags({ genres }: { genres: string[] }) {
  return (
    <div className={styles.container}>
      {genres.map((genre) => (
        <div className={styles.pill} key={genre}>
          <Text fontSize="sm" color="black">
            {genre}
          </Text>
        </div>
      ))}
    </div>
  )
}
