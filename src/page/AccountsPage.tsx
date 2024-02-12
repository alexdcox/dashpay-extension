import React, {useEffect, useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import ProfileCircle from "../component/ProfileCircle";
import Modal from "../component/modal/Modal";
import List from "../component/list/List";
import PrimaryButton from "../component/PrimaryButton";
import {Add, CheckmarkOutline, DownloadOutline, LogOutOutline} from 'react-ionicons'
import store from "../store";
import Input from "../component/Input";
import {Link, useNavigate} from "react-router-dom";

export default function () {
  const [state, setState] = useState<any>({
    accounts: [],
    modalVisible: false,
  })
  const [password, setPassword] : [string|undefined, any] = useState()
  const nav = useNavigate()

  useEffect(() => {
    store.getAccounts().then(accounts => {
      setState({...state, accounts})
    })
  }, [])

  const Grabber = () => (
    <div className="grabber flex flex-col flex-wrap max-h-[24px] cursor-pointer">
      {[...Array(6)].map((_, k) => (
        <div key={k} className="w-[4px] h-[4px] mr-[4px] mb-[4px] bg-slate-400 rounded-full"/>
      ))}
    </div>
  )

  const hasActiveUser = () => state.accounts.some(a => a.active)
  const openModal = () => setState(s => ({...s, modalVisible: true}))
  const closeModal = () => setState(s => ({...s, modalVisible: false}))
  const onSelectAccount = account => {
    if (account.active) nav('/home')
    else {
      setState(s => ({...s, selectedAccount: account}))
      openModal()
    }
  }
  const onLogout = () => {
    store.logOut().then(() => {
      setState(s => ({...s, accounts: store.getAccounts()}))
    })
  }
  const onLogin = (password: string) => {
    store.logIn(state.selectedAccount, password).then(() => {
      nav('/home')
    })
  }
  const onInputKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Escape') {
      closeModal()
    }
  }

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex items-center mb-4">
        <BackButton/>
        <Text type="title-4">My accounts</Text>
      </header>

      <List
        className="w-full"
        size="lg"
        entries={state.accounts}
        onSelect={onSelectAccount}
        iconContent={a => (
          <ProfileCircle className="" variant="primary" size="sm" user={a}/>
        )}
        mainContent={a => (
          <>
            <Text type="title-7">{a.name}</Text>
            <Text type="text-4" className="text-dp-gray">{a.username}</Text>
          </>
        )}
        rightContent={a => (
          <>
            {a.active && (
              <div
                className="h-[1.25rem] w-[1.25rem] bg-dp-purple rounded-full flex items-center justify-center ml-auto">
                <CheckmarkOutline height="1rem" width="1rem" color="white"/>
              </div>
            )}
          </>
        )}
      />

      <div className="icon-menu mt-8">
        <div className="icon-menu-item flex items-center">
          <div
            className="circle bg-dp-purple/10 rounded-full w-[1.5625rem] h-[1.5625rem] flex items-center justify-center">
            <Add height="1rem" width="1rem" color="rgb(var(--purple))"/>
          </div>
          <Link to="/username" state={{allowBack: true}}>
            <Text type="text-1" className="ml-4">Create new account</Text>
          </Link>
        </div>
        <div className="icon-menu-item flex items-center mt-4">
          <div
            className="circle bg-dp-purple/10 rounded-full w-[1.5625rem] h-[1.5625rem] flex items-center justify-center">
            <DownloadOutline height="1rem" width="1rem" color="rgb(var(--purple))"/>
          </div>
          <Link to="/recover" state={{allowBack: true}}>
            <Text type="text-1" className="ml-4">Add an existing wallet</Text>
          </Link>
        </div>
      </div>

      {hasActiveUser() && (
        <div className="logout flex mt-auto items-center cursor-pointer select-none" onClick={onLogout}>
          <LogOutOutline height="1.7rem" width="1.7rem" color="rgb(var(--purple))"/>
          <Text type="text-1" className="ml-2 text-dp-purple">Log out</Text>
        </div>
      )}

      {state.modalVisible && (
        <Modal onClose={closeModal}>
          <div className="flex flex-col items-center">
            <Text type="title-4">Unlock Account</Text>
            <ProfileCircle size="lg" variant="primary" className="mt-6" user={state?.selectedAccount}/>
            <Text type="title-4" className="mt-2">{state?.selectedAccount?.name}</Text>
            <Text type="text-4" className="text-dp-gray">{state?.selectedAccount?.username}</Text>
            <form onSubmit={() => onLogin?.(password)} className="w-full">
              <Input autoFocus={true} type="password" placeholder="Password" className="mt-4 mb-14" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={onInputKeyDown}/>
              <PrimaryButton type="submit" disabled={(password?.length || 0) < 3} className="w-full mt-8">Login</PrimaryButton>
            </form>
          </div>
        </Modal>
      )}


    </div>
  )
}