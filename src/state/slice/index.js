import {combineReducers} from 'redux';
import resourcesSlice from './resources/resourcesSlice';
import buildingsSlice from './buildings/buildingsSlice';
import loadingSlice from './loading/loadingSlice';
import buildingInBuildSlice from './buildings/buildingInBuildSlice';

const reducers = combineReducers({
  currentUserResources: resourcesSlice,
  currentUserBuildings: buildingsSlice,
  loadingStatus: loadingSlice,
  currentUserBuildingInProgress: buildingInBuildSlice,
});

export default reducers;
