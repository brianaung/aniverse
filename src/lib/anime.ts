import { IAnimeMinimalInfo, IAnimeTopInfo } from '../types'

/**
 * Fetch and return an array of all top trending animes
 */
export async function getAllTopAnime() {
  try {
    let page = 1
    const ret: IAnimeTopInfo[] = []

    // recusively fetch top animes from all pages
    const fetchData = async (page: number) => {
      const res = await fetch(`https://api.consumet.org/anime/gogoanime/top-airing?page=${page}`)
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
  } catch (err: any) {
    console.log(err.message)
  }
}

/**
 * Fetch and return an array of all matching animes that the user queried.
 * @param query - The user query string.
 */
export async function getAnimeSearch(query: string) {
  let page = 1
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
