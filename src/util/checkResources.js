
import { buildingPrice } from "./BuildingPrice";


function checkRescource(gameBuildingType,currentUserResources,nextLevel){

    let buildPriceTextColor = [];
    let notEnoughRescourceButtonDisable = false;
  
    gameBuildingType.buildMaterials.forEach(buildMaterial => {
      for (const key in currentUserResources) {
        if (key === buildMaterial.resourceType) {
          const currentResource = currentUserResources[key];
          const neededResource = buildingPrice(nextLevel, gameBuildingType.id, key);
          const enoughRescource = currentResource >= neededResource;
    
          const textColor = enoughRescource ? 'black' : 'red';
          if (!enoughRescource) {
            notEnoughRescourceButtonDisable = true;
          }
          buildPriceTextColor.push(textColor);
        }
      }
    });
  
  
    return {buildPriceTextColor:buildPriceTextColor, notEnoughRescourceButtonDisable:notEnoughRescourceButtonDisable}
  
  }


export {checkRescource}