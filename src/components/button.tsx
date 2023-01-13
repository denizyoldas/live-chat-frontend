import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
  children,
  className,
  onClick,
  type = 'button'
}: Props) {
  return (
    <button
      className={cx(
        'rounded-lg bg-primary px-4 py-2 font-bold text-white',
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
