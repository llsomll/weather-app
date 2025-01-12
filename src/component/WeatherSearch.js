import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ComponentStyle.css';


function WeatherSearch({ setWeather, setLoading, setAPIError }) {
  const [city, setCity] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY;

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json();
        if (response.ok) {
          setWeather(data);
          setAPIError("");
        } else {
          setAPIError(data.message);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setAPIError(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="d-flex m-2">
      <input
        type="text"
        className="form-control search-style"
        placeholder="Enter a city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchWeather(e);
          }
        }}
      />
    </div>
  );
}

export default WeatherSearch;
