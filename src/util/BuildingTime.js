import {gameConfig} from './GameConfig';

function timeBuilder(seconds) {
  const weeks = Math.floor(seconds / 3600 / 24 / 7);
  const days = weeks > 1 ? Math.floor((seconds / 3600 / 24) % 7) : Math.floor(seconds / 3600 / 24);
  const hours = days > 1 ? Math.floor((seconds / 3600) % 24) : Math.floor(seconds / 3600);

  const newTimeObject = {
    weeks,
    days,
    hours,
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: Math.floor((seconds % 3600) % 60),
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

  return dateString.trim();
}

function buildingTime(money, iron) {
  const buildTime = Math.floor((money + iron) / gameConfig.speed.buildingSpeed);

  return {buildTimeSeconds: buildTime > 0 ? buildTime : 1, buildTimeDisplay: timeBuilder(buildTime)};
}

export {buildingTime, timeBuilder};
