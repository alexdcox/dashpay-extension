import profilePlaceholderImage from "./asset/image/profile-placeholder.jpeg";
import React from "react";

const mockUsers: any = [{
  name: 'Deohge',
  username: 'deohge',
  active: true,
  balance: 13.20323,
  address: 'yhwXNMsJzkSH3epRdaS5EvUewDqQxgGCfo',
},{
  name: 'Anna',
  username: 'anna1',
  profileColor: '#DCC7FD',
},{
  name: 'Anna',
  username: 'anna22',
  profileImage: profilePlaceholderImage,
},{
  name: 'Bob',
  username: 'bobby',
  profileColor: '#B4EFC1',
  shared: 3,
},{
  name: 'Bobaniel Gregorious Timothy Balderdash',
  username: 'bob1990',
  profileImage: profilePlaceholderImage,
  shared: 1,
},{
  username: 'matt938',
  name: 'Matt',
  profileColor: '#A4D6FF',
},{
  username: 'john',
  name: 'John',
  profileColor: '#0bc290'
},{
  username: 'sam',
  name: 'Sam',
  profileColor: '#A4D6FF'
},{
},{
  username: 'chad',
  name: 'Chad Chaddly',
  profileColor: '#A4D6FF'
},{
  name: 'PostmanPat',
  username: 'blackandwhitecat',
  profileImage: profilePlaceholderImage,
}]

const user = (username: string) => mockUsers.find(u => u.username === username)
const users = (...usernames: Array<string>) => mockUsers.filter(u => usernames.includes(u.username))

const mockTransactions = [
  [user('matt938'), 1, 190, 'May 12, 2021', '10:08'],
  [user('matt938'), -2, 190, 'May 12, 2021', '10:08'],
  [user('john'), -2, 380, 'May 11, 2021', '10:08'],
  [user('john'), -2, 380, 'May 11, 2021', '10:08'],
  [user('john'), 3, 380, 'May 11, 2021', '10:08'],
  [user('anna22'), -2, 380, 'May 10, 2021', '10:08'],
  [user('john'), 1.4, 380, 'May 10, 2021', '10:08'],
  [user('john'), -2, 380, 'May 10, 2021', '10:08'],
  [user('john'), 5.2, 380, 'May 10, 2021', '10:08'],
].map(x => ({
  ...x[0],
  amount: x[1],
  usdEquivalent: x[2],
  date: x[3],
  time: x[4],
}))

const mockLegacyTransactions = mockTransactions.map(({amount, usdEquivalent, date, time}) => ({amount, usdEquivalent, date, time}))

const mockFriends = users('anna1', 'anna22')

const mockConversations = [{
  userId: 'sam',
  messages: [{
    direction: 'in',
    text: 'When was the last time you saw Anna?',
    date: 'May 11, 2021',
    time: '10:08'
  }, {
    direction: 'out',
    text: 'Hi, how are you? I want to send you 2 dash',
    date: 'May 11, 2021',
    time: '10:08',
    status: 'read',
  }, {
    direction: 'out',
    text: 'Is it over, over?',
    date: 'May 11, 2021',
    time: '10:09',
    status: 'sent',
  }],
}]

class Store {
  static Events = {
    AccountUpdated: 'account.updated',
    SettingsUpdated: 'settings.updated',
  }

  eventListeners = {}

  dispatch(event: string, data: any) {
    Object.values(this.eventListeners?.[event] || {}).forEach((cb: any) => cb?.(data))
  }

  async getTransactions() {
    console.log('@Store getTransactions')
    return mockTransactions
  }
  async getLegacyTransactions() {
    return mockLegacyTransactions
  }
  async getAccounts() {
    return users('deohge', 'blackandwhitecat')
  }
  async getFriends() {
    return mockFriends
  }
  async getSuggestedFriends() {
    return users('bobby', 'bob1990')
  }
  async getFriendRequests() {
    return users('bobby', 'bob1990', 'chad')
  }
  async getUsers() {
    return mockUsers
  }
  async getUser(userId: string): Promise<any> {
    return user(userId)
  }
  async getMessages(userId: string): Promise<any> {
    return mockConversations.find(convo => convo.userId == userId)?.messages
  }
  async getContacts(): Promise<any> {
    return mockUsers
  }
  async search(term): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        const latestChatMessages = mockConversations.map(convo => {
          const latestMessage = convo.messages[0]
          return {
            from: user(convo.userId),
            text: latestMessage.text,
            date: latestMessage.date,
            time: latestMessage.time,
          }
        })
        resolve({
          friends: mockFriends,
          messages: latestChatMessages,
          everyone: mockUsers.slice(3),
        })
      }, 1000)
    })
  }
  async logOut() {
    mockUsers.forEach(u => u.active = false)
  }

  async logIn(selectedAccount: any, password: string) {
    mockUsers.forEach(u => u.active = u.username === selectedAccount.username)
  }

  async getActiveAccount() {
    return mockUsers.find(u => u.active)
  }

  async updateActiveAccount(account: any) {
    Object.assign(this.getActiveAccount(), account)
  }

  on(event: string, cb: any) {
    let listeners = {...(this.eventListeners?.[event] || {})}
    const index = Object.keys(listeners).length
    listeners[index] = cb
    this.eventListeners[event] = listeners
    return () => {
      this.eventListeners[event][index] = undefined
    }
  }
}

export default new Store()