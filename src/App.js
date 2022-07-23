import {useState, useEffect} from 'react';
import {ResourcesOverview} from './components/resources/ResourcesOverview';
import {Building} from './components/buildings/building';
import {gameConfig} from './util/GameConfig';
import {productionResources} from './util/ResourcenProduction';


const userResources = [
  {id: 1, name: 'Money', value: gameConfig.resourcesTypes.money.startResources},
  {id: 2, name: 'Iron', value: gameConfig.resourcesTypes.iron.startResources},
  {id: 3, name: 'Fuel', value: gameConfig.resourcesTypes.fuel.startResources},
  {id: 4, name: 'Gold', value: gameConfig.resourcesTypes.gold.startResources},
  {id: 5, name: 'Energy', value: gameConfig.resourcesTypes.energy.startResources},
];

const allBuildings = [
  {
    id: 1,
    name: 'Windpower Plant',
    type: 1,
    buildMaterials: [
      {id: 1, name: 'Money'},
      {id: 2, name: 'Iron'},
    ],
    description: 'you need this to have energy',
  },
];

const userBuildingDatas = [{id: 1, name: 'Windpower Plant', currentLevel: 0}];


export default function App() {
  const [currentResources, setCurrentResources] = useState(userResources);
  const [currentBuildingData] = useState(userBuildingDatas);

  useEffect(() => {
    setTimeout(() => {
      
      setCurrentResources(current =>
        current.map(obj => {
          if (obj.name === "Money") {
            return {...obj, value: obj.value + productionResources(obj.name, 0) };
          }
          if (obj.name === "Iron") {
            return {...obj, value: obj.value + productionResources(obj.name, 0) };
          }
          if (obj.name === "Fuel") {
            return {...obj, value: obj.value + productionResources(obj.name, 0) };
          }
  
          return obj;
        }),
      ); 
 
    }, 1000);
  }, [currentResources]);

  return (
    <>
      <ResourcesOverview currentResources={currentResources} />
      <Building
        allBuildings={allBuildings}
        currentBuildingData={currentBuildingData}
      />
    </>
  );
}
