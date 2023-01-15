import axios from 'axios'
import { toast } from 'react-toastify'

const API = axios.create({
  baseURL: 'http://localhost:2000'
})

export async function registerUser(data: any) {
  try {
    const res = await API.post('/api/auth/register', data)

    toaster('User registered successfully', 'success')

    return res.data
  } catch (error: any) {
    if (error.response.data.message.length) {
      toaster(error.response.data.message[0], 'error')
      return
    }

    toaster('Error', 'error')
    return
  }
}

export async function loginUser(data: any) {
  try {
    const res = await API.post('/api/auth/login', data)

    toaster('User logged in successfully', 'success')

    return res.data
  } catch (error: any) {
    if (error.response.data.message.length) {
      toaster(error.response.data.message[0], 'error')
      return
    }

    toaster('Error', 'error')
    return
  }
}

export async function getChathistory(chatId: string) {
  try {
    const res = await API.get(`/api/chat/history/${chatId}`)

    return res.data
  } catch (error: any) {
    if (error.response.data.message.length) {
      toaster(error.response.data.message[0], 'error')
      return
    }

    toaster('Error', 'error')
    return
  }
}

export async function getConversations(userId: string) {
  try {
    const res = await API.get(`/api/chat/conversations/${userId}`)

    return res.data
  } catch (error: any) {
    if (error.response.data.message.length) {
      toaster(error.response.data.message[0], 'error')
      return
    }

    toaster('Error', 'error')
    return
  }
}

function toaster(
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' | 'default'
) {
  toast(message, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    type
  })
}
