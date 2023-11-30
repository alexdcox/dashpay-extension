import React, {useEffect, useRef, useState} from 'react'
import BackButton from "../component/BackButton";
import DashSvg from '../asset/icon/dash.svg?react'
import Text from "../component/Text";
import ProfileCircle from "../component/ProfileCircle";
import {debugMenu} from "../util";
import personWavingImage from "../asset/image/person-waving.svg";
import transactionsSvg from "../asset/icon/transactions.svg";
import MenuIcon from "../component/MenuIcon";
import PrimaryButton from "../component/PrimaryButton";
import SecondaryButton from "../component/SecondaryButton";
import {NotificationsOff, QrCode, Ban, Checkmark, CheckmarkDone, SearchOutline, Search} from 'react-ionicons'
import ContextMenu from "../component/ContextMenu";

export default function (props: any) {
  const [state, setState] = useState({
    menuVisible: false,
  })

  const toggleMenu = () => setState({...state, menuVisible: !state.menuVisible})

  const menuOptions = [{
    text: 'Search messages',
    icon: <Search width="16px" color="var(--Purple-text)"/>
  }, {
    text: 'Show Dash address',
    icon: <QrCode width="16px" color="var(--Purple-text)"/>
  }, {
    text: 'View transactions',
    icon: <img src={transactionsSvg} alt="transactions icon" className="w-[16px]"/>
  }, {
    text: 'Disable/Enable notifications',
    icon: <NotificationsOff width="16px" color="var(--Purple-text)"/>,
  }, {
    text: 'Ignore/Unblock',
    icon: <Ban width="16px" color="var(--Purple-text)"/>
  }]


  // const ContextMenu = (props: any) => {
  //   return (
  //     <div className="fixed top-2 right-2 bg-white shadow rounded-lg border border-gray-200 p-4" ref={contextMenuRef}>
  //       {options.map((option, k) => (
  //         <div key={k} className="flex first:mt-0 mt-2 items-center cursor-pointer">
  //           <div className="rounded-full bg-dp-bg-purple-light w-[1.75rem] h-[1.75rem] flex items-center justify-center">
  //             {option.icon}
  //           </div>
  //           <Text type="text-1" className="ml-3">
  //             {option.text}
  //           </Text>
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }

  const EmptyConversation = () => (
    <>
      <img src={personWavingImage} alt="person waving background image" className="absolute top-[32%] -ml-4 h-[200px]"/>

      <section className="flex flex-grow items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center pb-8 w-3/5 text-center">
          <Text type="title-7">This is the beginning of a great conversation</Text>
          <Text type="text-5" className="mt-1 text-dp-text-gray">Write something nice or tap me to send a greeting.</Text>
        </div>
      </section>
    </>
  )

  const MessageControls = () => (
    <section className="message-input flex w-full">
      <div className="bg-gray-100 text-base p-2 rounded-full flex flex-grow">
        <input type="text" placeholder="Message..." className="bg-transparent ml-2"/>
      </div>
      <button className="bg-gradient-to-tr from-[#627BFF] to-[#8D71FF] text-base p-2 rounded-full flex grow-0 justify-center items-center ml-3">
        <DashSvg fill="white" className="scale-[0.6]"/>
      </button>
    </section>
  )

  const FriendRequestControls = () => (
    <>
      <div className="flex flex-grow items-center justify-center">
        <Text type="text-5" className="text-dp-text-gray w-3/4 text-center select-none">
          To confirm this friendship say "hi" or send a message...
        </Text>
      </div>
      <div className="flex w-full space-x-3 my-3">
        <SecondaryButton className="flex-grow !py-2">Ignore</SecondaryButton>
        <PrimaryButton className="flex-grow !py-2">Accept request & say "hi"</PrimaryButton>
      </div>
    </>
  )

  const SendFriendsOnlyWarning = () => (
    <div className="bg-dp-bg-purple-light text-dp-text-purple px-3 py-2 rounded-xl w-full flex items-center mb-3">
      <DashSvg fill="var(--Purple-text)" className="scale-[0.5]"/>
      <Text type="text-4" className="text-dp-text-purple ml-1">You can send Dash once your friend responds</Text>
    </div>
  )

  const Message = (props: any) => {
    const {direction, text, time, status} = props
    switch (direction) {
      case 'out':
        return (
          <div className="flex flex-row justify-end mt-3">
            <div
              className="flex items-end rounded-xl bg-gradient-to-br from-[#F2EDFD] to-[#EEEDFF] px-3 py-1.5 max-w-[90%]">
              <Text type="message" className="h-full">
                {text}
              </Text>
              <span className="text-[0.625rem] text-dp-text-gray ml-2 leading-5">{time}</span>
              {status === 'sent' && (
                <Checkmark width="1rem" color="var(--Gray-text)" cssClasses="ml-1"/>
              )}
              {status === 'read' && (
                <CheckmarkDone width="1rem" color="var(--Gray-text)" cssClasses="ml-1"/>
              )}
            </div>
          </div>
        )
      case 'in':
        return (
          <div className="flex flex-row">
            <div className="flex items-baseline rounded-xl bg-dp-bg-gray px-3 py-1.5 w-max-[80%]">
              <Text type="message" className="h-full">
                {text}
              </Text>
              <span className="text-[0.625rem] text-dp-text-gray ml-2">{time}</span>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const messages = [{
    direction: 'in',
    text: 'Hi',
    time: '10:08'
  }, {
    direction: 'out',
    text: 'Hi, how are you? I want to send you 2 dash',
    time: '10:08',
    status: 'read',
  }, {
    direction: 'out',
    text: 'Is it over, over?',
    time: '10:09',
    status: 'sent',
  }]

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex mb-2 w-full items-center">
        <BackButton onClick={debugMenu()}/>
        <div className="flex flex-row w-full items-center">
          <ProfileCircle variant="primary" size="xs">
            D
          </ProfileCircle>
          <div className="flex flex-col ml-3">
            <Text type="title-4">Deohge</Text>
            <Text type="text-4" className="text-dp-text-gray">deohge</Text>
          </div>
          <MenuIcon className="ml-auto" onClick={toggleMenu}/>
        </div>
      </header>

      {/*<EmptyConversation/>*/}

      <section className="w-full">
        <div className="flex grow justify-center">
          <Text type="text-7" className="px-2 py-1 rounded-lg bg-dp-bg-purple-light text-dp-text-purple">Aug 12</Text>
        </div>

        {messages.map((m, k) => (
          <Message key={k} {...m}></Message>
        ))}


      </section>

      <FriendRequestControls/>
      {/*<SendFriendsOnlyWarning/>*/}

      <MessageControls/>

      {state.menuVisible && <ContextMenu options={menuOptions} onClose={toggleMenu}/>}
    </div>
  )
}