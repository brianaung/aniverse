import { StarIcon } from '@chakra-ui/icons'
import { Stack, Text, Tooltip } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AnimeResult } from '../types'
import styles from './animeItem.module.scss'

export default function AnimeItem({ anime }: { anime: AnimeResult }) {
  const router = useRouter()

  // calculate the number of star ratings
  const ratingStars: number[] = []
  for (let i = 0; i < Math.ceil(anime.rating / 20); i++) {
    ratingStars.push(i)
  }

  return (
    <div onClick={() => router.push(`/anime/info/${anime.id}`)} className={styles.container}>
      {anime.status && (
        <Stack bg="primary.500" border="solid 2px black" position="absolute" top="2%" right="2%" px="1">
          <Text as="b" fontSize="xs" textTransform="lowercase" color="black">
            {anime.status}
          </Text>
        </Stack>
      )}

      <Image
        className={styles.animeImg}
        quality="100"
        src={anime.image}
        width={100000}
        height={100000}
        alt={anime.title.english}
      />

      <Tooltip textTransform="lowercase" label={anime.title.english}>
        <Text as="b" fontSize="xs" noOfLines={1} textTransform="uppercase">
          {anime.title.english || anime.title.native || anime.title.romaji || anime.title.userPreferred}
        </Text>
      </Tooltip>

      <Stack direction="row" justifyContent="space-between">
        <Text fontSize="xs" noOfLines={1} textTransform="uppercase">
          {anime.type}
        </Text>
        <Text fontSize="xs" noOfLines={1} textTransform="uppercase">
          {anime.totalEpisodes} episodes
        </Text>
      </Stack>

      <Stack direction="row">
        {ratingStars.map((i) => (
          <StarIcon key={i} boxSize={3} />
        ))}
      </Stack>
    </div>
  )
}
