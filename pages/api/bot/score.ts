import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import simpleCrypto from '../../../Utils/encrypt'


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
  } else if (req.method === 'POST') {
    const newValue = { workDone: req.body.workDone + 5 }

    bots.update({
      data: newValue,
      where: {
        name: simpleCrypto.encrypt(req.body.botName),
      }
    })
      .then((result: any) => {
        res.send(result)
      })
  }
  
}