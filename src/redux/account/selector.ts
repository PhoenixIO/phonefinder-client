import { RootState } from '../store';

export const selectEmail = (state: RootState) => state.account.email;

export const selectRoles = (state: RootState) => state.account.roles;

export const selectAccount = (state: RootState) => state.account;
