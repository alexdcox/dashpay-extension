import Pill from "../Pill";
import DashIcon from "../../asset/icon/dash.svg?react";

const Variants = {
  Sent: 'sent',
  Received: 'received',
}

export default function ({
 variant = Variants.Sent,
 showAddress = false
}) {
  const v = {
    [Variants.Sent]: {
      addressText: 'You sent to',
      addressTextColor: 'text-dp-purple',
      pillVariant: 'primary',
      pillBackground: 'bg-gradient-to-tr from-[#F3F3FF] via-[#F0F2FF] via-35% to-[#E9F0FF]',
      pillShadow: 'shadow-dp-purple/20',
    },
    [Variants.Received]: {
      addressText: 'You received',
      addressTextColor: 'text-dp-green',
      pillVariant: 'green-dark',
      pillBackground: 'bg-gradient-to-tr from-[#F2F8FD] to-[#EBFFF8]',
      pillShadow: 'shadow-dp-green/20',
    },
  }[variant]

  const align = `${variant == Variants.Sent ? 'ml-auto' : ''}`

  return (
    <div className="w-full">
      {showAddress && (
        <div className={`${align} w-fit mb-1 text-[10px]`}>
          <span className={`font-semibold ${v.addressTextColor}`}>{v.addressText}</span>
          <span className="ml-1 font-light text-dp-gray">Xcu5iY...rFVdYu</span>
        </div>
      )}
      <div
        className={`${align} flex flex-row rounded-full items-center ${v.pillBackground} p-2 shadow-md ${v.pillShadow} max-w-[160px] mb-3`}>
        <Pill variant={v.pillVariant} className="w-[28px] h-[28px] flex items-center justify-center">
          <DashIcon fill="white" className="w-[0.8rem]"/>
        </Pill>
        <div className="flex flex-col ml-2">
          <span className="font-semibold text-[13px] leading-3 mt-[2px]">1 Dash</span>
          <span className="text-dp-gray font-medium text-[10px] leading-3 mt-[2px]">~201 USD</span>
        </div>
        <span className="ml-auto text-[0.625rem] text-dp-gray self-end mr-3">10:11</span>
      </div>
    </div>
  )
}