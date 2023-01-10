import React, { useEffect } from 'react'
import useLocalStorage from '../lib/use-local'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ToggleTheme() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.body.classList.remove(theme === 'light' ? 'dark' : 'light')
    document.body.classList.add(theme)
  }, [theme])

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