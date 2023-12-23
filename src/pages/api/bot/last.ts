import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '.prisma/client'
// import simpleCrypto from '../../../Utils/encrypt'

const prisma = new PrismaClient()
const { bots } = prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const result = await bots.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
    })
    res.send(result)
  }
}
