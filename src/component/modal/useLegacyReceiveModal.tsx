import React, {useState} from "react";
import useModal from "./useModal";
import Text from "../Text";
import PrimaryButton from "../PrimaryButton";
import QRCode from "../QRCode";
import linkedKeypadAndAmountDisplay from "../linkedKeypadAndAmountDisplay";
import AddressDisplay from "../AddressDisplay";

export default function () {
  const Steps = {
    Address: 0,
    Amount: 1,
  }

  const [state, setState] = useState({
    address: 'yhwXNMsJzkSH3epRdaS5EvUewDqQxgGCfo',
    step: Steps.Address,
  })


  const keypadAndDisplay = linkedKeypadAndAmountDisplay()

  const onClickReceive = () => setState({...state, step: Steps.Address})
  const onClickEdit = () => setState({...state, step: Steps.Amount})

  const stepContent = {
    [Steps.Address]: (
      <>
        <div className="flex flex-row justify-center items-center mt-1">
          <Text type="title-4" className="">Receive</Text>
        </div>
        <keypadAndDisplay.AmountDisplay className="mt-4" onClickEdit={onClickEdit} showCurrencySelect={false}/>
        <QRCode address={state.address} className="w-3/5 mt-4 mb-6"/>
        <AddressDisplay address={state.address}/>
      </>
    ),
    [Steps.Amount]: (
      <>
        <keypadAndDisplay.CurrencyModal/>
        <div className="flex flex-row justify-center items-center mt-1">
          <Text type="title-4" className="">Specify amount</Text>
        </div>
        <keypadAndDisplay.AmountDisplay className="my-4" showEdit={false}/>
        <keypadAndDisplay.Keypad className="mb-4"/>
        <PrimaryButton className="w-full" onClick={onClickReceive}>Receive</PrimaryButton>
      </>
    )
  } [state.step]

  const modal = useModal({
    children: (
      <>
        <div className="flex flex-col items-center">
          {stepContent}
        </div>
      </>
    )
  })

  return {...modal, state, setState}
}
