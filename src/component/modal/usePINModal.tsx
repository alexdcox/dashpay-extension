import React from "react";
import useModal from "./useModal";
import Text from "../Text";
import PrimaryButton from "../PrimaryButton";
import linkedKeypadAndPINDisplay from "../linkedKeypadAndPINDisplay";

export default function () {
  const {PINDisplay, Keypad, pin, setPIN} = linkedKeypadAndPINDisplay()

  const modal = useModal({
    children: (
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center items-center mt-1">
          <Text type="title-4" className="">Confirm payment with a pin</Text>
        </div>
        <PINDisplay className="w-full mt-10 mb-8"/>
        <Keypad/>
        <PrimaryButton className="w-full mt-6">Next</PrimaryButton>
      </div>
    )
  })

  return {...modal, pin, setPIN}
}