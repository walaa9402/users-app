// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';

export interface UserState {
  users: User[];
  error: string | null;
}

const initialState: UserState = {
  users: [],
  error: null
};

export const userReducer = createReducer(
  initialState,

);
