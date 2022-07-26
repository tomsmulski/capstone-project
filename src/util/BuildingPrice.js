function buildingPrice(level, buildingId, resourcesType) {
  if (buildingId === 4) {
    if (resourcesType === 'Money') {
      return 50 * Math.pow(1.3, level);
    }
    if (resourcesType === 'Iron') {
      return 20 * Math.pow(1.3, level);
    }
  }
}

export {buildingPrice};
