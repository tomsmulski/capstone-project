import {gameConfig} from './GameConfig';

function timeBuilder(seconds) {
  var w = Math.floor(seconds / 604800),
    d = Math.floor(seconds / 86400) % 7,
    h = Math.floor(seconds / 3600) % 24,
    m = Math.floor(seconds / 60) % 60,
    s = seconds % 60;
  return (
    (w > 0 ? w + 'w ' : '') +
    (d > 0 ? d + 'd ' : '') +
    (h > 0 ? h + 'h ' : '') +
    (m > 0 ? m + 'm ' : '') +
    (seconds > 60 ? s + 's ' : s + 's')
  );
}

function buildingTime(money, iron) {
  const buildTime = Math.floor((money + iron) / gameConfig.speed.buildingSpeed);

  return {buildTimeSeconds: buildTime > 0 ? buildTime : 1, buildTimeDisplay: timeBuilder(buildTime)};
}

export {buildingTime, timeBuilder};
