import { AnimeInfo, AnimeResult, AnimeSearchResults, PopularAnimes, TrendingAnimes } from '../types'

/**
 * Fetch and return an array of all top trending animes
 */
export async function getPopularAnimes(page: number, perPage: number) {
  const res = await fetch(`https://api.consumet.org/meta/anilist/popular?page=${page}&perPage=${perPage}`)
  if (!res.ok) {
    return {
      data: null,
      error: new Error(res.statusText)
    }
  }
  const popularAnimes: PopularAnimes = await res.json()

  return {
    data: popularAnimes,
    error: null
  }
}

export async function getTrendingAnimes(page: number, perPage: number) {
  const res = await fetch(`https://api.consumet.org/meta/anilist/trending?page=${page}&perPage=${perPage}`)
  if (!res.ok) {
    return {
      data: null,
      error: new Error(res.statusText)
    }
  }
  const trendingAnimes: TrendingAnimes = await res.json()

  return {
    data: trendingAnimes,
    error: null
  }
}

/**
 * Fetch and return an array of all matching animes that the user queried.
 * Filter the search results to only contain relevant ones
 * @param query - The user query string.
 */
// todo: improve search results
export async function getAnimeSearch(query: string, page: number) {
  const filteredList: AnimeResult[] = []

  const res = await fetch(
    `https://api.consumet.org/meta/anilist/advanced-search?query=${query}&page=${page}&sort=["POPULARITY_DESC", "UPDATED_AT_DESC", "SCORE_DESC", "FAVOURITES", "UPDATED_AT", "START_DATE_DESC", "END_DATE_DESC"]`
  )
  if (!res.ok) {
    return {
      data: null,
      error: new Error(res.statusText)
    }
  }

  const data = await res.json()

  for (let i = 0; i < data.results.length; i++) {
    const anime: AnimeInfo = data.results[i]
    if (anime.cover && anime.title.native && anime.title.romaji && anime.title.english && anime.title.userPreferred) {
      filteredList.push(data.results[i])
    }
  }

  return {
    data: { ...data, results: filteredList } as AnimeSearchResults,
    error: null
  }
}
