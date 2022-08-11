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

export const setTooltipResources = createAction(
  'tooltipresources/set',
  function prepare(status, keyRess, currentResources) {
    return {
      payload: {
        status: status,
        keyRess: keyRess,
        currentResources: currentResources,
      },
    };
  }
);

export const setSelectedBuilding = createAction('selectedBuilding/set', function prepare(buildingId) {
  return {
    payload: {
      buildingId: buildingId,
    },
  };
});

export const setOpenManual = createAction(
  'manual/set',
  function prepare(status, category = 'All', buildId = '62e0e777663a9f95727518dd', backTo = '') {
    return {
      payload: {
        status: status,
        category: category,
        buildId: buildId,
        backTo: backTo,
      },
    };
  }
);

export const setOpenSideNavigation = createAction('sideNavigation/set', function prepare(status,click = false) {
  return {
    payload: {
      status: status,
      click: click,
    },
  };
});
