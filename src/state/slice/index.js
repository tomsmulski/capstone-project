import {combineReducers} from 'redux';
import resourcesSlice from './resources/resourcesSlice';
import buildingsSlice from './buildings/buildingsSlice';
import loadingSlice from './loading/loadingSlice';
import buildingInBuildSlice from './buildings/buildingInBuildSlice';
import tooltipResourcesSlice from './tooltip/tooltipResourcesSlice';
import selectedBuildingSlice from './buildings/selectedBuildingSlice';

const reducers = combineReducers({
  currentUserResources: resourcesSlice,
  currentUserBuildings: buildingsSlice,
  loadingStatus: loadingSlice,
  currentUserBuildingInProgress: buildingInBuildSlice,
  tooltipResourcesView: tooltipResourcesSlice,
  selectedBuilding: selectedBuildingSlice,
});

export default reducers;
