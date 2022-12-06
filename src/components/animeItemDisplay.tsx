import {
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import Image from 'next/image'
// import { SetStateAction } from "react";
import { AnimeResult } from "../types";
import { StarIcon } from '@chakra-ui/icons'
import styles from './animeItemDisplay.module.scss'

export default function AnimeItemDisplay({ anime, onOpen }: { anime: AnimeResult, onOpen: any}) {
  // calculate number of rating stars
  const ratingStars: number[] = [];
  for (let i = 0; i < Math.ceil(anime.rating / 20); i++) {
    ratingStars.push(i)
  }

  return (
    <div onClick={onOpen} className={styles.container}>
      <Stack bg='primary.500' border='solid 1px black' position='absolute' top='2%' right='3%' px='1'>
        <Text fontSize='xs' textTransform='uppercase' color='black'>{anime.status}</Text>
      </Stack>

      <Image className={styles.image} src={anime.image} height={240} width={180} alt={anime.title.english} />

      <Tooltip label={anime.title.english}>
        <Text as='b' fontSize='xs' noOfLines={1} textTransform="uppercase">
          {anime.title.english}
        </Text>
      </Tooltip>

      <Stack direction='row' justifyContent='space-between'>
        <Text fontSize='xs' noOfLines={1} textTransform="uppercase">
          {anime.type}
        </Text>
        <Text fontSize='xs' noOfLines={1} textTransform="uppercase">
          {anime.totalEpisodes} episodes
        </Text>
      </Stack>

      <Stack direction='row'>
      {ratingStars.map(i => (
        <StarIcon key={i} boxSize={3}/>
      ))}
      </Stack>
    </div>
  )
}
