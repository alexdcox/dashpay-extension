import React, {useState} from "react";
import useModal from "./useModal";
import Text from "../Text";
import ArrowIcon from "../../asset/icon/arrow.svg?react";
import {CopyOutline, Repeat} from "react-ionicons";
import PrimaryButton from "../PrimaryButton";
import Pill from "../Pill";
import ProfileCircle from "../ProfileCircle";
import Input from "../Input";
import SecondaryButton from "../SecondaryButton";
import linkedKeypadAndAmountDisplay from "../linkedKeypadAndAmountDisplay";

export default function () {
  const Steps = {
    Amount: 0,
    Message: 1,
    Cancel: 2,
    Accept: 3,
    Transaction: 4,
  }

  const Variant = {
    Send: 'send',
    Request: 'request',
  }

  const [state, setState]: any = useState({
    step: Steps.Amount,
    variant: Variant.Send,
    message: 'The is for the bananas from last week.',
    address: 'yhwXNMsJzkSH3epRdaS5EvUewDqQxgGCfo',
  })

  const v = {
    [Variant.Send]: {
      title: () => {
        switch (state.step) {
          case [Steps.Accept]: return 'Accept request'
          case [Steps.Transaction]:
          case [Steps.Cancel]: return 'Your Request'
          default: return 'Send Dash'
        }
      },
      titleComplete: 'You Sent',
      textColor: 'text-dp-purple',
      pillVariant: 'purple-small',
      solidLightBg: 'bg-dp-purple/10',
      solidDarkBg: 'bg-dp-purple',
      gradientBg: 'bg-gradient-to-tr from-[#F3F3FF] to-[#E9F0FF]',
      textCssVar: 'rgb(var(--purple))',
    },
    [Variant.Request]: {
      title: () => 'Request Dash',
      titleComplete: 'You Received',
      textColor: 'text-dp-green',
      pillVariant: 'green-light-small',
      solidLightBg: 'bg-dp-green/10',
      solidDarkBg: 'bg-dp-green',
      gradientBg: 'bg-gradient-to-tr from-[#F2F8FD] to-[#EBFFF8]',
      textCssVar: 'rgb(var(--green))',
    },
  }[state.variant]

  const keypadAndDisplay = linkedKeypadAndAmountDisplay()

  const isNextButtonEnabled = () => {
    switch (state.step) {
      case Steps.Amount:
        return keypadAndDisplay.state.cryptoAmount > 0

      case Steps.Message:
        return true
    }
  }

  const isNextButtonVisible = () => [Steps.Amount, Steps.Message].includes(state.step)

  const onClickNext = () => {
    if (!isNextButtonEnabled()) return
    setState({...state, step: state.step + 1})
  }

  const onUpdateMessage = e => setState({...state, message: e.target.value})

  const onClickSwitchSendOrRequest = () => setState({
    ...state,
    variant: state.variant == Variant.Send ? Variant.Request : Variant.Send
  })

  const currentUserAmountSection = (
    <div className="flex flex-row items-center">
      <ProfileCircle size="sm" user={state?.currentUser}/>
      <div className="flex flex-col ml-2 w-full -mr-4">
        <Text type="title-7">{state?.currentUser?.name}</Text>
        <div className="flex flex-row">
          {state.step !== Steps.Transaction && (
            <>
              <Text type="text-4" className="text-dp-gray">New Balance:</Text>
              <Text type="text-4" className="text-dp-purple ml-1">{state?.currentUser?.balance}</Text>
            </>
          )}
          {state.step === Steps.Transaction && state.variant === Variant.Send && (
            <Text type="text-4" className="text-dp-gray">
              20 May, 2021. 6:30 PM
            </Text>
          )}
        </div>
      </div>
    </div>
  )

  const targetUserAmountSection = (
    <div className="flex flex-row items-center">
      <ProfileCircle size="sm" user={state?.targetUser}/>
      <div className="flex flex-col ml-2">
        <Text type="title-7">{state?.targetUser?.name}</Text>
        <div className="flex flex-row">
          {state.step === Steps.Transaction && state.variant == Variant.Request && (
            <Text type="text-4" className="text-dp-gray">
              20 May, 2021. 6:30 PM
            </Text>
          )}
        </div>
      </div>
    </div>
  )

  const accountsComponent = (
    <div className={`p-3 w-full rounded-2xl mt-3 ${v.gradientBg}`}>
      {state.variant == Variant.Send ? currentUserAmountSection : targetUserAmountSection}
      <div className="-my-1 -mr-3 flex flex-row items-center relative">
        <div className="w-[2.5625rem] flex-shrink-0 mr-2 flex flex-row justify-center">
          <ArrowIcon stroke="black" className="w-[9px]"/>
        </div>
        <div className="w-full h-[1px] bg-[#E6E6E6]"/>
        <div
          className={`absolute select-none right-3 flex items-center rotate-90 justify-center shrink-0 rounded-full w-[35px] h-[35px] ${v.solidDarkBg} cursor-pointer`}>
          <Repeat color="white" cssClasses="" onClick={onClickSwitchSendOrRequest}/>
        </div>
      </div>
      {state.variant == Variant.Send ? targetUserAmountSection : currentUserAmountSection}
    </div>
  )

  const stepContent = {
    [Steps.Amount]: (
      <>
        {accountsComponent}
        {state.error && (
          <span className="text-dp-red mt-1 text-xs -mb-4">Not enough funds to pay the request</span>
        )}
        <keypadAndDisplay.AmountDisplay className="my-4" showEdit={false}/>
        <keypadAndDisplay.Keypad className="mb-4"/>
      </>
    ),

    [Steps.Message]: (
      <>
        <div className="w-full my-4 flex items-center align-middle justify-center content-center relative">
          <div className="flex flex-col items-center w-full">
            <keypadAndDisplay.AmountDisplay/>
            <div className="w-full mt-5 mb-3">
              <Text type="text-3" className="text-dp-gray">Message:</Text>
              <Input value={state.message} placeholder="Your message" className="mt-1" onChange={onUpdateMessage}/>
            </div>
          </div>
        </div>
      </>
    ),

    [Steps.Cancel]: (
      <>
        {accountsComponent}
        <keypadAndDisplay.AmountDisplay className="my-6" showEdit={false} showCurrencySelect={false} showSwitch={false}/>
        <SecondaryButton className="bg-dp-purple/10 !py-2 w-full mt-6">Cancel request</SecondaryButton>
      </>
    ),

    [Steps.Accept]: (
      <>
        {accountsComponent}
        <keypadAndDisplay.AmountDisplay/>
        <div className="flex flex-row w-full space-x-4 mt-6">
          <SecondaryButton
            className="flex flex-row flex-grow align-middle justify-center items-center bg-dp-purple/10 !py-2 w-1/">
            Decline
          </SecondaryButton>
          <PrimaryButton
            className="flex flex-row flex-grow align-middle justify-center items-center bg-dp-purple/10 !py-2 w-1/">
            Send
          </PrimaryButton>
        </div>
      </>
    ),

    [Steps.Transaction]: (
      <>
        {accountsComponent}
        <keypadAndDisplay.AmountDisplay/>
        <div className="flex flex-row items-center my-8">
          <Text type="title-7">{`${state.address.slice(0, 8)}...${state.address.slice(-8)}`}</Text>
          <CopyOutline height="1.5rem" width="1.5rem" color="rgb(var(--purple))" cssClasses="ml-2 cursor-pointer"/>
        </div>

        <SecondaryButton className="!rounded-full">Open explorer</SecondaryButton>
      </>
    )
  }

  const modal = useModal({
    children: (
      <>
        <keypadAndDisplay.CurrencyModal/>
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-center items-center mt-1">
            <Pill variant={v.pillVariant} className=""/>
            <Text type="title-4" className={`ml-2 ${v.textColor}`}>{v.title()}</Text>
          </div>

          {stepContent[state.step]}

          {isNextButtonVisible() && (
            <PrimaryButton
              className="w-full"
              onClick={onClickNext}
              disabled={!isNextButtonEnabled()}>
              Next
            </PrimaryButton>
          )}
        </div>
      </>
    )
  })

  return {...modal, state, setState}
}