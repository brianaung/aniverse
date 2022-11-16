import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: { episode: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const param = query.episode
  const response = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${param}`)

  // throw error if res is not ok
  // try catch can also be used if not using useSWR
  if (!response.ok) {
    throw new Error('An Error has occured')
  }

  // return data
  // todo: currently returning a first url (allow user to choose quality in the future
  const data = await response.json()
  return res.status(200).json({ allSrc: data.sources })
}
