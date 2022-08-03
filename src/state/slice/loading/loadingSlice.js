import {createSlice} from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {status: true, loadBuildings: false, loadResources: false, loadUserCitys: false},
  reducers: {
    set: (state, action) => {
      const {key, status} = action.payload;
      state[key] = status;
    },
  },
});

export default loadingSlice.reducer;
