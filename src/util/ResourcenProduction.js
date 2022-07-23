import {gameConfig} from './GameConfig';

const productionsInterval = 3600;

function productionResources(name, level) {
  switch (name) {
    case 'Money':
      return (
        Math.floor(
          (30 * level * Math.pow(1.1, level) + gameConfig.resourcesTypes.money.basicProduction) *
            gameConfig.speed.resourcesSpeed
        ) / productionsInterval
      );
    case 'Iron':
      return (
        Math.floor(
          (20 * level * Math.pow(1.1, level) + gameConfig.resourcesTypes.iron.basicProduction) *
            gameConfig.speed.resourcesSpeed
        ) / productionsInterval
      );
    case 'Fuel':
      return Math.floor(10 * level * Math.pow(1.1, level) * gameConfig.speed.resourcesSpeed) / productionsInterval;
    case 'Gold':
      return 0;
    case 'Energy':
      return Math.floor(20 * level * Math.pow(1.1, level));
    default:
      return 0;
  }
}

export {productionResources};
