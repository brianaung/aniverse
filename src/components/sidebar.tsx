import { Heading, Stack } from '@chakra-ui/react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <Stack gap=".2rem">
      <Link href="/">Home</Link>
      <Stack gap=".2rem">
        <Heading as="h3" size="sm">
          ANIME
        </Heading>
        <Link href="/anime/popular">Most Popular</Link>
        <Link href="/anime/trending">Trending Now</Link>
        <Link href="/">New Releases</Link>
      </Stack>
    </Stack>
  )
}
