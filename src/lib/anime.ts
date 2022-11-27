import { PopularAnimes, TrendingAnimes } from '../types'

/**
 * Fetch and return an array of all top trending animes
 */
export async function getPopularAnimes(page: string) {
  const res = await fetch(`https://api.consumet.org/meta/anilist/popular?page=${page}`)
  const popularAnimes: PopularAnimes = await res.json()

  return popularAnimes
}

export async function getTrendingAnimes(page: string) {
  const res = await fetch(`https://api.consumet.org/meta/anilist/trending?page=${page}`)
  const trendingAnimes: TrendingAnimes = await res.json()

  return trendingAnimes
}

/**
 * Fetch and return an array of all matching animes that the user queried.
 * @param query - The user query string.
 */
/* export async function getAnimeSearch(query: string) {
  const page = 1
  const ret: IAnimeMinimalInfo[] = []

  const fetchData = async (page: number) => {
    const res = await fetch(`https://api.consumet.org/anime/gogoanime/${query}?page=${page}`)
    const data = await res.json()
    ret.push(...data.results)

    // base case
    if (!data.hasNextPage) {
      return ret
    }
    // recursive case
    if (data.hasNextPage) {
      page++
      await fetchData(page)
    }
  }
  await fetchData(page)
  return ret
} */
