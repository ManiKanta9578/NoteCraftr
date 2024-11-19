import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    loadingShow: (state, action) => action.payload, 
  },
});

export const { loadingShow } = loadingSlice.actions;

export default loadingSlice.reducer;