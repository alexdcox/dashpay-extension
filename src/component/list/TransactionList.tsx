import React from "react";
import List from "./List";
import ProfileCircle from "../ProfileCircle";
import Text from "../Text";
import SentIcon from "../../asset/icon/sent.svg?react";
import ReceivedIcon from "../../asset/icon/received.svg?react";

export default function ({
  transactions = []
}) {
  return <List {...{
    entries: transactions,
    iconContent: (t: any) => t.username ? (
        <ProfileCircle size="xs" user={t}/>
      ) :
      t.amount > 0 ? (
        <div
          className="circle bg-dp-green/10 rounded-full w-[2.25rem] h-[2.25rem] text-[0.94rem] flex flex-shrink-0 p-0 items-center justify-center">
          <ReceivedIcon className="w-[15px] h-[15px] stroke-dp-green"/>
        </div>
      ) : (
        <div
          className="circle bg-dp-purple/10 rounded-full w-[2.25rem] h-[2.25rem] text-[0.94rem] flex flex-shrink-0 p-0 items-center justify-center">
          <SentIcon className="w-[15px] h-[15px] stroke-dp-purple"/>
        </div>
      )
    ,
    mainContent: (t: any) => {
      const sent = t.amount < 0
      return (
        <>
          <Text type="text-2">You {sent ? 'sent' : 'received'}</Text>
          <div className="flex flex-row">
            {t.username ?
              <>
                <Text type="text-8" className="text-dp-gray">{sent ? 'To' : 'From'}</Text>
                <Text type="text-8" className="ml-1">{t.name}</Text>
                <Text type="text-8" className="ml-1">(@{t.username})</Text>
              </>
              : <>
                <Text type="text-8" className="text-dp-gray">{t.time}</Text>
              </>
            }
          </div>
        </>
      )
    },
    rightContent: (t: any) => {
      const sent = t.amount < 0
      return (
        <div className="flex flex-col ml-auto">
          <Text type="text-2"
                className={`${sent ? 'text-dp-purple' : 'text-dp-green'} text-right`}>{Math.abs(t.amount)} Dash</Text>
          <Text type="text-8" className="text-dp-gray text-right">{t.usdEquivalent} USD</Text>
        </div>
      )
    },
  }}/>
}
