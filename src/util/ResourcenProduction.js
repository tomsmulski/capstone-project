import {gameConfig} from './GameConfig';

const resourcenProductionsInterval = 3600;

function productionResources(name, level, eneryType = null, display = false, displayType = null) {
  function calculateRessoureces(ressource, amount) {
    let resultValue = 0;

    if (ressource === 'energy') {
      if (eneryType === 'add') {
        resultValue = Math.ceil(20 * level * Math.pow(1.1, level));
      } else if (eneryType === 'remove') {
        resultValue = -Math.ceil(10 * level * Math.pow(1.1, level));
      }
    } else {
      
      resultValue = Math.floor(
        (amount * level * Math.pow(1.1, level) +
          (ressource === 'fuel' ? 0 : gameConfig.resourcesTypes[ressource].basicProduction)) *
          gameConfig.speed.resourcesSpeed
      );

      if (!display) {
        resultValue /= resourcenProductionsInterval;
      }

      if (displayType === 'difference') {
        let resultValuebelow = Math.floor(
          (amount * (level - 1) * Math.pow(1.1, level - 1) +
            (ressource === 'fuel' ? 0 : gameConfig.resourcesTypes[ressource].basicProduction)) *
            gameConfig.speed.resourcesSpeed
        );
        resultValue = resultValue - resultValuebelow;
      }
    }

    return resultValue;
  }

  const ressources = {
    Money: calculateRessoureces(name.toLowerCase(), 30),
    Iron: calculateRessoureces(name.toLowerCase(), 20),
    Fuel: calculateRessoureces(name.toLowerCase(), 10),
    Gold: 0,
    Energy: calculateRessoureces(name.toLowerCase(), 20),
  };

  return ressources[name];
}

export {productionResources};
