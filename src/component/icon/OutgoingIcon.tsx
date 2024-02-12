import SentIcon from "../../asset/icon/sent.svg?react";

export default function ({
  className = '',
  iconClassName = 'w-[45%] h-[45%]'
}) {
  return (
    <div className={`circle rounded-full flex items-center justify-center ${className}`}>
      <SentIcon className={iconClassName}/>
    </div>
  )
}