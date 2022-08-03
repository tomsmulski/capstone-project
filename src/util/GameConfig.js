export const gameConfig = Object.freeze({
  speed: {
    buildingSpeed: 20,
    resourcesSpeed: 20,
  },
  resourcesTypes: {
    money: {id: 1, name: 'money', startResources: 500, basicProduction: 20},
    iron: {id: 2, name: 'iron', startResources: 100, basicProduction: 10},
    fuel: {id: 3, name: 'fuel', startResources: 0, basicProduction: 0},
    gold: {id: 4, name: 'gold', startResources: 0},
    energy: {id: 5, name: 'energy', startResources: 0},
  },
});


