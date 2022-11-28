import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Fetch video sources
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: { episode: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const id = query.episode
  const response = await fetch(`https://api.consumet.org/meta/anilist/watch/${id}`)

  // try catch can also be used if not using useSWR
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const videoData = await response.json()
  return res.status(200).json({ allSrc: videoData.sources })
}
