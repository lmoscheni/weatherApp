import axios from "axios";

const BASE_PATH = process.env.REACT_APP_BACKEND_BASE_PATH;

const headers = { apiKey: process.env.REACT_APP_BACKEND_API_KEY };

export function getCurrentLocation() {
  return axios.get(`${BASE_PATH}/location`, { headers }).then(({ data }) => data);
}

export function getWeather(city) {
  return axios
    .get(`${BASE_PATH}/current${city ? `/${encodeURIComponent(city)}` : ""}`, {
      headers
    })
    .then(({ data }) => data);
}

export function getForecastWeather(city) {
  return axios
    .get(`${BASE_PATH}/forecast${city ? `/${encodeURIComponent(city)}` : ""}`, {
      headers
    })
    .then(({ data }) => data);
}
