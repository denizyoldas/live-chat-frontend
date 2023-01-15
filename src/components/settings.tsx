import { useAtom } from 'jotai'
import { userAtom } from '../store/app.atom'
import ToggleTheme from './toggle-theme'

export default function Settings() {
  const [, setUser] = useAtom(userAtom)

  const logOut = () => {
    setUser({
      id: '',
      name: '',
      avatar: ''
    })

    window.location.href = '/'
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-4 flex items-center gap-3">
        Change Theme
        <ToggleTheme />
      </div>
      <div className="mt-4">
        <button
          className="mt-4 flex items-center gap-2 font-semibold text-red-600"
          onClick={logOut}
        >
          LogOut
        </button>
      </div>
    </>
  )
}
