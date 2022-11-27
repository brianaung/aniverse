import { IAnimeMinimalInfo, IAnimeRecentResults, IAnimeTopResults, PopularAnimes } from '../types'

// todo: using meta will remove the need for this function
export async function getCoverImage(id: string) {
  const res = await fetch(`https://api.consumet.org/anime/enime/${id}`)
  const animeData = await res.json()
  let coverImgUrl = 'https://i.animepahe.ru/covers/cover_default0.jpg'
  // return a default cover img
  if (animeData.results.length === 0) {
    return coverImgUrl
  }
  coverImgUrl = animeData.results[0].cover
  return coverImgUrl
}

/**
 * Fetch and return an array of all top trending animes
 */
export async function getAllTopAnime(page: string) {
  const res = await fetch(`https://api.consumet.org/anime/gogoanime/top-airing?page=${page}`)
  const topAnimes: IAnimeTopResults = await res.json()

  return topAnimes
}

export async function getAllTrendingAnime(page: string) {
  const res = await fetch(`https://api.consumet.org/anime/gogoanime/top-airing?page=${page}`)
  const trendingAnimes: IAnimeTopResults = await res.json()

  return trendingAnimes
}

export async function getAllPopularAnime(page: string) {
  const res = await fetch(`https://api.consumet.org/meta/anilist/popular?page=${page}`)
  const popularAnimes: PopularAnimes = await res.json()

  return popularAnimes
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
