import profilePlaceholderImage from "./asset/image/profile-placeholder.jpeg";
import React from "react";

const mockUsers: any = [{
  name: 'Deohge',
  username: 'deohge',
  profileCircle: 'D',
  active: true,
},{
  name: 'Anna',
  username: 'anna1',
  profileCircle: 'A',
  profileColor: 'bg-[#DCC7FD]',
},{
  name: 'Anna',
  username: 'anna22',
  profileCircle: <img src={profilePlaceholderImage} alt=""/>,
},{
  name: 'Bob',
  username: 'bobby',
  profileCircle: 'A',
  profileColor: 'bg-[#B4EFC1]',
  shared: 3,
},{
  name: 'Bobaniel Gregorious Timothy Balderdash',
  username: 'bob1990',
  profileCircle: <img src={profilePlaceholderImage} alt=""/>,
  shared: 1,
},{
  username: 'matt938',
  name: 'Matt',
  profileCircle: 'M',
  profileColor: 'bg-[#A4D6FF]',
},{
  username: 'john',
  name: 'John',
  profileCircle: 'J',
  profileColor: 'bg-[#FA7C7C]'
},{
  name: 'PostmanPat',
  username: 'blackandwhitecat',
  profileCircle: <img src={profilePlaceholderImage} alt=""/>,
}]

const user = (username: string) => mockUsers.find(u => u.username === username)
const users = (...usernames: Array<string>) => mockUsers.filter(u => usernames.includes(u.username))

class Store {
  getTransactions() {
    const matt = user('matt938')
    const john = user('john')
    return [{
      ...matt,
      amount: 1,
      usdEquivalent: 190,
      date: 'May 12, 2021',
    }, {
      ...matt,
      amount: -2,
      usdEquivalent: 190,
      date: 'May 12, 2021',
    }, {
      ...john,
      amount: -2,
      usdEquivalent: 380,
      date: 'May 11, 2021',
    }, {
      ...john,
      amount: -2,
      usdEquivalent: 380,
      date: 'May 11, 2021',
    }, {
      ...john,
      amount: 3,
      usdEquivalent: 380,
      date: 'May 11, 2021',
    }, {
      ...john,
      amount: -2,
      usdEquivalent: 380,
      date: 'May 10, 2021',
    }, {
      ...john,
      amount: 1.4,
      usdEquivalent: 380,
      date: 'May 10, 2021',
    }, {
      ...john,
      amount: -2,
      usdEquivalent: 380,
      date: 'May 10, 2021',
    }, {
      ...john,
      amount: 5.2,
      usdEquivalent: 380,
      date: 'May 10, 2021',
    }]
  }
  getAccounts() {
    return users('deohge', 'blackandwhitecat')
  }
  getFriends() {
    return users('anna1', 'anna22')
  }
  getSuggestedFriends() {
    return users('bobby', 'bob1990')
  }
  getUsers() {
    return mockUsers
  }
  getMessages() {

  }
  getContacts() {

  }
  logOut() {
    mockUsers.forEach(u => u.active = false)
  }

  logIn(selectedAccount: any, password: string) {
    mockUsers.forEach(u => u.active = u.username === selectedAccount.username)
  }
}

export default new Store()