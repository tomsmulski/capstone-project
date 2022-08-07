import {createSlice} from '@reduxjs/toolkit';

export const selectedBuildingSlice = createSlice({
  name: 'selectedBuilding',
  initialState: {buildingId: '62e0e777663a9f95727518dd'},
  reducers: {
    set: (state, action) => {
      state.buildingId = action.payload.buildingId;
    },
  },
});

export default selectedBuildingSlice.reducer;
