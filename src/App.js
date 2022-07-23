import {useState, useEffect} from 'react';
import {ResourcesOverview} from './components/resources/ResourcesOverview';
import {Building} from './components/buildings/building';
import {gameConfig} from './util/GameConfig';
import {productionResources} from './util/ResourcenProduction';
import {buildingPrice} from './util/BuildingPrice';

const userResources = [
  {id: 1, name: 'Money', value: gameConfig.resourcesTypes.money.startResources},
  {id: 2, name: 'Iron', value: gameConfig.resourcesTypes.iron.startResources},
  {id: 3, name: 'Fuel', value: gameConfig.resourcesTypes.fuel.startResources},
  {id: 4, name: 'Gold', value: gameConfig.resourcesTypes.gold.startResources},
  {id: 5, name: 'Energy', value: gameConfig.resourcesTypes.energy.startResources},
];

const allBuildings = [
  {
    id: 4,
    name: 'Windpower Plant',
    type: 1,
    buildMaterials: [
      {id: 1, name: 'Money'},
      {id: 2, name: 'Iron'},
    ],
    description:
      'A Windpower plant converts the kinetic energy of the wind into electrical energy and feeds it into an electricity grid. Colloquially, the terms wind power plant or simply wind turbine are also used.',
  },
];

const userBuildings = [{id: 4, name: 'Windpower Plant', level: 0}];

export default function App() {
  const [currentResources, setCurrentResources] = useState(userResources);
  const [currentBuildings, setCurrentBuildings] = useState(userBuildings);

  function addBuildingLevel(id) {
    let currentBuildLevel = 0;

    setCurrentBuildings(currentBuilding =>
      currentBuilding.map(objBuilding => {
        if (objBuilding.id === Number(id)) {
          currentBuildLevel = objBuilding.level + 1;
          return {...objBuilding, level: currentBuildLevel};
        }
        return objBuilding;
      })
    );

    allBuildings.map(building => {
      if (building.id === Number(id)) {
        building.buildMaterials.map(material => {
          //
          setCurrentResources(current =>
            current.map(obj => {
              if (obj.id === material.id) {
                return {...obj, value: obj.value - buildingPrice(currentBuildLevel, building.type, material.name)};
              }

              if (obj.id === 5) {
                return {...obj, value: productionResources(obj.name, currentBuildLevel)};
              }

              return obj;
            })
          );
          return material;
        });
      }
      return building;
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setCurrentResources(current =>
        current.map(obj => {
          return {...obj, value: obj.value + productionResources(obj.name, 0)};
        })
      );
    }, 2000);
  }, [currentResources]);

  return (
    <>
      <ResourcesOverview currentResources={currentResources} />
      <Building allBuildings={allBuildings} currentBuildings={currentBuildings} addBuildingLevel={addBuildingLevel} />
    </>
  );
}
