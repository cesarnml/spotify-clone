import { Song } from '@prisma/client'
import { createStore, action, Action } from 'easy-peasy'

type StoreModel = {
  activeSongs: Song[]
  activeSong: Song | null
  changeActiveSongs: Action<StoreModel, Song[]>
  changeActiveSong: Action<StoreModel, Song>
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
