import React, { useState, useEffect } from "react";

import CurrentDayWeather from './CurrentDayWeather';
import NextDaysWeather from './NextDaysWeather';

import * as service from "./service";

function CityIndicator(props) {
  return (
    <div style={{width: "100%"}}>
      {props.city}
    </div>
  );
}

export default function WeatherByCity(props) {
  const [currentLocation, setCurrentLocation] = useState(null);

  const fetchCurrentLocation = () => {
    if (!props.city && !currentLocation) {
      service.getCurrentLocation().then(setCurrentLocation);
    }
  };

  useEffect(fetchCurrentLocation);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "1em",
        borderBottom: ".5px solid #e8e8e8",
        marginBottom: "1em"
      }}
    >
      <CityIndicator
        city={props.city || (currentLocation && currentLocation.city)}
      />
      <CurrentDayWeather city={props.city} />
      <NextDaysWeather city={props.city} />
    </div>
  );
}
