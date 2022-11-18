import { NextApiRequest, NextApiResponse } from 'next'
import { getCoverImage } from '../../../../lib/anime'
import { IAnimeExtendedInfo } from '../../../../types'

/**
 * Fetch extended anime info for unique info page
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: { id: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const id = query.id
  const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`)

  const cover = await getCoverImage(id)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()
  const animeData: IAnimeExtendedInfo = {
    cover,
    ...data
  }

  return res.status(200).json(animeData)
}
