import { Button, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const genres = [
  'Action',
  'Adventure',
  'Cars',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mahou Shoujo',
  'Mecha',
  'Music',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller'
]

export default function GenreList() {
  const router = useRouter()

  const handleClick = (genre: string) => {
    router.push(`/anime/genre/${genre}`)
  }

  return (
    <Stack>
      <Text as="b">GENRES</Text>
      {genres.map((genre) => {
        return (
          <Button
            key={genre}
            variant={router.query.type === genre ? 'solid' : 'link'} // style active tab
            colorScheme="primary"
            color="fg.500"
            justifyContent="flex-start"
            fontWeight="400"
            onClick={() => handleClick(genre)}>
            {genre}
          </Button>
        )
      })}
    </Stack>
  )
}
