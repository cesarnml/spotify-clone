import jwt from 'jsonwebtoken'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/prisma'
import { User } from '@prisma/client'

export const validateRoute = (handler: NextApiHandler) => {
  return async (req: NextApiRequest & { user?: User }, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET) as User
      const user = await prisma.user.findUnique({ where: { id } })
      if (!user) {
        throw new Error('User does not exist.')
      }
      req.user = user
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ error: 'Not authorized' })
    }
  }
}

export const validateToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET) as User
