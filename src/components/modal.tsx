import RegisterForm from './register-form'
import { useAtom } from 'jotai'
import { modalContentAtom, modalIsOpenAtom } from '../store/app.atom'
import LoginForm from './login-form'
import NewChatForm from './new-chat-form'

interface Props {
  onClose?: (data: any) => void
}

export default function Modal({ onClose }: Props) {
  const [isOpen] = useAtom(modalIsOpenAtom)
  const [modalContent, setModalContent] = useAtom(modalContentAtom)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-96 flex-col items-center overflow-auto rounded-xl bg-white px-10 py-5 shadow-2xl">
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
      </div>
    </div>
  )
}
