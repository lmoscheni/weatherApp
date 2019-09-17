import React, { useState, useEffect } from "react";

import Weather from "./Weather";

import * as service from "./service";

export default function CurrentDayWeather(props) {
  const [currentWeather, setCurretWeather] = useState(null);

  const fetchWeather = () => {
    if (!currentWeather) {
      service.getWeather(props.city).then(setCurretWeather);
    }
  };

  useEffect(fetchWeather);

  return (
    <Weather { ...currentWeather } />
  );
}
