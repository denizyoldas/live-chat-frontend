import { useAtom } from 'jotai'
import React from 'react'
import { createNewConversation } from '../services/app.service'
import { modalIsOpenAtom, userAtom } from '../store/app.atom'
import Button from './button'
import Input from './input'

export default function NewChatForm() {
  const [username, setUsername] = React.useState<string>('')
  const [user] = useAtom(userAtom)
  const [, setModalIsOpen] = useAtom(modalIsOpenAtom)

  const submitHandle = async () => {
    const res = await createNewConversation(username, user.id)
    setModalIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <Button onClick={submitHandle}>Create</Button>
    </div>
  )
}
