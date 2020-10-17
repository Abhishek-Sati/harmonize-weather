export default Object.freeze({
  home: {
    base: "https://demo5481669.mockable.io/stations/",
  },
  // I have used heroku domain here to avoid cors issue, which i was getting in details API .
  detail: {
    base: "https://www.attendancebot.com/kik/data/observations/metar/stations",
    heroku:
      "https://cors-anywhere.herokuapp.com/https://www.attendancebot.com/kik/data/observations/metar/stations",
  },
});
