import {createSlice} from '@reduxjs/toolkit';

export const manuelSlice = createSlice({
  name: 'manuel',
  initialState: {status: false},
  reducers: {
    set: (state, action) => {
      state.status = action.payload.status;
    },
  },
});

export default manuelSlice.reducer;
