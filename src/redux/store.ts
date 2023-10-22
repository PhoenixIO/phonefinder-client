import { configureStore } from '@reduxjs/toolkit';
import account from './account/slice';
import pages from './pages/slice';

export const store = configureStore({
  reducer: {
    account,
    pages,
  },
});

export type RootState = ReturnType<typeof store.getState>;
