import iconCoin from './icons/item-coins.svg';
import iconFuel from './icons/item-fuel.svg';
import iconGold from './icons/item-gold.svg';
import iconIron from './icons/item-iron.svg';
import iconEnergy from './icons/item-energy.svg';
import imageWindpower from './buildings/windpower-plant.svg';
import imageIronFoundry from './buildings/iron-foundry.svg';
import imageOilRefinery from './buildings/oil-refinery.svg';
import imageMoneyFactory from './buildings/money-factory.svg';
import imageBackgroundMain from './background/background_main.jpg';
import imageBackgroundManual from './background/background_manual.jpg';


const Images = {
  icon: {money: iconCoin, fuel: iconFuel, gold: iconGold, iron: iconIron, energy: iconEnergy},
  image: {energy: imageWindpower, iron: imageIronFoundry, fuel: imageOilRefinery, money: imageMoneyFactory},
  background: {imageBackgroundMain,imageBackgroundManual},
};

export default Images;
