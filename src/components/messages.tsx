import React, { useEffect } from 'react'
import { Message } from '../types/message'
import MessageBox from './message-box'

interface Props {
  messages: Message[]
  user: any
}

export default function Messages({ messages, user }: Props) {
  const messageDivRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    messageDivRef?.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }, [messages])

  return (
    <div className="h-[560px] w-full rounded-xl bg-[#D9D9D9] md:w-[730px]">
      <div className="messages h-full overflow-y-auto p-5">
        {messages.map((msg, i) => (
          <MessageBox
            key={msg.sender.id + i}
            message={msg.message}
            timestamp={msg.timestamp}
            isSender={msg.sender.id === user.id}
            user={{
              id: msg.sender,
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
