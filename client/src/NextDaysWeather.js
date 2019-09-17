import React, { useState, useEffect } from "react";

import Weather from "./Weather";

import * as service from "./service";

export default function NextDaysWeather(props) {
  const [currentForecastWeahter, setCurrentForecastWeahter] = useState(null);

  const fetchForecastWeather = () => {
    if (!currentForecastWeahter) {
      service.getForecastWeather(props.city).then(setCurrentForecastWeahter);
    }
  };

  useEffect(fetchForecastWeather);

  console.log(currentForecastWeahter);
  if (currentForecastWeahter) {
    return currentForecastWeahter.list.map(e => <Weather {...e} />);
  } else {
    return [];
  }
}
