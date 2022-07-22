import {useState, useEffect} from 'react';
import {ResourcesOverview} from './components/resources/ResourcesOverview';

const gameSpeed = 1000;

const startResourceMoney = 1000;
const startResourceIron = 500;
const startResourceFuel = 0;
const startResourceGold = 0;
const startResourceEnergy = 0;

const basicProductionMoney = 20;
const basicProductionIron = 10;

function productionMoney(currentLevel) {
  return Math.floor((30 * currentLevel * Math.pow(currentLevel, 1.1) + basicProductionMoney) * gameSpeed);
}

function productionIron(currentLevel) {
  return Math.floor((20 * currentLevel * Math.pow(currentLevel, 1.1) + basicProductionIron) * gameSpeed);
}

function productionFuel(currentLevel) {
  return Math.floor(10 * currentLevel * Math.pow(currentLevel, 1.1) * gameSpeed);
}

export default function App() {
  
  const [currentMoney, setCurrentMoney] = useState(startResourceMoney);
  const [currentIron, setCurrentIron] = useState(startResourceIron);
  const [currentFuel, setCurrentFuel] = useState(startResourceFuel);
  const [currentGold] = useState(startResourceGold);
  const [currentEnergy] = useState(startResourceEnergy);

  useEffect(()=>{
    setTimeout(() => {
      const productionEachSecondMoney = productionMoney(0) / 3600;
      const productionEachSecondIron = productionIron(0) / 3600;
      const productionEachSecondFuel = productionFuel(0) / 3600;
  
      setCurrentMoney(currentMoney + productionEachSecondMoney);
      setCurrentIron(currentIron + productionEachSecondIron);
      setCurrentFuel(currentFuel + productionEachSecondFuel);
    }, 1000);
  },[currentMoney,currentIron,currentFuel])




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
    </>
  );
}
