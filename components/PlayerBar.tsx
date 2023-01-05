import { Box, Flex, Text } from '@chakra-ui/layout'
import { useStoreState } from '@lib/store'
import PlayerControls from './PlayerControls'

const PlayerBar = () => {
  const songs = useStoreState((state) => state.activeSongs)
  const activeSong = useStoreState((state) => state.activeSong)
  console.log('activeSong:', activeSong)

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        {activeSong ? (
          <Box padding="20px" color="white" width="25%">
            <Text fontSize="large">{activeSong?.name}</Text>
            <Text fontSize="sm">{activeSong?.artists?.name}</Text>
          </Box>
        ) : null}
        <Box width="50%">{activeSong ? <PlayerControls songs={songs} activeSong={activeSong} /> : null}</Box>
        <Box width="25%">3rd column</Box>
      </Flex>
    </Box>
  )
}
export default PlayerBar
