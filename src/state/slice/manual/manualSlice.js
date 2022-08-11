import {createSlice} from '@reduxjs/toolkit';

export const manualSlice = createSlice({
  name: 'manual',
  initialState: {status: false, category: 'All', buildId: '62e0e777663a9f95727518dd', backTo: ''},
  reducers: {
    set: (state, action) => {
      const {status, category, buildId, backTo} = action.payload;
      state.status = status;
      state.category = category;
      state.buildId = buildId;
      state.backTo = backTo;
    },
  },
});

export default manualSlice.reducer;
