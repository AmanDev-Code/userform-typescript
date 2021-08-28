  
import users, { UsersModel } from './Actions';

export interface StoreModel {
  users: UsersModel;
}

const model: StoreModel = {
  users
};

export default model;