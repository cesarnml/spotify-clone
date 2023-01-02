import prisma from '@lib/prisma'
import { validateRoute } from '@lib/auth'
import { NextApiRequest } from 'next'
import { User } from '@prisma/client'

export default validateRoute(async (req: NextApiRequest & { user?: User }, res) => {
  const playlists = await prisma.playlist.findMany({ where: { userId: req.user.id }, orderBy: [{ name: 'asc' }] })
  return res.status(200).json(playlists)
})
