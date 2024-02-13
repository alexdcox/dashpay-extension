import React from "react";
import useModal from "./useModal";
import Text from "../Text";
import {FingerPrintOutline} from "react-ionicons";
import SecondaryButton from "../SecondaryButton";

export default function () {
  const modal = useModal({
    children: (
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center items-center mt-1">
          <Text type="title-4" className="">Confirm payment with a pin</Text>
        </div>
        <div className="fingerprint-icon flex flex-grow justify-center items-center align-middle my-10">
          <FingerPrintOutline height="5rem" width="5rem" color="#BFC5CB" />
        </div>
        <SecondaryButton className="w-full bg-dp-purple/10">Use pin</SecondaryButton>
      </div>
    )
  })

  return {...modal}
}