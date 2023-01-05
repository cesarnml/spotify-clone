import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import { FC, useEffect, useRef, useState } from 'react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'
import { SongWithArtist, useStoreActions } from '@lib/store'
import { Artist, Song } from '@prisma/client'

type Props = {
  songs: SongWithArtist[]
  activeSong: SongWithArtist | null
}

const PlayerControls: FC<Props> = ({ songs, activeSong }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [playlistIndex, setPlaylistIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  return (
    <Box>
      <Box>
        <ReactHowler playing={isPlaying} src={activeSong?.url} />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            color={isShuffle ? 'white' : 'gray.600'}
            onClick={() => setIsShuffle((prev) => !prev)}
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
          />
          {isPlaying ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setIsPlaying(true)}
            />
          )}
          <IconButton outline="none" variant="link" aria-label="skip next" fontSize="24px" icon={<MdSkipNext />} />
          <IconButton
            color={isRepeat ? 'white' : 'gray.600'}
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            icon={<MdOutlineRepeat />}
            onClick={() => setIsRepeat((prev) => !prev)}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" alignItems="center">
          <Box width="10%">
            <Text fontSize="xs">Time</Text>
          </Box>
          <Box width="80">
            {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
            <RangeSlider aria-label={['min', 'max']} step={0.1} min={0} max={100} id="player-range">
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">Duration</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
export default PlayerControls
