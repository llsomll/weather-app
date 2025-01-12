import React from 'react';
import CurrentDateTime from './CurrentDateTime';
import './ComponentStyle.css';

const WeatherBox = ({ weather }) => {
    console.log(weather);

    if (!weather || !weather.main || !weather.weather || weather.weather.length === 0) {
        return <div>No weather data available</div>;
    }

    const tempCelsius = weather.main.temp;
    const tempFahrenheit = (tempCelsius * (9 / 5)) + 32;
    const weatherIcon = weather.weather[0]?.icon;
    const weatherDescription = weather.weather[0]?.description;

    return (
        <div className="weather-box">
            <h5>Forecast</h5>
            <div>
                <h3>&nbsp;{weather.name}, {weather.sys.country}</h3>
                <div className="weather-info">
                    <img
                        src={weatherIcon ? `http://openweathermap.org/img/wn/${weatherIcon}.png` : ''}
                        alt={weatherDescription || "Weather icon"}
                        style={{ width: '50px' }}
                    />
                    <h1>{weatherDescription || "No description available"}</h1>
                </div>
            </div>
            <div>
                <div>
                    <p className="m-0 p-0"><span id='celsius'>{tempCelsius ? tempCelsius.toFixed(1) : "N/A"}°</span> <span id='fahrenheit'>/ {tempCelsius ? tempFahrenheit.toFixed(1) : "N/A"}°F</span></p>
                </div>
                <div>
                    <CurrentDateTime />
                </div>
            </div>
        </div>
    );
};

export default WeatherBox;
