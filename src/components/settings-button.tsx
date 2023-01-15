import { AiFillSetting } from 'react-icons/ai'
import { useAtom } from 'jotai'
import { modalContentAtom, modalIsOpenAtom } from '../store/app.atom'

export default function SettingsButton() {
  const [, setModalIsOpen] = useAtom(modalIsOpenAtom)
  const [, setModalContent] = useAtom(modalContentAtom)

  const openSettingsModal = () => {
    setModalContent('settings')
    setModalIsOpen(true)
  }

  return (
    <div className="absolute top-10 right-10">
      <button onClick={openSettingsModal}>
        <AiFillSetting className="text-2xl text-black dark:text-white" />
      </button>
    </div>
  )
}
