import { Heading, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()
  console.log(router.query)
  return (
    <Stack gap=".2rem" alignItems="center" justifyContent="center">
      <Stack gap=".2rem" pt="1rem">
        <Link href="/">Home</Link>
        <Heading as="h3" size="sm">
          ANIME
        </Heading>
        <Link href="/anime/popular">Most Popular</Link>
        <Link href="/anime/trending">Trending Now</Link>
        <Link href="/anime/genres">Genres</Link>
      </Stack>
    </Stack>
  )
}
