const express = require("express");
const v1Router = express();

const authBarear = require("./authBarear");
const log = require("./logger");

const geoClient = require("./services/IpGeolocationClient");
const weatherClient = require("./services/OpeanWeatherClient");

/**
 * Request Handlers
 */

function handleCurrentLocationRequest(req, res, next) {
  log.info("Handling current location request");
  geoClient
    .currentLocation()
    .then(_ => res.send(_))
    .catch(_ => next(_));
}

async function handleWeatherForCurrentLocationRequest(req, res, next) {
  log.info("Handling weather for current location request");
  try {
    const { latitude, longitude } = await geoClient.currentLocation();
    const weather = await weatherClient.getWeatherByCoordinates(latitude, longitude);
    res.send(weather);
  } catch (e) {
    next(e);
  }
}

function handleWeatherByCityRequest(req, res, next) {
  log.info("Handling weather by city request");
  weatherClient
    .getWeatherByCity(req.params.city)
    .then(_ => res.send(_))
    .catch(_ => next(_));
}

async function handleForecastRequest(req, res, next) {
  log.info("Handling forecast request");
  try {
    const { latitude, longitude } = await geoClient.currentLocation();
    const weather = await weatherClient.getForecastByCoordinates(
      latitude,
      longitude
    );
    res.send(weather);
  } catch (e) {
    next(e);
  }
}

function handleForecastByCityRequest(req, res, next) {
  weatherClient
    .getForecastByCity(req.params.city)
    .then(_ => res.send(_))
    .catch(_ => next(_));
}

/**
 * Adding auth barear to app endpoints
 */
v1Router.use(authBarear);

/**
 * Routes
 */
v1Router.get("/location", handleCurrentLocationRequest);

v1Router.get("/current", handleWeatherForCurrentLocationRequest);

v1Router.get("/current/:city", handleWeatherByCityRequest);

v1Router.get("/forecast", handleForecastRequest);

v1Router.get("/forecast/:city", handleForecastByCityRequest);

module.exports = v1Router;
