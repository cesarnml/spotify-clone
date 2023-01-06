import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const cookieAndTokenMaxAge = 8 * 60 * 60 // 8 hours

type ErrorMessage = {
  error: string
}

type Data = {
  message: string
  data?: Omit<User, 'password'> & { iat: number }
}

const handler = nextConnect<NextApiRequest, NextApiResponse<Data | ErrorMessage>>({
  onError: (err, req, res) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).end({ error: 'Something broke!' })
  },
  onNoMatch: (req, res) => {
    res.status(404).end({ error: 'No matching route.' })
  },
})

handler.post(async (req, res) => {
  const prisma = new PrismaClient()
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Check if user with provided email exists
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: 'Incorrect email or password' })
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect email or password' })
    }

    // Generate JWT
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      iat: Date.now(),
    }

    const secret = process.env.JWT_SECRET
    const options = { expiresIn: cookieAndTokenMaxAge }
    const token = jwt.sign(payload, secret, options)

    // Set JWT as a cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('TRAX_ACCESS_TOKEN', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: cookieAndTokenMaxAge,
        path: '/',
        sameSite: 'strict',
      }),
    )

    return res.status(200).json({ message: 'Sign in successful', data: payload })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default handler
