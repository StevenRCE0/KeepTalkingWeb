// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    res.status(200).write(fs.readdirSync('../').toString())
}
