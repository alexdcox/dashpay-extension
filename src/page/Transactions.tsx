import React, {useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import {debugMenu} from "../util";
import TransactionList from "../component/list/TransactionList";
import {Filter} from "react-ionicons";
import store from '../store'

export default function (props: any) {
  const [state, setState] = useState({
    transactions: store.getTransactions(),
  })
  let groupedTransactions = state.transactions.reduce((groups, current) => {
    let discriminator = current.date
    groups[discriminator] = [...(groups[discriminator] || []), current]
    return groups
  }, {})
  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      <header className="flex items-center w-full">
        <BackButton onClick={debugMenu()}/>
        <Text type="title-4">Transactions</Text>
        <Filter color="var(--Purple-text)" className="ml-auto cursor-pointer"/>
      </header>
      <div className="w-full">
        {Object.entries(groupedTransactions).map(([k, v]: any) => (
          <div key={k} className="mt-2">
            <Text type="text-5" className="text-dp-text-gray mb-3">{k}</Text>
            <TransactionList transactions={v}/>
          </div>
        ))}
      </div>
    </div>
  )
}