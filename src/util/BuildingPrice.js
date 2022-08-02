



function buildingPrice(level, buildingId, resourcesType) {

   if (buildingId === "62e0e777663a9f95727518dd") {
     if (resourcesType === 'money') {
       return 40 * Math.pow(1.5, level);
     }
     if (resourcesType === 'iron') {
       return 10 * Math.pow(1.5, level);
     }
   }
   
   if (buildingId === "62e7dbadcefed5e153f6bb86") {
     if (resourcesType === 'money') {
       return 30 * Math.pow(1.6, level);
     }
     if (resourcesType === 'iron') {
       return 15 * Math.pow(1.6, level);
     }
   }
   
   if (buildingId === "62e7dbb2cefed5e153f6bb87") {
     if (resourcesType === 'money') {
       return 150 * Math.pow(1.5, level);
     }
     if (resourcesType === 'iron') {
       return 50 * Math.pow(1.5, level);
     }
   }
   
   if (buildingId === "62e7dbb7cefed5e153f6bb88") {
     if (resourcesType === 'money') {
       return 50 * Math.pow(1.5, level);
     }
     if (resourcesType === 'iron') {
       return 20 * Math.pow(1.5, level);
     }
   }


}

export {buildingPrice};
