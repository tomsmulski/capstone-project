export const gameConfig = Object.freeze({
  speed: {
    buildingSpeed: 10,
    resourcesSpeed: 100,
  },
  resourcesTypes: {
    money: {id: 1, name: 'Money', startResources: 500, basicProduction: 20},
    iron: {id: 2, name: 'Iron', startResources: 100, basicProduction: 10},
    fuel: {id: 3, name: 'Fuel', startResources: 0},
    gold: {id: 4, name: 'Gold', startResources: 0},
    energy: {id: 5, name: 'Energy', startResources: 0},
  },
});


