import {useState} from 'react';
import {ResourcesOverview} from './components/resources/ResourcesOverview';

const GameSpeed = 1000;

const StartResourceMoney = 1000;
const StartResourceIron = 500;
const StartResourceFuel = 0;
const StartResourceGold = 0;
const StartResourceEnergy = 0;

const BasicProductionMoney = 20;
const BasicProductionIron = 10;

function productionMoney(currentLevel) {
  return Math.floor((30 * currentLevel * Math.pow(currentLevel, 1.1) + BasicProductionMoney) * GameSpeed);
}

function productionIron(currentLevel) {
  return Math.floor((20 * currentLevel * Math.pow(currentLevel, 1.1) + BasicProductionIron) * GameSpeed);
}

function productionFuel(currentLevel) {
  return Math.floor(10 * currentLevel * Math.pow(currentLevel, 1.1) * GameSpeed);
}

export default function App() {
  const [currentMoney, setCurrentMoney] = useState(StartResourceMoney);
  const [currentIron, setCurrentIron] = useState(StartResourceIron);
  const [currentFuel, setCurrentFuel] = useState(StartResourceFuel);
  const [currentGold, setCurrentGold] = useState(StartResourceGold);
  const [currentEnergy, setCurrentEnergy] = useState(StartResourceEnergy);

  setTimeout(async () => {
    const productionEachSecondMoney = productionMoney(0) / 3600;
    const productionEachSecondIron = productionIron(0) / 3600;
    const productionEachSecondFuel = productionFuel(0) / 3600;

    setCurrentMoney(currentMoney + productionEachSecondMoney);
    setCurrentIron(currentIron + productionEachSecondIron);
    setCurrentFuel(currentFuel + productionEachSecondFuel);
  }, 1000);

  const MainResoures = [
    {id: 1, name: 'Money', value: currentMoney},
    {id: 2, name: 'Iron', value: currentIron},
    {id: 3, name: 'Fuel', value: currentFuel},
    {id: 4, name: 'Gold', value: currentGold},
    {id: 5, name: 'Energy', value: currentEnergy},
  ];

  return (
    <>
      <ResourcesOverview currentResource={MainResoures} />
    </>
  );
}
