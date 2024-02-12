import ReceivedIcon from "../../asset/icon/received.svg?react";

export default function ({
  className = '',
  iconClassName = '',
}) {
  return (
    <div
      className={`circle rounded-full flex items-center justify-center ${className}`}>
      <ReceivedIcon className={`w-[60%] h-[60%] ${iconClassName}`}/>
    </div>
  )
}