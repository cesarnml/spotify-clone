import { Box, Divider } from '@chakra-ui/layout'
import MusicMenu from './MusicMenu'
import NavMenu from './NavMenu'
import PlayList from './PlayList'
import SidebarLogo from './SidebarLogo'

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
        <SidebarLogo />
        <NavMenu />
        <MusicMenu />
        <Divider color="gray.800" />
        <PlayList />
      </Box>
    </Box>
  )
}

export default Sidebar
