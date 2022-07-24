import {gameConfig} from './GameConfig';

function buildingTime(type, money, iron) {
  const buildTime = Math.floor((money + iron) / gameConfig.speed.buildingSpeed);

  if (type === 1) {
    if (buildTime > 0) {
      return buildTime;
    } else {
      return 1;
    }
  } else {
    let weeks = 0;
    let days = 0;
    let hours = Math.floor(buildTime / 3600);
    let minutes = Math.floor((buildTime - hours * 3600) / 60);
    let seconds = Math.floor(buildTime - hours * 3600 - minutes * 60);

    if (hours > 24) {
      days = Math.floor(hours / 24);
      hours = Math.floor(hours % 24);
    }

    if (days > 7) {
      weeks = Math.floor(days / 7);
      days = Math.floor(days % 7);
    }

    if (weeks > 0) {
      return weeks + 'w ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    }

    if (days > 0) {
      return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    }

    if (hours > 0) {
      return hours + 'h ' + minutes + 'm ' + seconds + 's';
    }

    if (minutes > 0) {
      return minutes + 'm ' + seconds + 's';
    }

    if (seconds > 0) {
      return seconds + 's';
    }

    if (seconds === 0) {
      return '1s';
    }
  }
}

export {buildingTime};
