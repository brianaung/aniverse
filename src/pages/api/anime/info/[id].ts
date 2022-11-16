import { NextApiRequest, NextApiResponse } from 'next'
import { IAnimeExtendedInfo } from '../../../../types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query: { id: string } = Array.isArray(req.query) ? req.query[0] : req.query
  const id = query.id
  const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`)

  if (!response.ok) {
    throw new Error('An Error has occured')
  }

  const data: IAnimeExtendedInfo = await response.json()

  return res.status(200).json(data)
}
