import React, {useEffect, useRef} from "react";
import Text from './Text'

export default function ({
  placeholder = '',
  className = '',
  inputClassName = '',
  type = 'text',
  value = '',
  pre = null,
  post = null,
  onKeyDown = undefined,
  onChange = undefined,
  label = undefined,
  textarea = false,
  autoFocus = false,
}) {
  const inputRef = useRef<any>()

  useEffect(() => {
    if (autoFocus) {
      inputRef?.current?.focus()
    }
  }, []);

  const inputProps = {
    ref: inputRef,
    type: "text",
    onKeyDown,
    onChange,
    value,
    placeholder: placeholder,
    className: `resize-none bg-gray-100 w-full text-base outline-0 border p-2 pl-3 rounded-xl flex items-center focus:bg-dp-purple/10 focus:border-dp-purple ${inputClassName}`,
  }

  return (
    <div {...{className: `w-full group relative ${className}`}}>
      {label && (
        <Text type="text-3" className="mb-1 text-dp-gray">{label}</Text>
      )}
      {pre}
      {textarea ?
        <textarea {...inputProps}></textarea> :
        <input {...{...inputProps, type}} />
      }
      {post}
    </div>
  )
}