import { nanoid } from 'nanoid'
import Input from './input'
import { useForm } from 'react-hook-form'
import Button from './button'
import { useAtom } from 'jotai'
import { userAtom } from '../store/app.atom'
import { loginUser } from '../services/app.service'

const AVATARS = ['boy-1.svg', 'girl-1.svg', 'girl-2.svg', 'girl-3.svg']

function LoginForm({ onClose }: { onClose?: (data?: any) => void }) {
  const { register, handleSubmit } = useForm()
  const [, setUser] = useAtom(userAtom)

  const onSubmit = async (data: any) => {
    const res = await loginUser({
      username: data.username,
      password: data.password
    })

    if (!res) {
      return
    }

    setUser({
      id: res.id,
      name: res.username,
      avatar: res.avatar
    })

    onClose && onClose()
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Input {...register('username')} label="User Name" />

      <Input {...register('password')} label="Password" type="password" />

      <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginForm
