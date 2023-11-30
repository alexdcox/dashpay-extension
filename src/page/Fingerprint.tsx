import React from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import PrimaryButton from "../component/PrimaryButton";
import {debugMenu} from "../util";
import {Link} from "react-router-dom";
import {FingerPrintOutline} from "react-ionicons";

export default function (props: any) {
  return (
    <div className="dp-fingerprint flex flex-col flex-grow flex-start">
      <header className="flex items-center">
        <BackButton onClick={debugMenu()}/>
        <Text type="title-4">Secure your account</Text>
      </header>
      <div className="explanation">
        <div className="flex flex-col items-center">
          <Text type="title-4" className="mt-6">Use your fingerprint</Text>
          <Text type="text-3" className="text-center text-dp-text-gray mt-2 w-4/5">A quicker way to access your accounts and confirm transactions</Text>
        </div>
      </div>
      <div className="fingerprint-icon flex flex-grow justify-center items-center align-middle">
        <FingerPrintOutline height="5rem" width="5rem" color="#BFC5CB" />
      </div>
      <Link to="/home" className="w-full">
        <PrimaryButton className="w-full mt-auto">Use fingerprint</PrimaryButton>
        <p className="text-center text-dp-text-purple font-medium text-sm pt-6 pb-3">Skip</p>
      </Link>
    </div>
  )
}