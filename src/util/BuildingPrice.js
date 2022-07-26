



function buildingPrice(level, buildingId, resourcesType) {
   if (buildingId === 1) {
     if (resourcesType === 'Money') {
       return 40 * Math.pow(1.5, level);
     }
     if (resourcesType === 'Iron') {
       return 10 * Math.pow(1.5, level);
     }
   }
   
   if (buildingId === 2) {
     if (resourcesType === 'Money') {
       return 30 * Math.pow(1.6, level);
     }
     if (resourcesType === 'Iron') {
       return 15 * Math.pow(1.6, level);
     }
   }
   
   if (buildingId === 3) {
     if (resourcesType === 'Money') {
       return 150 * Math.pow(1.5, level);
     }
     if (resourcesType === 'Iron') {
       return 50 * Math.pow(1.5, level);
     }
   }
   
   if (buildingId === 4) {
     if (resourcesType === 'Money') {
       return 50 * Math.pow(1.5, level);
     }
     if (resourcesType === 'Iron') {
       return 20 * Math.pow(1.5, level);
     }
   }


}

export {buildingPrice};
