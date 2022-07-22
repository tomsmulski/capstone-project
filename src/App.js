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

const userBuildingDatas = [{id: 1, name: 'Windpower Plant', currentLevel: 0}];

export default function App() {
  const [currentMoney, setCurrentMoney] = useState(gameConfig.startResources.money.value);
  const [currentIron, setCurrentIron] = useState(gameConfig.startResources.iron.value);
  const [currentFuel, setCurrentFuel] = useState(gameConfig.startResources.fuel.value);
  const [currentGold] = useState(gameConfig.startResources.gold.value);
  const [currentEnergy] = useState(gameConfig.startResources.energy.value);
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
      <ResourcesOverview currentResource={mainResoures} />
      <Building
        allBuildings={allBuildings}
        productionEnergy={productionEnergy}
        currentBuildingData={currentBuildingData}
      />
    </>
  );
}
