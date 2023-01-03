import { Flex, Box } from '@chakra-ui/layout'

const GradientLayout = ({ color, children, image, subtitle, title, description, isRoundedImage }) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75% )`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end"></Flex>
    </Box>
  )
}
export default GradientLayout
