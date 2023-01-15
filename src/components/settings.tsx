import { useState } from 'react'
import ToggleTheme from './toggle-theme'
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai'
import cx from 'classnames'
import { useAtom } from 'jotai'
import { userAtom } from '../store/app.atom'

export default function Settings() {
  const [visible, setVisible] = useState(false)
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
    <div className="absolute top-10 right-10">
      <button onClick={() => setVisible(!visible)}>
        <AiFillSetting className="text-2xl text-black dark:text-white" />
      </button>
      <div className={cx('absolute top-10', { hidden: !visible })}>
        <ToggleTheme />
        <button className="mt-4 flex items-center gap-2" onClick={logOut}>
          <AiOutlineLogout size={20} className="text-red-500" />
        </button>
      </div>
    </div>
  )
}
