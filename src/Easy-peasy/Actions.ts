import { action, Action } from 'easy-peasy'
import UserDetails from './Interfaces'

export interface UsersModel {
  users: UserDetails[];
  userDetails: UserDetails;
  createUser: Action<UsersModel, UserDetails>;
  setUserInfo: Action<UsersModel, UserDetails>;
  removeUser: Action<UsersModel, number | string>;
  updateUser: Action<UsersModel, UserDetails>;
}

const users: UsersModel = {
  users: [],
  userDetails: {
    userId: '',
    userName: '',
    userEmail: '',
    userAge: undefined
  },
  
  createUser: action((state, payload) => {
    console.log(payload)
    state.users.push(payload);
    console.log(payload)
  }),

  removeUser: action((state, payload) => {
    state.users = state.users.filter((user) => user.userId !== payload);
  }),

  updateUser: action((state, payload) => {
    const userUpdateIndex = state.users.findIndex((user) => {
      return user.userId === payload.userId
    });
    if (userUpdateIndex === -1 ) {
      return undefined
    }
    state.users[userUpdateIndex] = payload
  }),

  setUserInfo: action((state, payload) => {
    const userDetailsOnFind = state.users.find(val => val.userId === payload.userId);
    if (userDetailsOnFind?.userId !== payload.userId) {
      return undefined
    }
    state.userDetails = userDetailsOnFind
  }),
};

export default users;