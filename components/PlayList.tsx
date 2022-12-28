import { List, ListItem, LinkBox, LinkOverlay, Box } from '@chakra-ui/layout'
import Link from 'next/link'

const playlistList = new Array(50).fill(1).map((_, i) => `Playlist ${i + 1}`)

const PlayList = () => {
  return (
    <Box flex="1 1 auto" overflowY="auto" paddingY="20px">
      <List spacing={2}>
        {playlistList.map((playlist) => (
          <ListItem paddingX="20px" key={playlist}>
            <LinkBox>
              <Link href="/" passHref>
                <LinkOverlay>{playlist}</LinkOverlay>
              </Link>
            </LinkBox>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
export default PlayList
