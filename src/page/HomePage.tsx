import React, {useEffect, useState} from 'react'
import MenuIcon from "../component/MenuIcon";
import Text from "../component/Text";
import walletImage from "../asset/image/wallet.svg";
import checklistImage from "../asset/image/checklist.svg";
import parkRelaxingImage from "../asset/image/parkrelaxing.svg";
import LegacyPayments from "../component/LegacyPayments";
import ProfileCircle from "../component/ProfileCircle";
import Pill from "../component/Pill";
import {Cog, EyeOutline, Person, PersonAdd, QrCode, Scan,} from "react-ionicons";
import SearchInput from "../component/SearchInput";
import useContextMenu from "../component/context-menu/useContextMenu";
import transactionsSvg from "../asset/icon/transactions.svg";
import {useNavigate} from "react-router-dom";
import store from "../store";
import ContactList from "../component/list/ContactList";
import List from "../component/list/List";
import useFriendRequestModal from "../component/modal/useFriendRequestModal";
import IncomingIcon from "../component/icon/IncomingIcon";
import OutgoingIcon from "../component/icon/OutgoingIcon";
import useQRModal from "../component/modal/useQRModal";


export default function () {
  const nav = useNavigate()

  const [account, setAccount]: any = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult]: any = useState()

  useEffect(() => {
    store.getActiveAccount().then(account => {
      setAccount(account)
    })
  }, [])

  const WalletRecoverCard = () => (
    <div className="mt-3 p-3 rounded-xl bg-blue-50 flex">
      <div className="flex flex-col">
        <Text type="title-6-reg">Your wallet will recover soon!</Text>
        <Text type="text-8" className="text-gray-600">It may take a couple of minutes</Text>
        <div className="mt-2 w-[80%] h-[2px] rounded bg-white">
          <div className="w-[30%] rounded bg-dp-purple h-full"></div>
        </div>
      </div>
      <img src={walletImage} alt="wallet with confetti" className="w-20 ml-auto"/>
    </div>
  )

  const ProfileCompletionCard = () => (
    <div className="mt-3 p-3 rounded-xl bg-dp-green/10 flex overflow-hidden">
      <div className="flex flex-col">
        <Text type="title-6-reg" className="w-4/5">Your profile is 80% complete</Text>
        <Text type="text-8" className="text-gray-600"></Text>
        <div className="mt-2 w-[80%] h-[2px] rounded bg-white">
          <div className="w-[80%] rounded bg-dp-green h-full"></div>
        </div>
      </div>
      <img src={checklistImage} alt="wallet with confetti" className="w-20 ml-auto -mt-3 -mb-4"/>
    </div>
  )

  const qrModal = useQRModal({address: account.address})

  const updateSearchTerm = term => {
    setSearchTerm(term)
    if (term == '') {
      setSearchResult(undefined)
      return
    }
    store.search(term).then(searchResult => {
      setSearchResult(searchResult)
    })
  }

  const menu = useContextMenu({
    options: [{
      text: 'Edit my Profile',
      icon: <Person width="16px" color="rgb(var(--purple))"/>,
      onClick: () => nav('/edit-profile'),
    }, {
      text: 'Show my QR code',
      icon: <QrCode width="16px" color="rgb(var(--purple))"/>,
      onClick: () => {
        menu.setOpen(false)
        qrModal.setOpen(true)
      },
    }, {
      text: 'Transactions',
      icon: <img src={transactionsSvg} alt="transactions icon" className="w-[16px]"/>,
      onClick: () => nav('/transactions'),
    }, {
      text: 'Settings',
      icon: <Cog width="16px" color="rgb(var(--purple))"/>,
      onClick: () => nav('/settings'),
    }]
  })

  const friendRequestModal = useFriendRequestModal()

  const onClickAddFriend = () => friendRequestModal.setOpen(true)

  return (
    <div className="dp-home flex flex-col flex-grow flex-start">
      {menu.component}
      <qrModal.Component/>
      {friendRequestModal.component}
      <section className="profile">
        <div className="flex flex-row">
          <ProfileCircle user={account} variant="primary"/>
          <div className="flex flex-col ml-3">
            <div className="flex flex-row items-center">
              <Text type="title-4">{account.name}</Text>
              <div className="ml-1 cursor-pointer">
                <EyeOutline height="1.1rem" width="1.1rem" color="rgb(var(--gray))"/>
              </div>
            </div>
            <div className="flex flex-row">
              <Text type="text-4">{account.balance} Dash</Text>
              <Text type="text-4" className="text-dp-gray ml-1">(6435MM VES)</Text>
            </div>
          </div>
          <MenuIcon onClick={() => menu.setOpen(true)}/>
        </div>
      </section>
      <section className="cards">
        <WalletRecoverCard/>
        <ProfileCompletionCard/>
      </section>
      <section className="search">
        <SearchInput className="mt-3" value={searchTerm} onChange={e => updateSearchTerm(e.target.value)}/>
        {/*{searchTerm && !searchResult && 'searching...'}*/}
        {searchTerm && searchResult && (
          <>
            <div className="mt-2">
              <Text type="text-3" className={`text-dp-gray mt-3 mb-3`}>Friends</Text>
              <ContactList contacts={searchResult.friends} />
            </div>
            <div className="mt-2">
              <Text type="text-3" className={`text-dp-gray mt-6 mb-3`}>Messages</Text>
              <List {...{
                entries: searchResult.messages,
                size: 'lg',
                iconContent: (x: any) => (
                  <ProfileCircle user={x.from} size='md'/>
                ),
                mainContent: (x: any) => (
                  <div className="overflow-hidden mr-4">
                    <div className="flex align-middle justify-center">
                      <Text type="title-7" className="truncate">{x.from.name}</Text>
                      <Text type="text-5" className="text-dp-gray ml-auto self-center">{x.time}</Text>
                    </div>
                    <Text type="text-3" className="truncate text-dp-gray">{x.text}</Text>
                  </div>
                ),
              }} />
            </div>
            <div className="mt-2">
              <Text type="text-3" className={`text-dp-gray mt-3 mb-3`}>Everyone</Text>
              <ContactList contacts={searchResult.everyone} />
            </div>
          </>
        )
        }
      </section>
      {!searchResult &&
        <section className="activity">
          {/*CHAT*/}

          <div className="mt-3 flex items-center">
            <ProfileCircle className="bg-[#A4D6FF]">S</ProfileCircle>
            <div className="flex-col ml-3 w-full">
              <div className="flex flex-row items-center">
                <Text type="title-7">Sam</Text>
                <Text type="text-5" className="ml-auto text-dp-purple">9:41 PM</Text>
              </div>
              <div className="flex flex-row items-center">
                <Text type="text-3" className="text-dp-gray-dark">ok</Text>
                <div className="flex ml-auto space-x-1">
                  <Pill variant="received-small"/>
                  <Pill variant="primary">3</Pill>
                </div>
              </div>
            </div>
          </div>

          {/* this one has the swipe example */}
          <div className="mt-3 flex items-center">
            <ProfileCircle className="bg-[#A4D6FF]">S</ProfileCircle>
            <div className="flex-col ml-3 w-full">
              <div className="flex flex-row items-center">
                <Text type="title-7">Sam</Text>
                <Text type="text-5" className="ml-auto text-dp-purple">9:41 PM</Text>
              </div>
              <div className="flex flex-row items-center">
                <Text type="text-3" className="text-dp-gray-dark">ok</Text>
                <div className="flex ml-auto space-x-1">
                  <Pill variant="received-small"/>
                  <Pill variant="primary">3</Pill>
                </div>
              </div>
            </div>
            <div className="flex flex-row ml-4 -mr-4">
              {/*<div className="bg-dp-green/10">*/}
              {/*  /!*<div className="circle rounded-full w-[20px] h-[20px] "></div>*!/*/}
              {/*  <Pill variant="primary">*/}
              {/*    /!*<img src={receivedSvg} alt="request" style={{color: 'white', fill: 'white'}}/>*!/*/}
              {/*    <ReceivedIcon/>*/}
              {/*  </Pill>*/}
              {/*  <Text type="text-4">Request</Text>*/}
              {/*</div>*/}

              <div className="bg-dp-green/10 w-[80px] py-3 h-full flex flex-col justify-center items-center">
                <IncomingIcon className="stroke-white bg-dp-green w-[1.5625rem] h-[1.5625rem]"/>
                <Text type="text-4" className="mt-1">Request</Text>
              </div>

              <div className="bg-dp-purple/10 w-[80px] py-3 h-full flex flex-col justify-center items-center">
                <OutgoingIcon className="stroke-white bg-dp-purple w-[1.5625rem] h-[1.5625rem]"/>
                <Text type="text-4" className="mt-1">Send</Text>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center">
            <ProfileCircle className="bg-[#7bc7c5]">M</ProfileCircle>
            <div className="flex-col ml-3 w-full">
              <div className="flex flex-row items-center">
                <Text type="title-7" className="text-dp-gray-dark">Matt</Text>
                <Text type="text-5" className="ml-auto text-dp-gray-dark">Yesterday</Text>
              </div>
              <div className="flex flex-row items-center">
                <Text type="text-3" className="text-dp-gray-dark">Hi</Text>
                <div className="flex ml-auto">
                  <Pill variant="message-small"/>
                </div>
              </div>
            </div>
          </div>

          <LegacyPayments className="mt-3 cursor-pointer" onClick={() => nav('/transactions-legacy')}/>

          {/*NEW*/}
          <div className="mt-3 flex items-center">
            <ProfileCircle className="bg-[#7CC8C5]">A</ProfileCircle>
            <div className="flex-col ml-3 w-full">
              <div className="flex flex-row items-center">
                <Text type="title-7">Alex</Text>
                <Text type="text-5" className="ml-auto text-dp-purple">9:40 PM</Text>
              </div>
              <div className="flex flex-row items-center">
                <Text type="text-3" className="text-dp-gray-dark">Received</Text>
                <Pill variant="received" amount={0.0331} className="ml-1"/>
                <div className="flex ml-auto space-x-1">
                  <Pill variant="received-small"/>
                  <Pill variant="primary">12</Pill>
                </div>
              </div>
            </div>
          </div>

          {/* This is just another dupliate of the one above - need to refactor */}
          <div className="mt-3 flex items-center">
            <ProfileCircle className="bg-[#FA7C7C]">M</ProfileCircle>
            <div className="flex-col ml-3 w-full">
              <div className="flex flex-row items-center">
                <Text type="title-7">Mary</Text>
                <Text type="text-5" className="ml-auto text-dp-purple">9:45 PM</Text>
              </div>
              <div className="flex flex-row items-center">
                <Text type="text-3" className="text-dp-gray-dark">Requested</Text>
                <Pill variant="requested" amount={0.0331} className="ml-1"/>
                <div className="flex ml-auto space-x-1">
                  <Pill variant="requested-small"/>
                  <Pill variant="primary">3</Pill>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
      <section className="splash-image mt-3 ">
        <img src={parkRelaxingImage} className="select-none pointer-events-none" alt="A woman and man relax in a park"/>
      </section>
      <div className="overlay-buttons fixed bottom-0 right-0 pr-4 pb-6">
        <div className="flex h-full flex-col items-end align-bottom justify-end content-end space-y-4">
          <div
            className="button cursor-pointer bg-white w-[3.4rem] h-[3.4rem] rounded-full flex items-center justify-center shadow-lg">
            <Scan height="1.5rem" width="1.5rem" color="rgb(var(--purple))"/>
          </div>
          <div
            className="button cursor-pointer bg-gradient-to-tr from-[#627BFF] to-[#8D71FF] w-[3.4rem] h-[3.4rem] rounded-full flex items-center justify-center" onClick={onClickAddFriend}>
            <PersonAdd height="1.5rem" width="1.5rem" color="white"/>
          </div>
        </div>
      </div>
    </div>
  )
}