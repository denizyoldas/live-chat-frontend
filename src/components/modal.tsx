import React from 'react'
import cx from 'classnames'
import { nanoid } from 'nanoid'

interface Props {
  isOpen: boolean
  onClose?: (data: any) => void
}

const AVATARS = ['boy-1.svg', 'girl-1.svg', 'girl-2.svg', 'girl-3.svg']

export default function Modal({ isOpen, onClose }: Props) {
  const [selectedAvatar, setSelectedAvatar] = React.useState<string | null>(
    null
  )
  const [name, setName] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const saveHandle = () => {
    if (onClose && name && selectedAvatar) {
      onClose({
        name,
        id: nanoid(),
        avatar: selectedAvatar
      })
    } else {
      setErrorMessage('Please select name and avatar')
    }
  }

  const selectAvatar = (avatar: string) => {
    setSelectedAvatar(avatar)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-96 w-96 flex-col items-center rounded-xl bg-white px-10 py-5 shadow-2xl">
        <h1 className="text-2xl font-bold">
          Welcome to <span className="text-primary">Live Chat</span>
        </h1>
        <div className="pt-6">
          <div className="mb-4">
            Select Avatar
            <div className="mt-2 flex gap-2">
              {AVATARS.map(avatar => (
                <img
                  key={avatar}
                  className={cx('h-10 w-10 rounded-full', {
                    'ring-4 ring-blue-700': selectedAvatar === avatar
                  })}
                  src={`/avatars/${avatar}`}
                  onClick={() => selectAvatar(avatar)}
                ></img>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              <span>Name</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full appearance-none rounded-lg border-none px-3 py-2 ring-2 ring-gray-300"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="mt-2 text-sm text-red-500">{errorMessage}</div>
          )}
        </div>
        <button
          className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-white"
          onClick={saveHandle}
        >
          Join
        </button>
      </div>
    </div>
  )
}
