import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import io from 'socket.io-client'
import Messages from './components/messages'
import Modal from './components/modal'
import Settings from './components/settings'
import UserList from './components/user-list'
import { modalIsOpenAtom, userAtom } from './store/app.atom'
import { Message } from './types/message'
import 'react-toastify/dist/ReactToastify.css'
import Button from './components/button'

const socket = io('http://localhost:2000/')

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [, setModalIsOpen] = useAtom(modalIsOpenAtom)
  const [user] = useAtom(userAtom)

  const fetchChatData = async () => {
    const res = await fetch('http://localhost:2000/api/chat')
    const data = await res.json()
    setMessages(data)
  }

  useEffect(() => {
    if (!user.id) {
      return
    } else {
      setModalIsOpen(false)
    }

    fetchChatData()

    socket.on('connect', () => {
      setIsConnected(true)

      socket.emit('join', {
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar
      })
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('msg', (data: Message) => {
      setMessages(prev => [...prev, data])
    })

    socket.on('users', (data: any) => {
      setUsers(data)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('msg')
      socket.off('users')
    }
  }, [user])

  const sendMessage = () => {
    socket.emit('msg', {
      message,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar
    })
    setMessage('')
  }

  return (
    <>
      <UserList users={users} />
      <div className="flex h-screen flex-col items-center gap-3 py-10 px-8 dark:bg-slate-800 md:px-0">
        <h1 className="text-2xl font-bold text-primary">Live Chat</h1>

        <Messages messages={messages} user={user} />

        <div className="flex w-full flex-col justify-between gap-4 rounded-lg py-3 md:w-[730px] md:flex-row md:bg-[#D9D9D9] md:px-5">
          <input
            type="text"
            placeholder="Some Text... "
            className="w-full appearance-none rounded-lg border-none px-3 py-2 ring-2 ring-gray-300"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                sendMessage()
              }
            }}
          />
          <Button className="!py-2 !px-20" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>

      <Modal />
      <Settings />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  )
}

export default App
