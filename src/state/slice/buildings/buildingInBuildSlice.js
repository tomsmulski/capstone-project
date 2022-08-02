import {createSlice} from '@reduxjs/toolkit';

export const buildingInBuildSlice = createSlice({
  name: 'buildingsInBuild',
  initialState: [],
  reducers: {
    add: (state, action) => {
      const {cityId, buildingId, startTime, endTime, diffTime, toLevel} = action.payload;
      state.push({
        cityId: cityId,
        buildingId: buildingId,
        startTime: startTime,
        endTime: endTime,
        diffTime: diffTime,
        toLevel: toLevel,
      });
    },
    update: (state, action) => {
      const {cityId, buildingId, diffTime} = action.payload;
      state[0].diffTime = diffTime;
    },
    remove: (state, action) => {
      const {cityId, buildingId} = action.payload;

      state.pop();
    },
  },
});

export default buildingInBuildSlice.reducer;
