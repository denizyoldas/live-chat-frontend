import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { getChathistory } from '../services/app.service'
import { activeChatIdAtom } from '../store/app.atom'
import { Message } from '../types/message'
import MessageBox from './message-box'

interface Props {
  newMessages?: Message | null
  user: any
}

export default function Messages({ user, newMessages }: Props) {
  const messageDivRef = React.useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [activeChatId] = useAtom(activeChatIdAtom)

  useEffect(() => {
    messageDivRef?.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }, [messages])

  useEffect(() => {
    if (newMessages) {
      setMessages(prev => [...prev, newMessages])
    }
  }, [newMessages])

  useEffect(() => {
    if (activeChatId) {
      getChathistory(activeChatId).then(res => {
        setMessages(res)
      })
    }
  }, [activeChatId])

  return (
    <div className="h-full w-full rounded-xl bg-secondary">
      <div className="messages h-full overflow-y-auto p-5">
        {messages.map((msg, i) => (
          <MessageBox
            key={msg.sender.id + i}
            message={msg.message}
            timestamp={msg.timestamp}
            isSender={msg.sender.id === user.id}
            user={{
              id: msg.sender.id,
              name: msg.sender.name,
              avatar: msg.sender.avatar
            }}
          />
        ))}
        <div ref={messageDivRef} style={{ height: 0 }} />
      </div>
    </div>
  )
}
