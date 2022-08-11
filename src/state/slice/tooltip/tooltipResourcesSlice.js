import {createSlice} from '@reduxjs/toolkit';

export const tooltipResourcesSlice = createSlice({
  name: 'tooltipresources',
  initialState: {
    status: {money: false, iron: false, fuel: false, gold: false, energy: false},
    click: '',
    currentResources: {name: '', value: 0},
  },
  reducers: {
    set: (state, action) => {
      const {status, keyRess, currentResources, click} = action.payload;

      for (const key in state.status) {
        if (key !== keyRess) {
          state.status[key] = false;
        } else {
          state.status[key] = status;
        }
      }
      state.currentResources = currentResources;
      state.click = click;
    },
    clear: (state, action) => {
      const {status} = action.payload;
      state.status = {money: false, iron: false, fuel: false, gold: false, energy: false};
      state.click = '';
      state.currentResources = {name: '', value: 0};
    },
  },
});

export default tooltipResourcesSlice.reducer;
