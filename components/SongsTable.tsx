import { Box } from '@chakra-ui/layout'
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { Artist, Song } from '@prisma/client'
import { FC } from 'react'
import { formatDate, formatTime } from '@lib/formatters'
import { useStoreActions } from '@lib/store'

type Props = {
  songs: (Song & { artist: Artist })[]
}

const SongsTable: FC<Props> = ({ songs }) => {
  const setActiveSongs = useStoreActions((store) => store.changeActiveSongs)
  const setActiveSong = useStoreActions((store) => store.changeActiveSong)

  const handlePlay = (activeSong?: Song) => {
    setActiveSong(activeSong ?? songs[0])
    setActiveSongs(songs)
  }

  return (
    <Box bg="transparent">
      <Box padding="10px" marginBottom="20px" color="whiteAlpha.700">
        <Box marginBottom="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="green"
            size="lg"
            isRound
            aria-label="play"
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => (
              <Tr
                onClick={() => handlePlay(song)}
                cursor="pointer"
                key={song.id}
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    bg: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
export default SongsTable
