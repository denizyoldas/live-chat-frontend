import React, { InputHTMLAttributes } from 'react'
import cx from 'classnames'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder?: string
  error?: string
}

// react.forwardRef is a higher order component that allows us to pass a ref to the component

export default React.forwardRef<HTMLInputElement, Props>(function Input(
  { label, placeholder, value, error, onChange, ...props },
  ref
) {
  return (
    <>
      <label htmlFor={label}>
        <span>{label}</span>
      </label>
      <input
        type="text"
        id={label}
        placeholder={placeholder}
        className={cx(
          'rounded border border-gray-300 p-2',
          error && 'border-red-500'
        )}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      {error && <span className="text-red-500">{error}</span>}
    </>
  )
})
