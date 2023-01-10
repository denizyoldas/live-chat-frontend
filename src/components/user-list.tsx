import React from 'react'

interface Props {
  users: string[]
}

export default function UserList({ users }: Props) {
  return (
    <div className="absolute top-10 left-10">
      <div className="flex flex-col gap-2">
        {users.map((user, index) => (
          <div key={user + index} className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-green-500" />
            <div className="dark:text-white">{user}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
