import { Box } from '@chakra-ui/layout'
import { ReactNode } from 'react'
import Sidebar from './Sidebar'

type Props = {
  children: ReactNode
}

const MusicPlayerLayout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" height="calc(100vh - 100px)" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0">
        Player
      </Box>
    </Box>
  )
}
export default MusicPlayerLayout
