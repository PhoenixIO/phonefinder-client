import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PagesSliceState, CabinetPages } from './types'

const initialState: PagesSliceState = {
  cabinetPage: CabinetPages.ExamTemplates,
}

const pagesSlice = createSlice({
  name: 'pages',
  initialState: initialState,
  reducers: {
    setCabinetPage: (state, action: PayloadAction<CabinetPages>) => {
      state.cabinetPage = action.payload;
    },
  },
})

export const { setCabinetPage } = pagesSlice.actions;

export default pagesSlice.reducer;
