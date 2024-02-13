import React, {useEffect, useState} from 'react'
import BackButton from "../component/BackButton";
import DashSvg from '../asset/icon/dash.svg?react'
import CaretDownIcon from "../asset/icon/caret-down.svg?react";
import Text from "../component/Text";
import ProfileCircle from "../component/ProfileCircle";
import personWavingImage from "../asset/image/person-waving.svg";
import transactionsSvg from "../asset/icon/transactions.svg";
import MenuIcon from "../component/MenuIcon";
import PrimaryButton from "../component/PrimaryButton";
import SecondaryButton from "../component/SecondaryButton";
import {
  Alert,
  ArrowUndo,
  Ban,
  Checkmark,
  CheckmarkDone,
  CloseOutline,
  Copy,
  NotificationsOff,
  QrCode,
  Refresh,
  Search,
  Trash
} from 'react-ionicons'
import ContextMenu from "../component/context-menu/ContextMenu";
import store from "../store";
import Pill from "../component/Pill";
import useSendOrRequestModal from "../component/modal/useSendOrRequestModal";
import DateSeparator from "../component/chat/DateSeparator";
import AmountPill from "../component/chat/AmountPill";
import SearchInput from "../component/SearchInput";
import useQRModal from "../component/modal/useQRModal";
import usePINModal from "../component/modal/usePINModal";
import useFingerprintModal from "../component/modal/useFingerprintModal";

export default function () {
  const Modes = {
    Messages: 0,
    Search: 1,
  }

  const [state, setState] = useState({
    menuVisible: false,
    messages: [],
    searching: true,
    search: '',
    mode: Modes.Messages,
    address: 'yhwXNMsJzkSH3epRdaS5EvUewDqQxgGCfo',
  })

  const toggleMenu = () => setState({...state, menuVisible: !state.menuVisible})

  const qrModal = useQRModal({address: state.address})
  const pinModal = usePINModal()
  const fingerprintModal = useFingerprintModal()

  useEffect(() => {
    // pinModal.setOpen(true)
    // fingerprintModal.setOpen(true)
  }, []);

  const menuOptions = [{
    text: 'Search messages',
    icon: <Search width="16px" color="rgb(var(--purple))"/>,
    onClick: () => setState({...state, mode: Modes.Search})
  }, {
    text: 'Show Dash address',
    icon: <QrCode width="16px" color="rgb(var(--purple))"/>,
    onClick: () => {
      toggleMenu()
      qrModal.setOpen(true)
    },
  }, {
    text: 'View transactions',
    icon: <img src={transactionsSvg} alt="transactions icon" className="w-[16px]"/>
  }, {
    text: 'Disable/Enable notifications',
    icon: <NotificationsOff width="16px" color="rgb(var(--purple))"/>,
  }, {
    text: 'Ignore/Unblock',
    icon: <Ban width="16px" color="rgb(var(--purple))"/>
  }]

  const EmptyConversation = () => (
    <>
      <img src={personWavingImage} alt="person waving background image" className="absolute top-[32%] -ml-4 h-[200px]"/>

      <section className="flex flex-grow items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center pb-8 w-3/5 text-center">
          <Text type="title-7">This is the beginning of a great conversation</Text>
          <Text type="text-5" className="mt-1 text-dp-gray">Write something nice or tap me to send a
            greeting.</Text>
        </div>
      </section>
    </>
  )

  const MessageControls = (props: { reply?: any }) => (
    <section className="message-input flex flex-col w-full">
      {props.reply && (
        <div className="border-t border-gray-100 -ml-4 -mr-4 py-2 mb-2 px-4">
          <div className="flex flex-row flex-grow">
            <div className="w-[2px] -ml-4 mr-4 -my-2 bg-dp-purple"></div>
            <div className="flex flex-col">
              <Text type="text-5" className="text-dp-gray">Replying to {props.reply.name}</Text>
              <Text type="text-5">{props.reply.text}</Text>
            </div>
            <div className="ml-auto">
              <CloseOutline height="1.6rem" width="1.6rem" color="rgb(var(--purple))" cssClasses="cursor-pointer"
                            onClick={() => {
                            }}/>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row">
        <div className="bg-gray-100 text-base p-2 rounded-full flex flex-grow">
          <input type="text" placeholder="Message..." className="bg-transparent ml-2"/>
        </div>
        <button
          className="bg-gradient-to-tr from-[#627BFF] to-[#8D71FF] text-base p-2 rounded-full flex grow-0 justify-center items-center ml-3">
          <DashSvg fill="white" className="scale-[0.6]"/>
        </button>
      </div>
    </section>
  )

  const FriendRequestControls = () => (
    <>
      <div className="flex flex-grow items-center justify-center">
        <Text type="text-5" className="text-dp-gray w-3/4 text-center select-none">
          To confirm this friendship say "hi" or send a message...
        </Text>
      </div>
      <div className="flex w-full space-x-3 my-3">
        <SecondaryButton className="flex-grow !py-2">Ignore</SecondaryButton>
        <PrimaryButton className="flex-grow !py-2">Accept request & say "hi"</PrimaryButton>
      </div>
    </>
  )

  const TransactionSentNotification = () => (
    <div className="bg-dp-purple/10 text-dp-purple px-3 py-2 rounded-xl w-full flex items-center">
      <div className="rounded-full w-[20px] h-[20px] bg-dp-purple flex items-center justify-center">

        <div className="w-[12px] h-[12px]">
          {/* NOTE: react-ionicons doesn't allow for making the <Checkmark/> chunky by changing stroke-width, so I've
                    copied it out in this instance.
            */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="80"
                  d="M416 128L192 384l-96-96"></path>
          </svg>
        </div>
      </div>
      <Text type="text-4" className="text-dp-purple ml-2">Your transaction has been successfully sent</Text>
    </div>
  )

  const SendFriendsOnlyNotification = () => (
    <div className="bg-dp-purple/10 text-dp-purple px-3 py-2 rounded-xl w-full flex items-center">
      <DashSvg className="scale-[0.5] fill-dp-purple"/>
      <Text type="text-4" className="text-dp-purple ml-1">You can send Dash once your friend responds</Text>
    </div>
  )

  const ReplyCopyButtons = () => (
    <section className="reply-copy-buttons flex flex-row space-x-4 border-t border-gray-100 -ml-4 -mr-4 pt-4 mb-2 px-4">
      <SecondaryButton
        className="flex flex-row flex-grow align-middle justify-center items-center bg-dp-purple/10 !py-2 w-1/">
        <ArrowUndo color="rgb(var(--purple))" cssClasses="" height="1rem" width="1rem"/>
        <Text type="title-7" className="ml-3 inline">Reply</Text>
      </SecondaryButton>
      <SecondaryButton
        className="flex flex-row flex-grow align-middle justify-center items-center bg-dp-purple/10 !py-2 w-1/">
        <Copy color="rgb(var(--purple))" cssClasses="" height="1rem" width="1rem"/>
        <Text type="title-7" className="ml-3 inline">Copy</Text>
      </SecondaryButton>
    </section>
  )

  const RetryDeleteButtons = () => (
    <section className="reply-copy-buttons flex flex-row space-x-4 border-t border-gray-100 -ml-4 -mr-4 pt-4 mb-2 px-4">
      <SecondaryButton
        className="flex flex-row flex-grow align-middle justify-center items-center bg-dp-purple/10 !py-2 w-1/2">
        <Refresh color="rgb(var(--purple))" cssClasses="" height="1rem" width="1rem"/>
        <Text type="title-7" className="ml-3 inline">Send again</Text>
      </SecondaryButton>
      <SecondaryButton
        className="flex flex-row flex-grow align-middle justify-center items-center bg-dp-red/10 !py-2 w-1/2">
        <Trash color="rgb(var(--red))" cssClasses="" height="1rem" width="1rem"/>
        <Text type="title-7" className="ml-3 inline text-dp-red">Delete</Text>
      </SecondaryButton>
    </section>
  )

  const Message = (props: any) => {
    const {textClass, direction, text, time, status, reply, event} = props
    const type = event ? 'event' : 'message'
    switch (direction) {
      case 'out':
        return (
          <div>
            <div className="flex flex-row justify-end items-center">
              {props.error && (
                <div className="p-[4px] bg-dp-red rounded-full flex-grow-0 w-[18px] h-[18px] mr-2 flex items-center justify-center">
                  <Alert height=".8rem" width=".8rem" color="white"/>
                </div>
              )}
              <div
                className={`${textClass} flex items-end rounded-xl bg-gradient-to-br from-[#F2EDFD] to-[#EEEDFF] px-3 py-1.5 max-w-[90%]`}>
                <div className="flex flex-col">
                  {props.reply && (
                    <div className="border-t border-gray-100 -ml-4 -mr-4 py-2 px-4">
                      <div className="flex flex-row flex-grow">
                        <div className="w-[2px] bg-dp-purple"></div>
                        <div className="flex flex-col ml-2">
                          <Text type="text-5" className="text-dp-gray">You replied</Text>
                          <Text type="text-5" className="text-black">{props.reply.text}</Text>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-row">
                    <Text type={type} className="h-full">
                      {text}
                    </Text>
                    <span className="text-[0.625rem] text-dp-gray ml-2 leading-5">{time}</span>
                    {status === 'sent' && (
                      <Checkmark width="1rem" color="rgb(var(--gray))" cssClasses="ml-1"/>
                    )}
                    {status === 'read' && (
                      <CheckmarkDone width="1rem" color="rgb(var(--gray))" cssClasses="ml-1"/>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {props.error && (
              <div className="text-right">
                <span className="text-[10px] text-xs text-dp-red">{props.error}</span>
              </div>
            )}
          </div>
        )
      case 'in':
        return (
          <div className="flex flex-row items-center">
            <div className={`${textClass} flex items-baseline rounded-xl bg-dp-gray-light px-3 py-1.5 w-max-[80%]`}>
              <Text type={type} className="h-full">
                {text}
              </Text>
              <span className="text-[0.625rem] text-dp-gray ml-2">{time}</span>
            </div>
            {reply && (
              <div
                className="mr-6 ml-auto w-[25px] h-[25px] rounded-full bg-gray-200 flex justify-center align-middle items-center">
                <ArrowUndo color="white" width="0.9rem"/>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const [messages, setMessages] = useState([])
  const sendOrRequestModal = useSendOrRequestModal()

  useEffect(() => {
    store.getMessages('sam').then(messages => {
      setMessages(messages)
    })

    // sendOrRequestModal.setOpen(true)

    Promise
      .all([
        store.getActiveAccount(),
        store.getUser('sam')
      ])
      .then(([us, them]) => {
        sendOrRequestModal.setState({...sendOrRequestModal.state, currentUser: us, targetUser: them, something: 'test'})
      })
  }, []);

  const onSearchChange = e => setState({...state, search: e.target.value})
  const onExitSearch = () => setState({...state, mode: Modes.Messages})


  const stateContent = {
    [Modes.Messages]: (
      <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">

        {sendOrRequestModal.component}

        <header className="flex mb-2 w-full items-center">
          <BackButton/>
          <div className="flex flex-row w-full items-center">
            <ProfileCircle variant="primary" size="xs">
              D
            </ProfileCircle>
            <div className="flex flex-col ml-3">
              <Text type="title-4">Deohge</Text>
              <Text type="text-4" className="text-dp-gray">deohge</Text>
            </div>
            <MenuIcon className="ml-auto" onClick={toggleMenu}/>
          </div>
        </header>

        {messages?.length == 0 && <EmptyConversation/>}

        <section className="w-full space-y-2">
          <TransactionSentNotification/>

          <Message {...{
            error: 'Failed to send message',
            direction: 'out',
            text: 'This will fail to send',
            time: '10:09',
            status: 'read'
          }}/>

          <ReplyCopyButtons/>
          <RetryDeleteButtons/>

          <DateSeparator/>

          {messages.map((m, k) => (
            <Message key={k} {...m}></Message>
          ))}

          <AmountPill variant="sent"/>
          <AmountPill variant="received"/>

          <div
            className="justify-end flex flex-col items-center rounded-xl bg-dp-gray-light px-3 pt-3 pb-4 max-w-[60%] relative">
            <Text type="text-4" className="text-dp-gray">Request (Declined)</Text>
            <Text type="title-7">2 Dash</Text>
            <Text type="text-7" className="text-dp-gray">200 USD</Text>
            <div className="w-full flex items-center absolute bottom-0">
              <Pill variant="white-small" className="ml-1 mb-1"/>
              <span className="ml-auto text-[0.625rem] text-dp-gray leading-5 mr-3">10:11</span>
            </div>
          </div>

          <div className="max-w-[60%]">
            <div
              className="justify-end flex flex-col items-center border border-slate-100 shadow-md rounded-xl bg-white px-3 pt-3 pb-4 relative">
              <Text type="text-4" className="text-dp-gray">Requested</Text>
              <Text type="title-7">2 Dash</Text>
              <Text type="text-7" className="text-dp-gray">200 USD</Text>
              <div className="w-full flex items-center absolute bottom-0">
                <Pill variant="grey-small" className="ml-1 mb-1"/>
                <span className="ml-auto text-[0.625rem] text-dp-gray leading-5 mr-3">10:11</span>
              </div>
            </div>
            <div className="flex flex-row space-x-2 mt-2 w-full">
              <SecondaryButton className="flex-grow !py-2">Decline</SecondaryButton>
              <PrimaryButton className="flex-grow !py-2">View</PrimaryButton>
            </div>
          </div>


          <Message {...{reply: true, direction: 'in', text: 'hi', time: '10:09', status: 'read'}}/>

          {/* NOTE: This is just a reference to the blur + opacity combo that needs to be applied to all messages apart
                  from the selected message - if indeed there is one. The wrapping div can be removed, maybe put the
                  styles inside the Message...
        */}
          <div className="blur-[0.05rem] opacity-40">
            <Message {...{direction: 'in', text: '😳', time: '10:09', status: 'read'}}/>
          </div>

          <Message {...{
            event: true,
            direction: 'in',
            text: 'Declined your request of 2 Dash',
            time: '10:09',
            status: 'read'
          }}
                   textClass="text-dp-gray"/>

          <div
            className="justify-end flex flex-col items-center rounded-xl bg-gradient-to-tr from-[#F3F3FF] via-[#F0F2FF] via-35% to-[#E9F0FF] px-3 pt-3 pb-4 max-w-[60%] relative">
            <Text type="text-4" className="text-dp-purple">You sent</Text>
            <Text type="title-7">1 Dash</Text>
            <Text type="text-7" className="text-dp-gray">200 USD</Text>
            <Text type="text-5" className="text-dp-gray text-center w-4/5">Get yourself something nice!</Text>
            <div className="w-full flex items-center absolute bottom-0">
              <Pill variant="primary-small" className="ml-1 mb-1"/>
              <span className="ml-auto text-[0.625rem] text-dp-gray leading-5 mr-3">10:11</span>
            </div>
          </div>

          <Message {...{reply: {text: '5 mins'}, direction: 'out', text: '???', time: '10:09', status: 'read'}}
                   textClass="text-dp-gray"/>

        </section>

        {/*
      <div className="absolute right-3 top-20">
        <div className="mt-[200px] flex flex-row items-center justify-center rounded-xl bg-dp-gray px-3 py-2">
          <Copy color="white" cssClasses="" height="1rem" width="1rem"/>
          <Text type="text-6" className="ml-2 text-white">Copied message text</Text>
        </div>
      </div>
      */}

        {/*
      <div className="absolute top-30">
        <div className="mt-[200px] flex flex-row items-center justify-center rounded-xl bg-dp-gray px-3 py-2">
          <LoadingIndicator variant="circle" className="w-[18px]" svgClassName="text-transparent fill-white"/>
          <Text type="text-6" className="ml-2 text-white">No Internet Connection</Text>
        </div>
      </div>
      */}

        {/*<FriendRequestControls/>*/}

        <div className="mt-auto w-full space-y-2 pt-2 border-dp-purple/10 border-t">
          <SendFriendsOnlyNotification/>
          <SecondaryButton className="bg-dp-purple/10 w-full !py-2">
            <div className="flex flex-row items-center justify-center">
              View Request
              <div
                className="font-light text-xs ml-2 rounded-full bg-dp-purple min-w-[22px] min-h-[22px] text-white flex items-center justify-center px-1.5 py-0.5 flex-grow-0">3</div>
            </div>
          </SecondaryButton>
          <MessageControls/>
          <MessageControls reply={{name: 'HoneyBadger', text: '5 mins'}}/>
        </div>

        <div className="overlay-buttons fixed bottom-0 right-0 pr-4 mb-[150px]">
          <div className="flex h-full flex-col items-end align-bottom justify-end content-end space-y-4">
            <div
              className="button border border-slate-200 cursor-pointer bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center relative">
              <CaretDownIcon className=""/>
              <div
                className="absolute rounded-full bg-dp-purple min-w-[22px] min-h-[22px] text-white flex items-center justify-center px-1.5 py-0.5 -top-2 right-5">3
              </div>
            </div>
          </div>
        </div>


        {state.menuVisible && <ContextMenu options={menuOptions} onClose={toggleMenu}/>}
      </div>
    ),

    [Modes.Search]: (
      <>
        <div className="flex flex-col flex-grow flex-start content-start items-start justify-start -mb-4">
          <header className="flex mb-2 w-full items-center">
            <div className="flex flex-grow">
              <SearchInput placeholder="Search this chat" value={state.search} onChange={onSearchChange} />
            </div>
            <div className="ml-3 flex flex-row">
              <CloseOutline height="2rem" width="2rem" color="rgb(var(--purple))" cssClasses="cursor-pointer" onClick={onExitSearch} />
            </div>
          </header>
          <section className="my-8">
            [ Search Results ]
          </section>
          <section className="message-input flex flex-col w-full mt-auto">
            <div className="border-t border-gray-100 -ml-4 -mr-4 py-4 px-4 flex flex-row items-center">
              <Text type="text-5" className="text-dp-purple text-base">1 of 10</Text>
              <div className="ml-auto flex flex-row space-x-6">
                <CaretDownIcon stroke="rgb(var(--purple))"  className="ml-2 cursor-pointer select-none w-[14px] h-[14px]" />
                <CaretDownIcon stroke="rgb(var(--purple))"  className="ml-2 cursor-pointer select-none w-[14px] h-[14px] rotate-180" />
              </div>
            </div>
          </section>
        </div>
      </>
    ),
  }[state.mode]


  return (
    <>
      <qrModal.Component/>
      <fingerprintModal.Component/>
      <pinModal.Component/>
      {stateContent}
    </>
  )
}