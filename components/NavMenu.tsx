import { Box, List } from '@chakra-ui/layout'
import { navMenu } from 'config/menus'
import MenuItem from './MenuItem'

const NavMenu = () => {
  return (
    <Box marginBottom="20px">
      <List spacing={2}>
        {navMenu.map((item) => (
          <MenuItem item={item} />
        ))}
      </List>
    </Box>
  )
}
export default NavMenu
