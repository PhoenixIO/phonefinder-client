import { RootState } from '../store';

export const selectEditingTemplate = (state: RootState) => state.templates.editingTemplate;
