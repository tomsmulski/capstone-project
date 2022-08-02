import {createSlice} from '@reduxjs/toolkit';

export const buildingsSlice = createSlice({
  name: 'buildings',
  initialState: [
    {buildingId: "62e0e777663a9f95727518dd", level: 0, resourcesType: 'money'},
    {buildingId: "62e7dbadcefed5e153f6bb86", level: 0, resourcesType: 'iron'},
    {buildingId: "62e7dbb2cefed5e153f6bb87", level: 0, resourcesType: 'fuel'},
    {buildingId: "62e7dbb7cefed5e153f6bb88", level: 0, resourcesType: 'energy'}
  ],
  reducers: {
    add: (state, action) => {
      const {buildingId} = action.payload;

      state.forEach((stat)=>{
        if(stat.buildingId === buildingId){
          stat.level = stat.level + 1;
        } 
      })     
    },
    set: (state, action) => {
      const {buildingId,level} = action.payload;

      state.forEach((stat)=>{
        if(stat.buildingId === buildingId){
          stat.level = level;
        } 
      })
 
    },
  },
});

export default buildingsSlice.reducer;
