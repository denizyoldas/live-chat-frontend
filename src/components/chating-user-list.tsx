import cx from 'classnames'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { getConversations } from '../services/app.service'
import { activeChatIdAtom, userAtom } from '../store/app.atom'

const LIST = [
  {
    id: '123',
    name: 'Name',
    message: 'Message',
    isUnread: true
  },
  {
    id: '1235',
    name: 'Name',
    message: 'Message',
    isUnread: true
  },
  {
    id: '1236',
    name: 'Name',
    message: 'Message',
    isUnread: true
  },
  {
    id: '12354',
    name: 'Name',
    message: 'Message',
    isUnread: true
  }
]

export default function ChatingUserList() {
  const [activeChat, setActiveChat] = useAtom(activeChatIdAtom)
  const [conversations, setConversations] = useState<any[]>([])
  const [user] = useAtom(userAtom)

  const handleChatClick = (id: string) => {
    setActiveChat(id)
  }

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await getConversations(user.id)
      console.log(res)

      setConversations(res)
    }

    fetchConversations()
  }, [])

  return (
    <div className="w-2/6 rounded-lg bg-secondary px-2 py-4">
      <div className="mb-4 flex items-center justify-between">
        <span>Chats</span>
        <button className="text-primary hover:underline">New</button>
      </div>

      <div className="grid grid-cols-1">
        {conversations.map((item, i) => (
          <div
            key={item.id}
            className={cx(
              'flex cursor-pointer items-center justify-between border-b border-black px-2 py-4',
              {
                'bg-slate-300': item.id === activeChat
              }
            )}
            onClick={() => handleChatClick(item.id)}
          >
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <img
                  src={`/avatars/${user?.avatar}`}
                  alt="user"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-black">{item.username}</span>
                <span className="text-gray-500">
                  {item.lastMessage?.message}
                </span>
              </div>
            </div>
            {i === 0 && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                1
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
