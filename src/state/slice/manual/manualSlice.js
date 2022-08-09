import {createSlice} from '@reduxjs/toolkit';

export const manualSlice = createSlice({
  name: 'manual',
  initialState: {status: false},
  reducers: {
    set: (state, action) => {
      state.status = action.payload.status;
    },
  },
});

export default manualSlice.reducer;
