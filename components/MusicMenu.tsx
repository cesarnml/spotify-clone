import { Box, List } from '@chakra-ui/layout'
import { musicMenu } from 'config/menus'
import MenuItem from './MenuItem'

const NavMenu = () => {
  return (
    <Box marginBottom="20px">
      <List spacing={2}>
        {musicMenu.map((item) => (
          <MenuItem item={item} />
        ))}
      </List>
    </Box>
  )
}
export default NavMenu
