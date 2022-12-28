import { Box, LinkOverlay, List, ListIcon, ListItem } from '@chakra-ui/layout'
import Image from 'next/image'
import Link from 'next/link'
import { MdHome, MdSearch, MdLibraryMusic } from 'react-icons/md'

const navMenu = [
  { name: 'Home', icon: MdHome, route: '/' },
  { name: 'Search', icon: MdSearch, route: '/search' },
  { name: 'Your Library', icon: MdLibraryMusic, route: '/library' },
]

const Sidebar = () => {
  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px" color="gray">
      <Box paddingY="20px">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <Image src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menuItem) => (
              <ListItem paddingX="20px" fontSize="16px" key={menuItem.name}>
                <Link href={menuItem.route} passHref>
                  <LinkOverlay>
                    <ListIcon as={menuItem.icon} color="white" marginRight="20px" />
                    {menuItem.name}
                  </LinkOverlay>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
