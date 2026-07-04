import { useState } from "react";
import API_URL from "../api/api";

function WeatherWidget() {

  const [city, setCity] = useState("");

  const [weather, setWeather] =
    useState(null);

  const getWeather = async () => {

    try {

      const response =
        await fetch(
          `${API_URL}/weather/${city}`
        );

      const data =
        await response.json();

      setWeather(data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.1)",
        marginTop: "20px"
      }}
    >

      <h2>
        🌦 Live Weather
      </h2>

      <input
        placeholder="Enter City"
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px"
        }}
      />

      <button
        onClick={getWeather}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          backgroundColor:
            "#166534",
          color: "white",
          border: "none"
        }}
      >
        Get Weather
      </button>

      {weather && (

        <div
          style={{
            marginTop: "20px"
          }}
        >

          <h3>
            {city}
          </h3>

          <p>
            🌡 Temperature:
            {weather.temperature}°C
          </p>

          <p>
            💧 Humidity:
            {weather.humidity}%
          </p>

          <p>
            ☁ Condition:
            {weather.condition}
          </p>

        </div>

      )}

    </div>

  );
}

export default WeatherWidget;