export async function getAllTopAnime() {
  try {
    let page = 1
    let ret: { id: string; title: string; image: string; url: string; genres: [string] }[] = []

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
  } catch (err) {
    console.log(err)
  }
}
