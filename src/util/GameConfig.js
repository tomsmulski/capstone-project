export const gameConfig = Object.freeze({
  speed: {
    resourcesSpeed: 100,
  },
  resourcesTypes: [
    {id: 1, name: 'Money', startResources: 1000, basicProduction: 20},
    {id: 2, name: 'Iron', startResources: 500, basicProduction: 10},
    {id: 3, name: 'Fuel', startResources: 0},
    {id: 4, name: 'Gold', startResources: 0},
    {id: 5, name: 'Energy', startResources: 0},
  ],
});
