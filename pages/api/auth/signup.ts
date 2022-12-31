import prisma from '@lib/prisma'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

type ErrorMessage = {
  error: string
}

type Data = {
  message: string
  data: Omit<User, 'password'> & { iat: number }
}

const cookieAndTokenMaxAge = 8 * 60 * 60 // 8 hours

const handler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorMessage>) => {
  const salt = bcrypt.genSaltSync()
  const { email, password } = req.body

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

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      iat: Date.now(),
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: cookieAndTokenMaxAge,
    })

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
      data: payload,
    })
  } catch (e) {
    return res.status(401).json({ error: 'E-mail already in use.' })
  }
}

export default handler
