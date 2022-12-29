import prisma from '@lib/prima'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

type ErrorMessage = {
  error: string
}

type Data = {
  message: string
}

const cookieAndTokenMaxAge = 8 * 60 * 60 // 8 hours

export default async (req: NextApiRequest, res: NextApiResponse<Data | ErrorMessage>) => {
  const salt = bcrypt.genSaltSync()
  const { email, password, verifyPassword } = req.body

  if (password !== verifyPassword) {
    return res.status(401).json({ error: 'Passwords must match.' })
  }

  if (!email || !password) {
    return res.status(401).json({ error: 'Email and password are required.' })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        iat: Date.now(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: cookieAndTokenMaxAge,
      },
    )

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('TRAX_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: cookieAndTokenMaxAge,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      }),
    )
    return res.status(201).json({
      message: 'Sign in successful.',
    })
  } catch (e) {
    return res.status(401).json({ error: 'E-mail already in use.' })
  }
}
