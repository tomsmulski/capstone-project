import {createSlice} from '@reduxjs/toolkit';

export const tooltipResourcesSlice = createSlice({
  name: 'tooltipresources',
  initialState: {
    status: {money: false, iron: false, fuel: false, gold: false, energy: false},
    currentResources: {name: '', value: 0},
  },
  reducers: {
    set: (state, action) => {
      const {status, keyRess, currentResources} = action.payload;

      for (const key in state.status) {
        if (key !== keyRess) {
          state.status[key] = false;
        } else {
          state.status[key] = status;
        }
      }
      state.currentResources = currentResources;
    }
  },
});

export default tooltipResourcesSlice.reducer;
