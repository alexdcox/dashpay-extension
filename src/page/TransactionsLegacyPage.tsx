import React, {useEffect, useState} from 'react'
import BackButton from "../component/BackButton";
import Text from "../component/Text";
import TransactionList from "../component/list/TransactionList";
import {Filter} from "react-ionicons";
import store from '../store'
import useTransactionFilterMenu from "../component/context-menu/useTransactionFilterMenu";

export default function () {
  const [state, setState] = useState({
    transactions: [],
  })
  let groupedTransactions = state.transactions.reduce((groups, current) => {
    let discriminator = current.date
    groups[discriminator] = [...(groups[discriminator] || []), current]
    return groups
  }, {})

  useEffect(() => {
    store.getLegacyTransactions().then(transactions => {
      setState({...state, transactions})
    })
  }, []);

  const filterMenu = useTransactionFilterMenu()

  return (
    <div className="flex flex-col flex-grow flex-start content-start items-start justify-start">
      {filterMenu.component}
      <header className="flex items-center w-full">
        <BackButton/>
        <Text type="title-4">Transactions</Text>
        <div className="ml-auto cursor-pointer w-fit">
          <Filter color="rgb(var(--purple))" onClick={() => filterMenu.setOpen(true)}/>
        </div>
      </header>
      <div className="w-full">
        {Object.entries(groupedTransactions).map(([k, v]: any, i:number) => (
          <div key={k} className="mt-2">
            <Text type="text-5" className={`text-dp-gray ${i > 0 ? 'mt-6': 'mt-2'} mb-3`}>{k}</Text>
            <TransactionList transactions={v}/>
          </div>
        ))}
      </div>
    </div>
  )
}