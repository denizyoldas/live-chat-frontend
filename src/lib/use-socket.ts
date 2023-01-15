import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<any>()
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    const socket = io(url)
    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [url])

  return socket
}
