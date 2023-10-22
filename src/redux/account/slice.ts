import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountState } from './types';
import * as api from '../../api';

const initialState: AccountState = {
  email: '',
  roles: [],
  loaded: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    clearAccount: (state) => {
      state.email = '';
      state.roles = [];
      window.localStorage.clear();
    },
    setAccount: (state, action: PayloadAction<AccountState>) => {
      state.email = action.payload.email;
      state.roles = action.payload.roles;
    },
    setAccountLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    logout: () => {
      api.post(`${api.endpoint}/auth/logout`, {});
      accountSlice.actions.clearAccount();
      window.location.href = '/login';
    },
  },
});

export const { setAccount, setAccountLoaded, clearAccount, logout } = accountSlice.actions;

export default accountSlice.reducer;
