import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Messages from './components/messages'
import Modal from './components/modal'
import Settings from './components/settings'
import UserList from './components/user-list'
import useLocalStorage from './lib/use-local'
import { Message } from './types/message'

const socket = io(import.meta.env.VITE_API_URL)

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useLocalStorage('user', {
    id: '',
    name: '',
    avatar: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(!user.id)

  const fetchChatData = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/chat')
    const data = await res.json()
    setMessages(data)
  }

  useEffect(() => {
    if (!user.id) {
      return
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
      console.log(data)
      setUsers(data)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('msg')
      socket.off('users')
    }
  }, [user.id])

  const sendMessage = () => {
    socket.emit('msg', {
      message,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar
    })
    setMessage('')
  }

  const modalSaveHandle = (data: any) => {
    setUser(data)
    setIsModalOpen(false)
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
          <button
            className="rounded-lg bg-primary py-2 px-20 font-bold text-white"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={(data: any) => {
          modalSaveHandle(data)
        }}
      />

      <Settings />
    </>
  )
}

export default App
