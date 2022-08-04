import {createSlice} from '@reduxjs/toolkit';

export const tooltipResourcesSlice = createSlice({
  name: 'tooltipresources',
  initialState: {
    status: {money: false, iron: false, fuel: false, gold: false, energy: false},
    currentRess: {name: '', value: 0},
  },
  reducers: {
    set: (state, action) => {
      const {status, keyRess, currentRess} = action.payload;

      for (const key in state.status) {
        if (key !== keyRess) {
          state.status[key] = false;
        } else {
          state.status[key] = status;
        }
      }
      state.currentRess = currentRess;
    },
  },
});

export default tooltipResourcesSlice.reducer;
