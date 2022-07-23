import {gameConfig} from './GameConfig';

const productionsInterval = 3600;

function productionMoney(level) {
  return (
    Math.floor(
      (30 * level * Math.pow(1.05, level) + gameConfig.resourcesTypes[0].basicProduction) * gameConfig.speed.resourcesSpeed
    ) / productionsInterval
  );
}

function productionIron(level) {
  return (
    Math.floor(
      (20 * level * Math.pow(1.05, level) + gameConfig.resourcesTypes[1].basicProduction) * gameConfig.speed.resourcesSpeed
    ) / productionsInterval
  );
}

function productionFuel(level) {
  return Math.floor(10 * level * Math.pow(1.05, level) * gameConfig.speed.resourcesSpeed) / productionsInterval;
}

function productionEnergy(level) {
  return Math.floor(20 * level * Math.pow(1.05, level));
}

export {productionMoney, productionIron, productionFuel, productionEnergy};
