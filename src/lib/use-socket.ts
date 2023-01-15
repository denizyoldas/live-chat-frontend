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

  useEffect(() => {
    if (socket) {
      setIsConnected(socket.connected)
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setIsConnected(true)
      })
      socket.on('disconnect', () => {
        setIsConnected(false)
      })
    }
  }, [socket])

  return socket
}
