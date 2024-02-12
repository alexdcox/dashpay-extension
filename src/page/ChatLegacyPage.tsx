import React, {useEffect} from 'react'
import BackButton from "../component/BackButton";
import MenuIcon from "../component/MenuIcon";
import Subtitle from "../component/Subtitle";
import LegacyPaymentsIcon from "../component/LegacyPaymentsIcon";
import {useNavigate} from 'react-router-dom';
import SecondaryButton from "../component/SecondaryButton";
import IncomingIcon from "../component/icon/IncomingIcon";
import OutgoingIcon from "../component/icon/OutgoingIcon";
import Text from "../component/Text";
import useLegacySendModal from "../component/modal/useLegacySendModal";
import useLegacyReceiveModal from "../component/modal/useLegacyReceiveModal";
import DateSeparator from "../component/chat/DateSeparator";
import AmountPill from '../component/chat/AmountPill';

export default function () {
  const nav = useNavigate()

  const onClickMenu = () => nav('/home')

  const emptyChatPlaceholder = (
    <div className="flex flex-col flex-grow justify-center items-center mx-auto text-center space-y-2 w-[55%]">
      <Text type="title-7">This is the beginning of great payments</Text>
      <Text type="text-5" className="text-dp-gray">Click on the send and receive buttons below</Text>
    </div>
  )

  const legacySendModal = useLegacySendModal()
  const legacyReceiveModal = useLegacyReceiveModal()

  useEffect(() => {
    // legacySendModal.setOpen(true)
    // legacyReceiveModal.setOpen(true)
  }, []);

  return (
    <>
      {legacySendModal.component}
      {legacyReceiveModal.component}
      <div className="flex flex-col flex-grow">
        <header className="flex mb-2 w-full items-center">
          <BackButton/>
          <LegacyPaymentsIcon className="w-[36px] h-[36px] !rounded-lg "/>
          <Subtitle className="ml-4">Legacy Payments</Subtitle>
          <MenuIcon className="ml-auto" onClick={onClickMenu}/>
        </header>

        <section className="w-full space-y-2">
          <DateSeparator/>
          <AmountPill variant="sent" showAddress={true}/>
          <AmountPill variant="received" showAddress={true}/>

          {['Internal transfer', 'Identity topup'].map(msg => (
            <div className={`w-fit text-[0.625rem] text-dp-gray items-baseline rounded-lg bg-dp-gray-light px-3 py-1.5 my-1.5 mx-auto`}>
              <span className="">{msg}</span>
              <span className="mx-2">2 Dash (400 USD)</span>
              <span className="text-[0.625rem]">10:44 PM</span>
            </div>
          ))}
        </section>

        {emptyChatPlaceholder}

        <div className="flex flex-row w-full space-x-4 mt-auto">
          <SecondaryButton className="flex flex-row flex-grow align-middle justify-center items-center bg-dp-green/10 !py-2 w-1/2">
            <IncomingIcon className="w-[16px] h-[16px] bg-dp-green stroke-white" iconClassName="w-[8px] h-[8px]"/>
            <span className="ml-2 text-black font-normal">Receive</span>
          </SecondaryButton>
          <SecondaryButton className="flex flex-row flex-grow align-middle justify-center items-center bg-dp-purple/10 !py-2 w-1/2">
            <OutgoingIcon className="w-[16px] h-[16px] bg-dp-purple stroke-white" iconClassName="w-[8px] h-[8px]"/>
            <span className="ml-2 text-black font-normal">Send</span>
          </SecondaryButton>
        </div>

      </div>
    </>
  )
}