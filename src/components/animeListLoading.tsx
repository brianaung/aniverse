import { Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

function AnimeItemSkeleton() {
  return (
    <Stack
      w={['130px', '140px', '150px', '170px', '180px', '190px']}
      h={['190px', '200px', '210px', '230px', '250px', '270px']}>
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
  const AnimeListContainer = dynamic(() => import('./animeListContainer'), { ssr: false })
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
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
      <AnimeItemSkeleton />
    </AnimeListContainer>
  )
}
