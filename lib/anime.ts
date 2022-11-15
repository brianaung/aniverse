export async function getAllTopAnime() {
  try {
    let page = 1
    const ret: { id: string; title: string; image: string; url: string; genres: [string] }[] = []

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

export async function getAnimeSearch(query: string) {
  try {
    // tmp search string
    // const query = "gintama"
    let page = 1
    const ret: { id: string; title: string; image: string; releaseDate: string; subOrDub: string }[] = []

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
  } catch (err: any) {
    console.log(err.message)
  }
}
