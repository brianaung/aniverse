import { Heading } from '@chakra-ui/react'
import GenreTags from '../../components/genreTags'
import Layout from '../../components/layout'

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

export default function GenresPage() {
  return (
    <Layout>
      <Heading mb="2rem">List of Anime Genres</Heading>
      <GenreTags genres={genres} fontSize="lg" />
    </Layout>
  )
}
