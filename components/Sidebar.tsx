import { Box, Divider } from '@chakra-ui/layout'
import MusicMenu from './MusicMenu'
import NavMenu from './NavMenu'
import PlayList from './PlayList'
import SidebarLogo from './SidebarLogo'

const Sidebar = () => {
  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
      <Box paddingY="20px" height="100%" border="2px solid blue">
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
