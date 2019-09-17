const rp = require("request-promise");

const IP_GEOLOCATION_API_KEY = process.env.IP_GEO_LOCATION_API_KEY;
const BASE_PATH = "https://api.ipgeolocation.io";

function CanNotGetCurrentLocation (err) {
  this.error = err;
  this.message = "No se pudo obtener la localizacion actual";
}

const currentLocation = () =>
  rp
    .get({
      uri: `${BASE_PATH}/ipgeo?apiKey=${IP_GEOLOCATION_API_KEY}`,
      json: true
    })
    .catch(_ => Promise.reject(new CanNotGetCurrentLocation(_)));

module.exports = {
  currentLocation
};
