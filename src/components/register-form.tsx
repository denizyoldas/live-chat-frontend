import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '../services/app.service'
import cx from 'classnames'
import Button from './button'
import Input from './input'

const AVATARS = ['boy-1.svg', 'girl-1.svg', 'girl-2.svg', 'girl-3.svg']

export default function RegisterForm({
  onSave
}: {
  onSave?: (data: any) => void
}) {
  const [selectedAvatar, setSelectedAvatar] = React.useState<string | null>(
    null
  )
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    data.avatar = selectedAvatar
    const res = await registerUser(data)

    onSave && onSave(data)
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Input {...register('username', { required: true })} label="Username" />

      <Input {...register('email', { required: true })} label="Email" />

      <Input {...register('password', { required: true })} label="Password" />

      <label htmlFor="avatar">Avatar</label>
      <div className="mt-2 flex gap-2">
        {AVATARS.map(avatar => (
          <img
            key={avatar}
            className={cx('h-10 w-10 rounded-full', {
              'ring-4 ring-blue-700': selectedAvatar === avatar
            })}
            src={`/avatars/${avatar}`}
            onClick={() => setSelectedAvatar(avatar)}
          ></img>
        ))}
      </div>

      <Button type="submit">Join</Button>
    </form>
  )
}
