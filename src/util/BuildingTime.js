import {gameConfig} from './GameConfig';

function buildingTime(money, iron) {
  const buildTime = Math.floor((money + iron) / gameConfig.speed.buildingSpeed);

  const weeks = Math.floor(buildTime / 3600 / 24 / 7);
  const days = weeks > 1 ? Math.floor((buildTime / 3600 / 24) % 7) : Math.floor(buildTime / 3600 / 24);
  const hours = days > 1 ? Math.floor((buildTime / 3600) % 24) : Math.floor(buildTime / 3600);

  const newTimeObject = {
    weeks,
    days,
    hours,
    minutes: Math.floor((buildTime % 3600) / 60),
    seconds: Math.floor((buildTime % 3600) % 60),
  };

  let dateString = '';
  for (const key in newTimeObject) {
    if (newTimeObject[key] > 0) {
      dateString = dateString + newTimeObject[key] + key.charAt(0) + ' ';
    } else {
      if (key === 'seconds') {
        dateString = '1s';
      }
    }
  }

  return {buildTimeSeconds: buildTime > 0 ? buildTime : 1, buildTimeDisplay: dateString.trim()};
}

export {buildingTime};
