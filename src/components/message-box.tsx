import { format } from 'date-fns'
import cx from 'classnames'

interface Props {
  message: string
  timestamp: number
  user?: any
  isSender?: boolean
}

const RANDOM_USERNAME_COLORS = [
  'text-green-500',
  'text-blue-500',
  'text-red-500',
  'text-yellow-500',
  'text-purple-500'
]

export default function MessageBox({
  message,
  timestamp,
  isSender = false,
  user
}: Props) {
  const color = RANDOM_USERNAME_COLORS[Math.floor(Math.random() * 5)]

  return (
    <div
      className={cx('mb-8 flex items-end gap-4', {
        'flex-row-reverse': isSender
      })}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
        <img
          src={`/avatars/${user?.avatar}`}
          alt="user"
          className={cx('h-12 w-12 rounded-full', {
            'scale-x-[-1] transform': !isSender
          })}
        />
      </div>
      <div
        className={cx('min-w-[212px] max-w-xs rounded-t-2xl px-4 py-2', {
          'rounded-bl-2xl bg-green-100': isSender,
          'rounded-br-2xl bg-slate-100': !isSender
        })}
      >
        {!isSender && (
          <h4 className={'font-slate-400 text-xs '}>{user?.name}</h4>
        )}
        <p className="mb-2 break-words font-bold">{message}</p>
        <span className="flex justify-end text-xs text-slate-400">
          {format(timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  )
}
