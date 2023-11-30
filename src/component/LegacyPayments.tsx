import DashIcon from "../asset/icon/dash.svg?react";
import React from 'react'
import Pill from "./Pill";
import Text from "./Text";

export default function (props: any) {
  return (
    <section {...{
      ...props,
      className: props.className + " legacy-payments",
    }}>
      <div className="flex items-center">
        <div className="flex-shrink-0 w-[3.1875rem] h-[3.1875rem] bg-[#008DE4] rounded-xl flex justify-center items-center">
          <DashIcon fill="white" className="w-[1.4rem]"/>
        </div>
        <div className="flex-col ml-3 w-full">

          <div className="flex flex-row items-center">
            <Text type="title-7">Legacy Payments</Text>
            <Text type="text-5" className="ml-auto text-dp-text-gray-dark">Yesterday</Text>
          </div>

          <div className="flex-row">
            <Text type="text-3" className="text-dp-text-gray-dark inline">Sent</Text>
            <Pill variant="sent" amount={4}/>
          </div>
        </div>

      </div>
    </section>
  )
}


