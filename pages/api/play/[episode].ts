import { NextApiRequest, NextApiResponse } from 'next'

// todo: query string will be from req not hardcoded
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const query: { query: string } = Array.isArray(req.query) ? req.query[0] : req.query
    const queryResult = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${query}`)
    const data = await queryResult.json()
    // todo: currently returning a first url (allow user to choose quality in the future
    return res.status(200).json(data.sources[0].url)
  } catch (err) {
    return res.status(500).json({ error: 'failed to load data' })
  }
}
