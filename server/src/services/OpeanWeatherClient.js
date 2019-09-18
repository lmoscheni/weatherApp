const rp = require("request-promise");
const moment = require("moment");

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_CLIENT_API_KEY;
const BASE_PATH = "http://api.openweathermap.org/data/2.5";

class BaseError extends Error {
  constructor(code, message, err) {
    super();
    this.code = code;
    this.message = message;
    this.errorTrace = err;
  }
}

const handleError = res => {
  switch (res.error.cod) {
    case "401":
      return Promise.reject(new BaseError(401, "Sin autenticacion", res.error));
    case "404":
      return Promise.reject(
        new BaseError(
          404,
          "No se encuentra el clima para la ciudad solicitada",
          res.error
        )
      );
    default:
      return Promise.reject(
        new BaseError(parseInt(res.error.cod), res.error.message, res.error)
      );
  }
};

const getWeatherByCity = city => {
  return rp
    .get({
      uri: `${BASE_PATH}/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
      json: true
    })
    .then(e => {
      const date = moment(new Date(e.dt * 1000)).format("DD-MM-YYYY");
      return {
        ...mapToCustomWeather(date, e),
        temp: e.main.temp,
        humidity: e.main.humidity,
        pressure: e.main.pressure
      };
    })
    .catch(handleError);
};

const getWeatherByCoordinates = (lat, lon) => {
  return rp
    .get({
      uri: `${BASE_PATH}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
      json: true
    })
    .then(e => {
      const date = moment(new Date(e.dt * 1000)).format("DD-MM-YYYY");
      return { ...mapToCustomWeather(date, e), temp: e.main.temp, humidity: e.main.humidity, pressure: e.main.pressure };
    })
    .catch(handleError);
};

const getForecastByCoordinates = (lat, lon) => {
  return (
    rp
      .get({
        uri: `${BASE_PATH}/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
        json: true
      })
      .then(mergeDataByDate)
      .catch(handleError)
  );
};

const getForecastByCity = city => {
  return rp
    .get({
      uri: `${BASE_PATH}/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
      json: true
    })
    .then(mergeDataByDate)
    .catch(handleError);
};

const mergeDataByDate = response => {
  const merged = {};

  response.list.forEach(e => {
    const date = moment(new Date(e.dt * 1000)).format("DD-MM-YYYY");
    if (!merged[date]) {
      merged[date] = mapToCustomWeather(date, e);
    } else {
      const current = merged[date];
      const weather = mapToCustomWeather(date, e);
      merged[date] = {
        ...current,
        tempMin: Math.min(current.tempMin, weather.tempMin),
        tempMax: Math.max(current.tempMax, weather.tempMax)
      };
    }
  });

  return {
    ...response,
    list: Object.values(merged).filter(
      e => e.date !== moment().format("DD-MM-YYYY")
    )
  };
};

const mapToCustomWeather = (date, e) => ({
  date,
  tempMin: e.main.temp_min,
  tempMax: e.main.temp_max,
  weatherMain: e.weather[0].main,
  weatherDescription: e.weather[0].description,
  weatherIcon: e.weather[0].icon,
});

module.exports = {
  getWeatherByCity,
  getWeatherByCoordinates,
  getForecastByCity,
  getForecastByCoordinates
};
