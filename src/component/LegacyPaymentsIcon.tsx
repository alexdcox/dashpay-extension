import DashIcon from "../asset/icon/dash.svg?react";

export default function({
  className = '',
}) {
  return (
    <div className={`flex-shrink-0 bg-[#008DE4] rounded-xl flex justify-center items-center ${className}`}>
      <DashIcon fill="white" className="w-[45%] h-[45%]"/>
    </div>
  )
}