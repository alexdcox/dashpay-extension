import React from 'react'
import BackButton from "../component/BackButton";
import Button from "../component/PrimaryButton";
import Text from "../component/Text";
import DefaultButton from "../component/DefaultButton";
import Toggle from "../component/Toggle";
import {Link} from "react-router-dom";

export default function () {
  const seed = [
    'big', 'face', 'hobby', 'grace',
    'regular', 'only', 'hear', 'execute',
    'feel', 'story', 'bean', 'pipe',
  ]
  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex items-center">
        <BackButton/>
        <Text type="title-4">Save your backup phrase</Text>
      </header>
      <Text type="text-3" className="text-dp-gray">
        This seed phrase allows you to recover your account. Write it down and keep it in a safe place.
      </Text>
      <div className="backup-buttons w-full grid grid-cols-3 gap-2 mt-4">
        {seed.map((s, k) => (
          <DefaultButton key={k} className="text-base font-light">{s}</DefaultButton>
        ))}
      </div>
      <div className="verify mt-auto mb-3 flex w-full items-center">
        <Text type="title-6-reg">I securely stored my phrase</Text>
        <div className="ml-auto">
          <Toggle/>
        </div>
      </div>
      <Link to="/pin" className="w-full">
        <Button className="w-full">Create Account</Button>
      </Link>
    </div>
  )
}