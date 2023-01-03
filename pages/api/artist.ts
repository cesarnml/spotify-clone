import prisma from '@lib/prisma'
import { validateRoute } from '@lib/auth'
import { NextApiRequest } from 'next'
import { User } from '@prisma/client'

export default validateRoute(async (req: NextApiRequest & { user?: User }, res) => {
  const artists = await prisma.artist.findMany()
  return res.status(200).json(artists)
})
