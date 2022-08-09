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

  function calculateTotalEnergy(currentUserBuildings) {
    let currentEnergyUsed = 0;
    let currentEnergyProduction = 0;

    const currentTotalEnergy = calculateEachBuildingEnergy(currentUserBuildings);

    currentTotalEnergy.forEach(energy => {
      if (energy < 0) {
        currentEnergyUsed += energy;
      } else {
        currentEnergyProduction += energy;
      }
    });

    return currentEnergyUsed + currentEnergyProduction;
  }

  const ressources = {
    money: calculateResoureces(resourcesType, addLevel, resourcenProductionsIntervalSeconds),
    iron: calculateResoureces(resourcesType, addLevel, resourcenProductionsIntervalSeconds),
    fuel: calculateResoureces(resourcesType, addLevel, resourcenProductionsIntervalSeconds),
    gold: 0,
    energy: calculateTotalEnergy(currentUserBuildings),
  };
  return ressources[resourcesType];
}

function displayLevelUpResourcesProduction(
  resourcesType,
  currentUserBuildingLevel,
  buildId,
  addLevel = 1,
  total = false
) {
  let resultValue = 0;
  let resultValueUpper = 0;

  const gameBuildingType = gameBuildingsTypes.find(buildingType => buildingType.id === buildId);

  const productionMaterials = gameBuildingType.productionMaterials.find(
    material => material.resourceType === resourcesType
  );

  resultValue = Math.floor(
    productionMaterials.calculation.value *
      currentUserBuildingLevel *
      Math.pow(productionMaterials.calculation.pow, currentUserBuildingLevel) *
      (resourcesType === 'energy' ? 1 : gameConfig.speed.resourcesSpeed)
  );

  resultValueUpper = Math.floor(
    productionMaterials.calculation.value *
      (currentUserBuildingLevel + addLevel) *
      Math.pow(productionMaterials.calculation.pow, currentUserBuildingLevel + addLevel) *
      (resourcesType === 'energy' ? 1 : gameConfig.speed.resourcesSpeed)
  );

  if (total) {
    return (resultValue = resultValueUpper);
  } else {
    return (resultValue = resultValueUpper - resultValue);
  }
}

function calculateEachBuildingEnergy(currentUserBuildings) {
  let resultValue = [];

  gameBuildingsTypes.forEach(buildingType => {
    const currentUserBuild = currentUserBuildings.find(
      currentUserBuildings => currentUserBuildings.buildingId === buildingType.id
    );
    const productionMaterials = buildingType.productionMaterials.find(material => material.resourceType === 'energy');

    if (productionMaterials !== undefined) {
      resultValue.push(
        Math.floor(
          productionMaterials.calculation.value *
            currentUserBuild.level *
            Math.pow(productionMaterials.calculation.pow, currentUserBuild.level) +
            gameConfig.resourcesTypes['energy'].basicProduction
        )
      );
    }
  });

  return resultValue;
}

export {productionResources, displayLevelUpResourcesProduction, calculateEachBuildingEnergy};
