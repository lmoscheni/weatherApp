const request = require("supertest");
const nock = require("nock");
const assert = require("assert");

const app = require("../src/index");

function mockIpGeoLocationResponse() {
  nock("https://api.ipgeolocation.io")
    .get("/ipgeo?apiKey=ESTA_EN_EL_EMAIL")
    .reply(200, require("./mocks/location.json"));
}

function mockCurrentLocationWeatherResponse() {
  nock("http://api.openweathermap.org/data/2.5")
    .get(
      "/weather?lat=-34.61190&lon=-58.36970&appid=ESTA_EN_EL_EMAIL&units=metric"
    )
    .reply(200, require("./mocks/current.json"));
}

function mockCurrentWeatherForCityResponse() {
  nock("http://api.openweathermap.org/data/2.5")
    .get("/weather?q=raftel&appid=ESTA_EN_EL_EMAIL&units=metric")
    .reply(200, require("./mocks/current.json"));
}

function mockCurrentLocationForecastWeatherResponse() {
  nock("http://api.openweathermap.org/data/2.5")
    .get(
      "/forecast?lat=-34.61190&lon=-58.36970&appid=ESTA_EN_EL_EMAIL&units=metric"
    )
    .reply(200, require("./mocks/forecast.json"));
}

function mockForecastByCityResponse() {
  nock("http://api.openweathermap.org/data/2.5")
    .get("/forecast?q=raftel&appid=ESTA_EN_EL_EMAIL&units=metric")
    .reply(200, require("./mocks/forecast.json"));
}

after(() => nock.cleanAll());

describe("Tests GETs", () => {
  it("GET /v1/location", done => {
    // mokcs API's
    mockIpGeoLocationResponse();

    request(app)
      .get("/v1/location")
      .set("apiKey", "rNtLNE5eh7NXCNGTQ55z")
      .expect(200)
      .then(({ body }) => {
        assert.equal(body.ip, "200.5.120.85");
        assert.equal(body.city, "Montserrat");

        done();
      });
  });

  it("GET /v1/current", done => {
    // mokcs API's
    mockIpGeoLocationResponse();
    mockCurrentLocationWeatherResponse();

    request(app)
      .get("/v1/current")
      .set("apiKey", "rNtLNE5eh7NXCNGTQ55z")
      .expect(200)
      .then(({ body }) => {
        assert.deepEqual(body, {
          date: "30-01-2017",
          tempMin: 285.514,
          tempMax: 285.514,
          weatherMain: "Clear",
          weatherDescription: "clear sky",
          weatherIcon: "01n",
          temp: 285.514,
          humidity: 100,
          pressure: 1013.75
        });

        done();
      });
  });

  it("GET /v1/current/raftel", done => {
    // mokcs API's
    mockCurrentWeatherForCityResponse();

    request(app)
      .get("/v1/current/raftel")
      .set("apiKey", "rNtLNE5eh7NXCNGTQ55z")
      .expect(200)
      .then(({ body }) => {
        assert.deepEqual(body, {
          date: "30-01-2017",
          tempMin: 285.514,
          tempMax: 285.514,
          weatherMain: "Clear",
          weatherDescription: "clear sky",
          weatherIcon: "01n",
          temp: 285.514,
          humidity: 100,
          pressure: 1013.75
        });

        done();
      });
  });

  it("GET /v1/forecast", done => {
    // mokcs API's
    mockIpGeoLocationResponse();
    mockCurrentLocationForecastWeatherResponse();

    request(app)
      .get("/v1/forecast")
      .set("apiKey", "rNtLNE5eh7NXCNGTQ55z")
      .expect(200)
      .then(({ body }) => {
        assert.equal(body.list.length, 6);

        body.list.forEach(e => {
          assert.deepEqual(Object.keys(e), [
            "date",
            "tempMin",
            "tempMax",
            "weatherMain",
            "weatherDescription",
            "weatherIcon"
          ]);
        });

        done();
      });
  });

  it("GET /v1/forecast", done => {
    // mokcs API's
    mockForecastByCityResponse();

    request(app)
      .get("/v1/forecast/raftel")
      .set("apiKey", "rNtLNE5eh7NXCNGTQ55z")
      .expect(200)
      .then(({ body }) => {
        assert.equal(body.list.length, 6);

        body.list.forEach(e => {
          assert.deepEqual(Object.keys(e), [
            "date",
            "tempMin",
            "tempMax",
            "weatherMain",
            "weatherDescription",
            "weatherIcon"
          ]);
        });

        done();
      });
  });
});
