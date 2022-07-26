import {gameConfig} from './GameConfig';

const resourcenProductionsInterval = 3600;

function productionResources(name, level, display = false) {
  function calculateRessoureces(ressource, amount) {

    let resultValue = Math.floor(
      (amount * level * Math.pow(1.1, level) +
        (ressource === 'fuel' ? 0 : gameConfig.resourcesTypes[ressource].basicProduction)) *
        gameConfig.speed.resourcesSpeed
    );
     
    if(!display){
      resultValue /= resourcenProductionsInterval
    }
    
    return resultValue;

  }

  const ressources = {
    Money: calculateRessoureces(name.toLowerCase(), 30),
    Iron: calculateRessoureces(name.toLowerCase(), 20),
    Fuel: calculateRessoureces(name.toLowerCase(), 10),
    Gold: 0,
    Energy: Math.floor(20 * level * Math.pow(1.1, level)),
  };

  return ressources[name];
}

export {productionResources};
