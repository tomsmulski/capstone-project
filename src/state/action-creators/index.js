import {createAction} from '@reduxjs/toolkit';

export const addResources = createAction('resources/add', function prepare(resourcesType, amount) {
  return {
    payload: {
      key: resourcesType,
      amount: amount,
    },
  };
});

export const setResources = createAction('resources/set', function prepare(resourcesType, amount) {
  return {
    payload: {
      key: resourcesType,
      amount: amount,
    },
  };
});

export const removeResources = createAction('resources/remove', function prepare(resourcesType, amount) {
  return {
    payload: {
      key: resourcesType,
      amount: amount,
    },
  };
});

export const addBuildings = createAction('buildings/add', function prepare(buildingId) {
  return {
    payload: {
      buildingId: buildingId,
    },
  };
});

export const setBuildings = createAction('buildings/set', function prepare(buildingId, level) {
  return {
    payload: {
      buildingId: buildingId,
      level: level,
    },
  };
});

export const setLoading = createAction('loading/set', function prepare(key, status) {
  return {
    payload: {
      key: key,
      status: status,
    },
  };
});

export const addBuildingToBuild = createAction(
  'buildingsInBuild/add',
  function prepare(cityId, buildingId, startTime, endTime, diffTime, toLevel) {
    return {
      payload: {
        cityId: cityId,
        buildingId: buildingId,
        startTime: startTime,
        endTime: endTime,
        diffTime: diffTime,
        toLevel: toLevel,
      },
    };
  }
);

export const updateBuildingToBuild = createAction(
  'buildingsInBuild/update',
  function prepare(cityId, buildingId, diffTime) {
    return {
      payload: {
        cityId: cityId,
        buildingId: buildingId,
        diffTime: diffTime,
      },
    };
  }
);

export const removeBuildingToBuild = createAction('buildingsInBuild/remove', function prepare(cityId, buildingId) {
  return {
    payload: {
      cityId: cityId,
      buildingId: buildingId,
    },
  };
});

export const setTooltipResources = createAction('tooltipresources/set', function prepare(status, keyRess, currentRess) {
  return {
    payload: {
      status: status,
      keyRess: keyRess,
      currentRess: currentRess,
    },
  };
});
