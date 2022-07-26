function getCurrentDate() {
  let gameDate = new Date();
  const dateYear = gameDate.getFullYear();
  const dateMonth = gameDate.getMonth() + 1 < 10 ? '0' + (gameDate.getMonth() + 1) : gameDate.getMonth() + 1;
  const dateDay = gameDate.getDate() < 10 ? '0' + gameDate.getDate() : gameDate.getDate();
  const dateHour = gameDate.getHours() < 10 ? '0' + gameDate.getHours() : gameDate.getHours();
  const dateMinute = gameDate.getMinutes() < 10 ? '0' + gameDate.getMinutes() : gameDate.getMinutes();

  gameDate = dateDay + '-' + dateMonth + '-' + dateYear + ' ' + dateHour + ':' + dateMinute;

  return gameDate;
}

export {getCurrentDate};
