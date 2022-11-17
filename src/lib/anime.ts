import { IAnimeMinimalInfo, IAnimeRecentResults, IAnimeTopResults } from '../types'

/**
 * Fetch and return an array of all top trending animes
 */
export async function getAllTopAnime(page: string) {
  const res = await fetch(`https://api.consumet.org/anime/gogoanime/top-airing?page=${page}`)
  const topAnimes: IAnimeTopResults = await res.json()

  return topAnimes
}

export async function getAllRecentAnime(page: string) {
  const res = await fetch(`https://api.consumet.org/anime/gogoanime/recent-episodes?type=1&page=${page}`)
  const recentAnimes: IAnimeRecentResults = await res.json()

  return recentAnimes
}

/**
 * Fetch and return an array of all matching animes that the user queried.
 * @param query - The user query string.
 */
export async function getAnimeSearch(query: string) {
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
}
