import { configureStore } from '@reduxjs/toolkit';
import account from './account/slice';
import pages from './pages/slice';
import templates from './templates/slice';

export const store = configureStore({
  reducer: {
    account,
    pages,
    templates,
  },
});

export type RootState = ReturnType<typeof store.getState>;
