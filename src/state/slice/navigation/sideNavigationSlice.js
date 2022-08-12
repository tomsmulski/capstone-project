import {createSlice} from '@reduxjs/toolkit';

export const sideNavigationSlice = createSlice({
  name: 'sideNavigation',
  initialState: {status: false,click:false},
  reducers: {
    set: (state, action) => {
      state.status = action.payload.status;
      state.click = action.payload.click;
    },
  },
});

export default sideNavigationSlice.reducer;
