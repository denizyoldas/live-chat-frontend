import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import io from 'socket.io-client'
import Messages from './components/messages'
import Modal from './components/modal'
import Settings from './components/settings'
import { activeChatIdAtom, modalIsOpenAtom, userAtom } from './store/app.atom'
import { Message } from './types/message'
import 'react-toastify/dist/ReactToastify.css'
import Button from './components/button'
import ChatingUserList from './components/chating-user-list'

const socket = io('http://localhost:2000/')

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [users, setUsers] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [, setModalIsOpen] = useAtom(modalIsOpenAtom)
  const [user] = useAtom(userAtom)
  const [newMessage, setNewMessage] = useState<Message[]>([])
  const [activeChatId] = useAtom(activeChatIdAtom)

  useEffect(() => {
    if (!user.id) {
      return
    } else {
      setModalIsOpen(false)
    }

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
      setNewMessage(prev => [...prev, data])
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
      chatId: activeChatId,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      message
    })
    setMessage('')
  }

  return (
    <>
      {/* <UserList users={users} /> */}
      <div className="flex h-screen flex-col items-center gap-3 overflow-auto py-10 px-8 dark:bg-slate-800">
        <h1 className="text-2xl font-bold text-primary">Live Chat</h1>

        <div className="flex w-full gap-3">
          <ChatingUserList />

          <div className="flex w-full flex-col gap-3">
            <Messages user={user} newMessages={newMessage} />

            <div className="flex flex-col justify-between gap-4 rounded-lg py-3 md:flex-row md:bg-secondary md:px-5">
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
        </div>
      </div>

      <Modal />
      <Settings />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  )
}

export default App
