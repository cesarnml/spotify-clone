import { Box, Flex, Text } from '@chakra-ui/layout'
import PlayerControls from './PlayerControls'

const PlayerBar = () => {
  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        <Box padding="20px" color="white" width="25%">
          <Text fontSize="large">Song Name</Text>
          <Text fontSize="sm">Artist Name</Text>
        </Box>
        <Box width="50%">
          <PlayerControls />
        </Box>
        <Box width="25%">3rd column</Box>
      </Flex>
    </Box>
  )
}
export default PlayerBar
