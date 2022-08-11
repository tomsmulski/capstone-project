import {createSlice} from '@reduxjs/toolkit';

export const sideNavigationSlice = createSlice({
  name: 'sideNavigation',
  initialState: {status: false},
  reducers: {
    set: (state, action) => {
      state.status = action.payload.status;
    },
  },
});

export default sideNavigationSlice.reducer;
