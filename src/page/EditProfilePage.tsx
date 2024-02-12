import React, {useEffect, useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import ProfileCircle from "../component/ProfileCircle";
import profilePlaceholderImage from '../asset/image/profile-placeholder.jpeg'
import Subtitle from "../component/Subtitle";
import store from "../store";
import Input from "../component/Input";
import PrimaryButton from "../component/PrimaryButton";
import {useNavigate} from "react-router-dom";

export default function () {
  const [state, setState] = useState({name: '', status: '', account: undefined})

  useEffect(() => {
    store.getActiveAccount().then(account => {
      setState({...state, account})
    })
  }, [])

  const onChange = (property: string) => (e: any) => {
    setState({...state, [property]: e.target.value})
  }
  const canSubmit = () => {
    // TODO: Set to actual validation rules for dpns
    return state.name.length > 3 &&
      state.name.length < 100 &&
      state.status?.length < 60 &&
      ((state.name && state.name != state.account?.name) || (state.status && state.status != state?.account.status))
  }
  const nav = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit()) return
    store.updateActiveAccount(state).then(() => {
      nav(-1)
    })
  }
  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex items-center">
        <BackButton/>
        <Subtitle>Edit my profile</Subtitle>
      </header>

      <div className="flex flex-col w-full h-full flex-grow items-center mt-3 cursor-pointer">
        <ProfileCircle size="lg" variant="primary" className="">
          <img src={profilePlaceholderImage} alt=""/>
        </ProfileCircle>
        <Text type="text-2" className="mt-2 text-dp-purple">Add photo</Text>

        <form action="" className="flex flex-grow flex-col w-full" onSubmit={onSubmit}>
          <Input label="Display Name" value={state.name} placeholder="Display name" onChange={onChange('name')} className="mt-3"/>
          <Input label="Your Status" value={state.status} textarea placeholder="Status message" onChange={onChange('status')} className="mt-3"/>
          <PrimaryButton type="submit" disabled={!canSubmit()} className="w-full mt-auto">Save</PrimaryButton>
        </form>
      </div>


    </div>
  )
}