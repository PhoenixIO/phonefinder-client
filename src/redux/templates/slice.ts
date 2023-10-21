import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemplatesSliceState } from './types';

const initialState: TemplatesSliceState = {
  editingTemplate: null,
}

const accountSlice = createSlice({
  name: 'templates',
  initialState: initialState,
  reducers: {
    clearTemplates: (state) => {
      state.editingTemplate = null;
    },
    setEditingTemplate: (state, action: PayloadAction<TemplatesSliceState>) => {
      state.editingTemplate = action.payload;
    },
  },
})

export const { clearTemplates, setEditingTemplate } = accountSlice.actions;

export default accountSlice.reducer;
