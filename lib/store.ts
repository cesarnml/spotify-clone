import { Artist, Song } from '@prisma/client'
import { createStore, action, Action, createTypedHooks } from 'easy-peasy'

export type SongWithArtist = Song & { artists: Artist }

type SongsModal = {
  activeSongs: SongWithArtist[]
  changeActiveSongs: Action<SongsModal, SongWithArtist[]>
}

type SongModal = {
  activeSong: SongWithArtist
  changeActiveSong: Action<SongModal, SongWithArtist>
}

type StoreModel = {
  activeSongs: SongWithArtist[]
  activeSong: SongWithArtist | null
  changeActiveSongs: Action<SongsModal, SongWithArtist[]>
  changeActiveSong: Action<SongModal, SongWithArtist>
}

export const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload
  }),
})

const typedHooks = createTypedHooks<StoreModel>()

export const { useStoreActions } = typedHooks
export const { useStoreDispatch } = typedHooks
export const { useStoreState } = typedHooks
