
import React from 'react'
import Pill from "./Pill";
import Text from "./Text";
import LegacyPaymentsIcon from "./LegacyPaymentsIcon";

export default function (props: any) {
  return (
    <section {...{
      ...props,
      className: props.className + " legacy-payments",
    }}>
      <div className="flex items-center">
        <LegacyPaymentsIcon className="w-[3.1875rem] h-[3.1875rem]"/>
        <div className="flex-col ml-3 w-full">

          <div className="flex flex-row items-center">
            <Text type="title-7">Legacy Payments</Text>
            <Text type="text-5" className="ml-auto text-dp-gray-dark">Yesterday</Text>
          </div>

          <div className="flex-row space-x-1">
            <Text type="text-3" className="text-dp-gray-dark inline">Sent</Text>
            <Pill variant="sent" amount={4}/>
          </div>
        </div>

      </div>
    </section>
  )
}


