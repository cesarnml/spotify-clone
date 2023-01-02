import { Box, Divider } from '@chakra-ui/layout'
import Logo from './Logo'
import MusicMenu from './MusicMenu'
import NavMenu from './NavMenu'
import PlayList from './PlayList'

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="100%"
      bg="black"
      paddingX="5px"
      color="gray"
      display="flex"
      flexDirection="column"
      position="absolute"
    >
      <Box paddingTop="20px" display="flex" flexDirection="column" height="100%">
        <Logo />
        <NavMenu />
        <MusicMenu />
        <Divider color="gray.800" />
        <PlayList />
      </Box>
    </Box>
  )
}

export default Sidebar
