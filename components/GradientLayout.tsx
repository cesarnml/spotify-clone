import { Flex, Box, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  color: string
  children: ReactNode
  image: string
  subtitle: string
  title: string
  description: string
  isRoundedImage?: boolean
}

const GradientLayout = ({ color, children, image, subtitle, title, description, isRoundedImage }: Props) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={isRoundedImage ? '100%' : '3px'}
            alt="avatar"
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
