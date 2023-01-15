import { FaSun, FaMoon } from 'react-icons/fa'
import { useAtom } from 'jotai'
import { themeAtom } from '../store/app.atom'

export default function ToggleTheme() {
  const [theme, setTheme] = useAtom(themeAtom)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? (
        <FaMoon className="text-blue-300" />
      ) : (
        <FaSun className="text-yellow-300" />
      )}
    </button>
  )
}
