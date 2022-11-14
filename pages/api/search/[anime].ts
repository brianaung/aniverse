import { NextApiRequest, NextApiResponse } from "next";
import { getAnimeSearch } from "../../../lib/anime";

// todo: query string will be from req not hardcoded
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // req.query can be string || string[]
    const query: { anime: string } = Array.isArray(req.query) ? req.query[0] : req.query
    const queryResults = await getAnimeSearch(query.anime)
    return res.status(200).json(queryResults)
  } catch(err) {
    return res.status(500).json({ error: 'failed to load data' })
  }
}
