import { AnimeInfo, AnimeSearchResults, PopularAnimes, TrendingAnimes } from '../types'

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
export async function getAnimeSearch(query: string, page: number, perPage: number) {
  // const filteredList: AnimeResult[] = []

  const res = await fetch(
    `https://api.consumet.org/meta/anilist/advanced-search?query=${query}&page=${page}&perPage=${perPage}&sort=["POPULARITY_DESC", "UPDATED_AT_DESC", "SCORE_DESC", "FAVOURITES", "UPDATED_AT", "START_DATE_DESC", "END_DATE_DESC"]`
  )
  if (!res.ok) {
    return {
      data: null,
      error: new Error(res.statusText)
    }
  }

  const data: AnimeSearchResults = await res.json()

  /* if (data.results) {
    for (let i = 0; i < data.results.length; i++) {
      const anime: AnimeInfo = data.results[i]
      if (anime.cover && anime.title.native && anime.title.romaji && anime.title.english && anime.title.userPreferred) {
        filteredList.push(data.results[i])
      }
    }
  } */

  return {
    // data: { ...data, results: filteredList } as AnimeSearchResults,
    data,
    error: null
  }
}

export async function getAnimeInfo(id: string) {
  const res = await fetch(`https://api.consumet.org/meta/anilist/info/${id}`)
  if (!res.ok) {
    return {
      data: null,
      error: new Error(res.statusText)
    }
  }
  const data: AnimeInfo = await res.json()

  return {
    data,
    error: null
  }
}
