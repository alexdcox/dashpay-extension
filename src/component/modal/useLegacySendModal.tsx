import React, {useState} from "react";
import useModal from "./useModal";
import Text from "../Text";
import PrimaryButton from "../PrimaryButton";
import Keypad from "../Keypad";
import AmountDisplay from "../AmountDisplay";
import AddressInput from "../AddressInput";

export default function () {
  const [state, setState] = useState({
    address: 'yhwXNMsJzkSH3epRdaS5EvUewDqQxgGCfo',
  })

  const onChangeAddress = e => setState({...state, address: e.target.value})

  const modal = useModal({
    children: (
      <>
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-center items-center mt-1">
            <Text type="title-4" className="">Send</Text>
          </div>
          <AddressInput value={state.address} onChange={onChangeAddress} className="mt-4"/>
          <AmountDisplay showEdit={false} className="mt-6 mb-4"/>
          <Keypad/>
          <PrimaryButton className="w-full mt-6">Next</PrimaryButton>
        </div>
      </>
    )
  })

  return {...modal, state, setState}
}