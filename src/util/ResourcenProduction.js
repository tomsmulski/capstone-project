import {gameConfig} from './GameConfig';
import {gameBuildingsTypes} from './gamedatas/gameBuildingsTypes';

function productionResources(
  resourcesType,
  currentUserBuildings,
  addLevel = 0,
  resourcenProductionsIntervalSeconds = 1
) {
  function calculateResoureces(resourcesType, addLevel = 0, resourcenProductionsIntervalSeconds = 1) {
    let resultValue = 0;

    const currentUserBuild = currentUserBuildings.find(
      currentUserBuildings => currentUserBuildings.resourcesType === resourcesType
    );

    const gameBuildingType = gameBuildingsTypes.find(buildingType => buildingType.id === currentUserBuild.buildingId);

    const productionMaterials = gameBuildingType.productionMaterials.find(
      material => material.resourceType === resourcesType
    );

    resultValue = Math.floor(
      (productionMaterials.calculation.value *
        (currentUserBuild.level + addLevel) *
        Math.pow(productionMaterials.calculation.pow, currentUserBuild.level + addLevel) +
        gameConfig.resourcesTypes[resourcesType].basicProduction) *
        gameConfig.speed.resourcesSpeed
    );

    resultValue /= resourcenProductionsIntervalSeconds;

    return resultValue;
  }

  function calculateTotalEnergy(resourcesType) {
    let resultValue = 0;

    gameBuildingsTypes.forEach(buildingType => {
      const currentUserBuild = currentUserBuildings.find(
        currentUserBuildings => currentUserBuildings.buildingId === buildingType.id
      );
      const productionMaterials = buildingType.productionMaterials.find(
        material => material.resourceType === resourcesType
      );

      if (productionMaterials !== undefined) {
        resultValue += Math.floor(
          productionMaterials.calculation.value *
            currentUserBuild.level *
            Math.pow(productionMaterials.calculation.pow, currentUserBuild.level) +
            gameConfig.resourcesTypes[resourcesType].basicProduction
        );
      }
    });

    return resultValue;
  }



  const ressources = {
    money: calculateResoureces(resourcesType, addLevel, resourcenProductionsIntervalSeconds),
    iron: calculateResoureces(resourcesType, addLevel, resourcenProductionsIntervalSeconds),
    fuel: calculateResoureces(resourcesType, addLevel, resourcenProductionsIntervalSeconds),
    gold: 0,
    energy: calculateTotalEnergy(resourcesType),
  };
  return ressources[resourcesType];
}

function displayLevelUpResourcesProduction(resourcesType, currentUserBuildings, buildId, addLevel = 1) {
  let resultValue = 0;
  let resultValue2 = 0;

  const currentUserBuild = currentUserBuildings.find(
    currentUserBuildings => currentUserBuildings.buildingId === buildId
  );

  const gameBuildingType = gameBuildingsTypes.find(buildingType => buildingType.id === currentUserBuild.buildingId);

  const productionMaterials = gameBuildingType.productionMaterials.find(
    material => material.resourceType === resourcesType
  );

  resultValue = Math.floor(
    (productionMaterials.calculation.value *
      currentUserBuild.level *
      Math.pow(productionMaterials.calculation.pow, currentUserBuild.level) +
      gameConfig.resourcesTypes[resourcesType].basicProduction) *
      (resourcesType === 'energy' ? 1 : gameConfig.speed.resourcesSpeed)
  );

  resultValue2 = Math.floor(
    (productionMaterials.calculation.value *
      (currentUserBuild.level + addLevel) *
      Math.pow(productionMaterials.calculation.pow, currentUserBuild.level + addLevel) +
      gameConfig.resourcesTypes[resourcesType].basicProduction) *
      (resourcesType === 'energy' ? 1 : gameConfig.speed.resourcesSpeed)
  );

  resultValue = resultValue2 - resultValue;

  return resultValue;
}

function calculateEachBuildingEnergy(currentUserBuildings) {
  let resultValue = [];

  gameBuildingsTypes.forEach(buildingType => {
    const currentUserBuild = currentUserBuildings.find(
      currentUserBuildings => currentUserBuildings.buildingId === buildingType.id
    );
    const productionMaterials = buildingType.productionMaterials.find(
      material => material.resourceType === 'energy'
    );

    if (productionMaterials !== undefined) {
      resultValue.push(Math.floor(
        productionMaterials.calculation.value *
          currentUserBuild.level *
          Math.pow(productionMaterials.calculation.pow, currentUserBuild.level) +
          gameConfig.resourcesTypes['energy'].basicProduction
      ));
    }
  });

  return resultValue;
}

export {productionResources, displayLevelUpResourcesProduction,calculateEachBuildingEnergy};
