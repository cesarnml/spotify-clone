import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react'
import { formatTime } from '@lib/formatters'
import { SongWithArtist, useStoreActions } from '@lib/store'
import { FC, useEffect, useRef, useState } from 'react'
import ReactHowler from 'react-howler'
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md'

type Props = {
  songs: SongWithArtist[]
  activeSong: SongWithArtist | null
}

const getRandomIndex = (num: number) => {
  return Math.floor(Math.random() * num)
}

const PlayerControls: FC<Props> = ({ songs, activeSong }) => {
  const setActiveSong = useStoreActions((state) => state.changeActiveSong)

  const [isPlaying, setIsPlaying] = useState(false)
  const [playlistIndex, setPlaylistIndex] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const [seek, setSeek] = useState(0.0)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [duration, setDuration] = useState(0)

  const howlerRef = useRef<ReactHowler | null>(null)

  const handleSkipPrevious = () => {
    setPlaylistIndex((prev) => (prev ? prev - 1 : songs.length - 1))
  }

  const handleSkipNext = () => {
    if (isShuffle) {
      const randomIndex = getRandomIndex(songs.length)
      if (randomIndex === playlistIndex) {
        handleSkipNext()
      }
      setPlaylistIndex(randomIndex)
    } else {
      setPlaylistIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1))
    }
  }

  const onEnd = () => {
    if (isRepeat) {
      setSeek(0)
      howlerRef.current?.seek(0)
    } else {
      handleSkipNext()
    }
  }

  const onLoad = () => {
    const songDuration = howlerRef.current?.duration() ?? 0
    setDuration(songDuration)
  }

  const onSeek = (e: any) => {
    setSeek(parseFloat(e[0]))
    howlerRef.current?.seek(e[0])
  }

  useEffect(() => {
    setActiveSong(songs[playlistIndex])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistIndex, setActiveSong])

  if (!activeSong) return null

  return (
    <Box>
      <Box>
        <ReactHowler ref={howlerRef} playing={isPlaying} src={activeSong.url} onLoad={onLoad} onEnd={onEnd} />
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
            onClick={handleSkipPrevious}
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
          <IconButton
            onClick={handleSkipNext}
            outline="none"
            variant="link"
            aria-label="skip next"
            fontSize="24px"
            icon={<MdSkipNext />}
          />
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
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? Number(duration.toFixed(2)) : 0}
              id="player-range"
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
export default PlayerControls
