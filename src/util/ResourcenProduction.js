import {gameConfig} from './GameConfig';

const productionsInterval = 3600;

function productionMoney(level) {
  return (
    Math.floor(
      (30 * level * Math.pow(1.1, level) + gameConfig.basicProduction.money.value) * gameConfig.speed.gameSpeed
    ) / productionsInterval
  );
}

function productionIron(level) {
  return (
    Math.floor(
      (20 * level * Math.pow(1.1, level) + gameConfig.basicProduction.iron.value) * gameConfig.speed.gameSpeed
    ) / productionsInterval
  );
}

function productionFuel(level) {
  return Math.floor(10 * level * Math.pow(1.1, level) * gameConfig.speed.gameSpeed) / productionsInterval;
}

function productionEnergy(level) {
  return Math.floor(20 * level * Math.pow(1.1, level));
}

export {productionMoney, productionIron, productionFuel, productionEnergy};
