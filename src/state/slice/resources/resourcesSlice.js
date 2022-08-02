import { createSlice } from "@reduxjs/toolkit";

export const resourcesSlice = createSlice({

    name: "resources",
    initialState: {money:0,iron:0,fuel:0,gold:0,energy:0},
    reducers: {
      add: (state, action) => {
        const {key,amount} = action.payload;
        state[key] = state[key] + amount
      },
      remove: (state, action) => {
        const {key,amount} = action.payload;
        state[key] = state[key] - amount
      },
      set: (state, action) => {
        const {key,amount} = action.payload;
        state[key] = amount
      }
    }


})



export default resourcesSlice.reducer;
 