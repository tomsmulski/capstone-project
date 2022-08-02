import {gameBuildingsTypes} from './gamedatas/gameBuildingsTypes';

function buildingPrice(level, buildingId, resourcesType) {
  const buildingType = gameBuildingsTypes.find(buildingType => buildingType.id === buildingId);

  let price = 0;

  buildingType.buildMaterials.forEach(material => {
    if (material.resourceType === resourcesType) {
      price = material.calculation.value * Math.pow(material.calculation.pow, level);
    }
  });

  return price;
}

export {buildingPrice};
