import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const modalIsOpenAtom = atom<boolean>(false)
export const userAtom = atomWithStorage('user', {
  id: '',
  name: '',
  avatar: ''
})
