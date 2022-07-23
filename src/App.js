import {useState, useEffect} from 'react';
import {ResourcesOverview} from './components/resources/ResourcesOverview';
import {Building} from './components/buildings/building';
import {gameConfig} from './util/GameConfig';
import {productionMoney, productionIron, productionFuel, productionEnergy} from './util/ResourcenProduction';

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

const userBuildingDatas = [{id: 1, name: 'Windpower Plant', currentLevel: 2}];

export default function App() {
  const [currentMoney, setCurrentMoney] = useState(gameConfig.resourcesTypes[0].startResources);
  const [currentIron, setCurrentIron] = useState(gameConfig.resourcesTypes[1].startResources);
  const [currentFuel, setCurrentFuel] = useState(gameConfig.resourcesTypes[2].startResources);
  const [currentGold] = useState(gameConfig.resourcesTypes[3].startResources);
  const [currentEnergy] = useState(gameConfig.resourcesTypes[4].startResources);
  const [currentBuildingData] = useState(userBuildingDatas);

  useEffect(() => {
    setTimeout(() => {
      setCurrentMoney(currentMoney + productionMoney(0));
      setCurrentIron(currentIron + productionIron(0));
      setCurrentFuel(currentFuel + productionFuel(0));
    }, 1000);
  }, [currentMoney, currentIron, currentFuel]);

  const mainResoures = [
    {id: 1, name: 'Money', value: currentMoney},
    {id: 2, name: 'Iron', value: currentIron},
    {id: 3, name: 'Fuel', value: currentFuel},
    {id: 4, name: 'Gold', value: currentGold},
    {id: 5, name: 'Energy', value: currentEnergy},
  ];

  return (
    <>
      <ResourcesOverview currentResources={mainResoures} />
      <Building
        allBuildings={allBuildings}
        productionEnergy={productionEnergy}
        currentBuildingData={currentBuildingData}
      />
    </>
  );
}
