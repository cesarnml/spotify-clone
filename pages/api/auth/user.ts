import { validateRoute } from '@lib/auth'
import { User } from '@prisma/client'
import { NextApiRequest } from 'next'

export default validateRoute((req: NextApiRequest & { user?: User }, res) => {
  // Remove hash password before sending down user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = req.user as User
  return res.status(200).json(user)
})
