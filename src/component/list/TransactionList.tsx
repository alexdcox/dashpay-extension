import React from "react";
import List from "./List";
import ProfileCircle from "../ProfileCircle";
import Text from "../Text";
import {randomColor} from "../../util";

export default function(props: any) {
  const {transactions = []} = props
  let entries = transactions

  return <List {...{
    entries,
    iconContent: (t: any) => (
      <ProfileCircle style={{background: randomColor()}} size="xs">
        {t.name?.[0].toUpperCase()}
      </ProfileCircle>
    ),
    mainContent: (t: any) => {
      const sent = t.amount < 0
      return (
        <>
          <Text type="text-2">You {sent ? 'sent' : 'received'}</Text>
          <div className="flex flex-row">
            <Text type="text-8" className="text-dp-text-gray">{sent ? 'To' : 'From'}</Text>
            <Text type="text-8" className="ml-1">{t.name}</Text>
            <Text type="text-8" className="ml-1">(@{t.username})</Text>
          </div>
        </>
      )
    },
    rightContent: (t: any) => {
      const sent = t.amount < 0
      return (
        <div className="flex flex-col ml-auto">
          <Text type="text-2" className={`${sent ? 'text-dp-text-purple' : 'text-dp-text-green'} text-right`}>{Math.abs(t.amount)} Dash</Text>
          <Text type="text-8" className="text-dp-text-gray text-right">{t.usdEquivalent} USD</Text>
        </div>
      )
    },
  }}/>
}
