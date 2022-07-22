function buildingPrice(level, buildingType, resourcesType) {
  if (buildingType === 1) {
    if (resourcesType === 'Money') {
      return 50 * Math.pow(1.1, level);
    }
    if (resourcesType === 'Iron') {
      return 20 * Math.pow(1.1, level);
    }
  }
}

export {buildingPrice};
