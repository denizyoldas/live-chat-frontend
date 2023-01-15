import RegisterForm from './register-form'
import { useAtom } from 'jotai'
import { modalContentAtom, modalIsOpenAtom } from '../store/app.atom'
import LoginForm from './login-form'
import NewChatForm from './new-chat-form'
import EmojiPicker from 'emoji-picker-react'
import Settings from './settings'

interface Props {
  onClose?: (data: any) => void
}

export default function Modal({ onClose }: Props) {
  const [isOpen, setIsOpen] = useAtom(modalIsOpenAtom)
  const [modalContent, setModalContent] = useAtom(modalContentAtom)

  if (!isOpen) return null

  const closeBtnIsVisible =
    modalContent !== 'login' && modalContent !== 'register'

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-96 flex-col items-center overflow-auto rounded-xl bg-white px-10 py-5 shadow-2xl">
        {closeBtnIsVisible && (
          <button
            className="absolute top-2 right-2"
            onClick={() => {
              setModalContent(null)
              onClose && onClose(null)
              setIsOpen(false)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {modalContent === 'login' && (
          <>
            <h1 className="mb-4 text-2xl font-bold">
              Welcome to <span className="text-primary">Live Chat</span>
            </h1>
            <LoginForm onClose={onClose} />
            <div className="mt-4">
              <span className="text-gray-500">Don't have an account?</span>
              <button
                className="ml-1 text-primary"
                onClick={() => setModalContent('register')}
              >
                Register
              </button>
            </div>
          </>
        )}
        {modalContent === 'register' && (
          <>
            <h1 className="mb-4 text-2xl font-bold">
              Welcome to <span className="text-primary">Live Chat</span>
            </h1>
            <RegisterForm onSave={onClose} />
            <div className="mt-4">
              <span className="text-gray-500">Already have an account?</span>
              <button
                className="ml-1 text-primary"
                onClick={() => setModalContent('login')}
              >
                Login
              </button>
            </div>
          </>
        )}
        {modalContent === 'new-chat' && <NewChatForm />}
        {modalContent === 'settings' && <Settings />}
        {modalContent === 'emoji' && (
          <div>
            <EmojiPicker
              onEmojiClick={(e, emojiObject) => console.log(emojiObject)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
