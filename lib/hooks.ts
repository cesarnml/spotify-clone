import { Playlist } from '@prisma/client'
import useSWR from 'swr'
import fetcher from './fetcher'

export const useUser = () => {
  const { data, error, isValidating } = useSWR('/auth/user', fetcher)

  return {
    user: data,
    isLoading: isValidating,
    isError: !!error,
  }
}

export const usePlaylist = () => {
  const { data, error, isValidating } = useSWR('/playlist', fetcher)

  return {
    playlists: (data as unknown as Playlist[]) ?? [],
    isLoading: isValidating,
    isError: !!error,
  }
}
