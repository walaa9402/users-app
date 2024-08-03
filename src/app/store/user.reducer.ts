import { createReducer, on } from '@ngrx/store';
import { loadUsers, addUser, updateUser, deleteUser, loadUsersSuccess, addUserSuccess, updateUserSuccess, deleteUserSuccess, addUserFailure, updateUserFailure, deleteUserFailure, loadUsersFailure } from './user.actions';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: []
};

export const userReducer = createReducer(
  initialState,

  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    error: null
  })),
  on(addUserFailure, (state, { error }) => ({
    ...state,
    error
  })),


  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    error: null
  })),
  on(updateUserFailure, (state, { error }) => ({
    ...state,
    error
  })),


  on(deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(u => u.id !== userId),
    error: null
  })),
  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  })),


  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error
  })),



);
