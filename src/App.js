import React from 'react';
import { useState, useEffect } from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import WeatherSearch from "./component/WeatherSearch";


// 1. When the app launches, the weather for the current location is displayed.
// 2. The weather information includes the city, Celsius, Fahrenheit, and weather condition.
// 3. There are 5 buttons (1 for the current location and 4 for other cities).
// 4. Clicking a city button displays the weather for that specific city.
// 5. Clicking the current location button shows the weather for the current location again.
// 6. A loading spinner is displayed while fetching the data.

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const cities = ['seoul', 'sheffield', 'london', 'new york', 'sydney', 'hanoi', 'cape town', 'havana', 'mexico city'];


  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
      getCurrentLocation();
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
      setAPIError("");
    } else {
      getWeatherByCity();
      setAPIError("");
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="white"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container-fluid box-container p-0">
          <div className="row w-100 m-0">
            <div className="col-12 col-md-7 container-left p-4">
              <WeatherBox weather={weather} />
            </div>
            <div className="col-12 col-md-5 container-right p-2">
              <div>
                <WeatherSearch
                  setWeather={setWeather}
                  setLoading={setLoading}
                  setAPIError={setAPIError}
                />
                <WeatherButton
                  cities={cities}
                  handleCityChange={handleCityChange}
                  selectedCity={city}
                />
                {apiError && <div className="text-danger mt-2">&nbsp;&nbsp;&nbsp;{apiError}</div>}
              </div>
              <div className="p-2">
                <p className="weather-details">Weather Details</p>
                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                  <p>Cloudy:</p>
                  <p>{weather?.clouds?.all ?? 0}%</p>
                </div>
                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                  <p>Humidity:</p>
                  <p>{weather?.main?.humidity ?? 0}%</p>
                </div>
                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                  <p>Wind:</p>
                  <p>{weather?.wind?.speed ?? 0} km/h</p>
                </div>
                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                  <p>Rain:</p>
                  <p>{weather?.rain?.['1h'] ?? 0} mm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default App;
