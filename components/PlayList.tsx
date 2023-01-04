import { List, ListItem, LinkBox, LinkOverlay, Box } from '@chakra-ui/layout'
import { usePlaylist } from '@lib/hooks'
import Link from 'next/link'

// const playlistList = new Array(50).fill(1).map((_, i) => `Playlist ${i + 1}`)

const PlayList = () => {
  const { playlists: playlistList } = usePlaylist()

  return (
    <Box flex="1 1 auto" overflowY="auto" paddingY="20px">
      <List spacing={2}>
        {playlistList?.map((playlist) => (
          <ListItem paddingX="20px" key={playlist.id}>
            <LinkBox>
              <Link href={`/playlist/${playlist.id}`} passHref>
                <LinkOverlay>{playlist.name}</LinkOverlay>
              </Link>
            </LinkBox>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
export default PlayList
