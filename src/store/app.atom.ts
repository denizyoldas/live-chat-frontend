import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const modalIsOpenAtom = atom<boolean>(true)
export const userAtom = atomWithStorage('user', {
  id: '',
  name: '',
  avatar: ''
})

export const activeChatIdAtom = atom<string | null>(null)
