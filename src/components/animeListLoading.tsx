import { Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import AnimeListContainer from './animeListContainer'

function AnimeItemSkeleton() {
  return (
    <Stack
      w={['100px', '120px', '140px', '160px', '180px', '200px']}
      h={['180px', '200px', '220px', '240px', '260px', '280px']}>
      <Skeleton w="100%%" h="100%" />
      <Skeleton w="80%" h=".5rem" />
      <Stack direction="row" justifyContent="space-between">
        <Skeleton w="30%" h=".5rem" />
        <Skeleton w="30%" h=".5rem" />
      </Stack>
      <Stack direction="row" justifyContent="flex-start" gap=".1rem">
        <SkeletonCircle size="3" />
        <SkeletonCircle size="3" />
        <SkeletonCircle size="3" />
        <SkeletonCircle size="3" />
      </Stack>
    </Stack>
  )
}

export default function AnimeListLoading() {
  return (
    <AnimeListContainer>
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
    </AnimeListContainer>
  )
}
