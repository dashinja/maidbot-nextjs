import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const {bots} = prisma

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    bots.findFirst({
      orderBy: {
        workDone: 'desc'
      },
      select: {
        name: true,
        botType: true,
        workDone: true
      }
    })
      .then((result: any) => {
        if (result === null) {
          res.send('N/A')
        } else {
          res.json(result)
        }
      })
      .catch((err: Error) => console.error(err))
  }
  
}