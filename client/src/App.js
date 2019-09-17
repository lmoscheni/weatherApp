import React, {useState} from "react";
import WeatherByCity from "./WeatherByCity";
import { Alert, Input, Button } from "antd";

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const addCity = () => {
    if (cities.length < 4 && selectedCity) {
      setCities([...cities, selectedCity]);
      setSelectedCity(null);
      setErrorMessage(null);
    } else {
      setErrorMessage("No puede agregar ninguna ciudad mas. Antes debe eliminar alguna");
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <WeatherByCity />
      {cities.map(city => (
        <WeatherByCity city={city} />
      ))}
      {!errorMessage ? null : (
        <Alert
          style={{ width: "100%" }}
          message={errorMessage}
          type="error"
          closable
          onClose={() => setErrorMessage(null)}
        />
      )}
      <Input
        placeholder="Enter a city..."
        style={{ width: "100%", margin: "1em" }}
        value={selectedCity}
        onChange={e => setSelectedCity(e.target.value)}
      />
      <Button
        style={{ width: "100%", margin: "1em" }}
        type="dashed"
        onClick={addCity}
      >
        Add City
      </Button>
    </div>
  );
}

export default App;
