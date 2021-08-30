import { action, Action } from 'easy-peasy'
import Idata from './Interfaces'
export interface UsersModel {
  items: Idata[];
  userDetails: Idata;
  createUser: Action<UsersModel, Idata>;
  setUserInfo: Action<UsersModel, Idata>;
  removeUser: Action<UsersModel, number | string>;
  updateUser: Action<UsersModel, Idata>;
}

const users: UsersModel = {
  items: [],
  userDetails: {
    userId: '',
    userName: '',
    userEmail: '',
    userAge: undefined

  },
  createUser: action((state, payload) => {
    state.items.push(payload);
  }),
  removeUser: action((state, payload) => {
    state.items = state.items.filter((user) => user.userId !== payload);
  }),
  updateUser: action((state, payload) => {
    const userUpdateIndex = state.items.findIndex((user) => {
      return user.userId === payload.userId
    });
    console.log(payload)
    if (userUpdateIndex === -1 ) {
      return undefined
    }
    state.items[userUpdateIndex] = payload
  }),
  setUserInfo: action((state, payload) => {
    const userDetailsOnFind = state.items.find(val => val.userId === payload.userId);
    if (userDetailsOnFind?.userId !== payload.userId) {
      return undefined
    }
    state.userDetails = userDetailsOnFind
  }),
};

export default users;