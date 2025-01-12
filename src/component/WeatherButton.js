import React from 'react';
import Button from 'react-bootstrap/Button';
import './ComponentStyle.css';

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
    return (
        <div>
            <Button
                variant="outline-dark"
                className="button-style"
                onClick={() => handleCityChange("current")}
            >
                Current Location
            </Button>

            {cities.map((item, index) => (
                <Button
                    variant="outline-dark"
                    key={index}
                    onClick={() => handleCityChange(item)}
                    className="button-style"
                >
                    {item}
                </Button>
            ))}
        </div>
    );
}

export default WeatherButton