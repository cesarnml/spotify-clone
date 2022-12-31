import { Box, Flex } from '@chakra-ui/layout'
import { Button, Input } from '@chakra-ui/react'
import { auth } from '@lib/mutations'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Logo from './Logo'

type Props = {
  mode: 'signin' | 'signup'
}
const AuthForm = ({ mode }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    auth(mode, { email, password })
      .then((res) => res.json())
      .then(({ data }) => {
        router.push('/')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="whites">
      <Flex justify="center" align="center" height="100px">
        <Logo />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={onSubmit}>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" bg="green.500" isLoading={isLoading}>
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}
export default AuthForm
