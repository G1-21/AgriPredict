import API_URL from "../api/api";
import { useState } from "react";

function CropForm() {

  const [cropResult, setCropResult] = useState("");
  const [advice, setAdvice] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [condition, setCondition] = useState("");

  const fetchWeather = async () => {

  if (!city) {

    alert("Please enter a city");
    return;

  }

  try {

    const response = await fetch(
      `${API_URL}/weather/${city}`
    );

    const data = await response.json();

    setTemperature(data.temperature);
    setHumidity(data.humidity);
    setCondition(data.condition);

  } catch (error) {

    console.error(error);

    alert("Unable to fetch weather");

  }
};

  const recommendCrop = async () => {

    const N = document.getElementById("N").value;
    const P = document.getElementById("P").value;
    const K = document.getElementById("K").value;
    const temperatureValue = temperature;
    const humidityValue = humidity;
    const ph =
      document.getElementById("ph").value;
    const rainfall =
      document.getElementById("rainfall").value;

    if (
      !N ||
      !P ||
      !K ||
      !temperatureValue ||
      !humidityValue ||
      !ph ||
      !rainfall
    ) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      N: Number(N),
      P: Number(P),
      K: Number(K),
      temperature: Number(temperatureValue),
      humidity: Number(humidityValue),
      ph: Number(ph),
      rainfall: Number(rainfall)
    };

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/recommend-crop`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();

      setCropResult(
        result.recommended_crop
      );

      const crop =
        result.recommended_crop;

      if (
        crop.toLowerCase() === "rice"
      ) {

        setAdvice(
          "🌾 Rice requires adequate water availability and performs best in humid environments."
        );

      }
      else if (
        crop.toLowerCase() === "wheat"
      ) {

        setAdvice(
          "🌱 Wheat grows well in moderate temperatures and requires balanced irrigation."
        );

      }
      else if (
        crop.toLowerCase() === "cotton"
      ) {

        setAdvice(
          "☁ Cotton needs warm temperatures and well-drained soil."
        );

      }
      else {

        setAdvice(
          "✅ This crop is suitable based on the provided soil and weather conditions."
        );

      }

      setTimestamp(
        new Date().toLocaleString()
      );

    } catch (error) {

      console.error(error);

      alert(
        "Crop Recommendation Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  const clearForm = () => {

    setCity("");
    setTemperature("");
    setHumidity("");
    setCondition("");

    document.getElementById("N").value = "";
    document.getElementById("P").value = "";
    document.getElementById("K").value = "";
    document.getElementById("ph").value = "";
    document.getElementById("rainfall").value = "";

    setCropResult("");
    setAdvice("");
    setTimestamp("");
  };

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2>
        🌱 Crop Recommendation
      </h2>
      <br/>
      <h3>
        🌦 Auto Fill Weather
      </h3>

      <input
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
      }
        placeholder="Enter City"
        style={inputStyle}
      />

      <button
        onClick={fetchWeather}
        style={{
          ...buttonStyle,
          marginBottom: "15px"
        }}
      >
        Get Weather Data
      </button>

      {condition && (

        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px"
          }}
        >

          <h4
            style={{
              color: "#166534"
            }}
          >
            🌦 Current Weather
          </h4>

          <p>
            🌡 Temperature: {temperature} °C
          </p>

          <p>
            💧 Humidity: {humidity} %
          </p>

          <p>
            ☁ Condition: {condition}
          </p>

        </div>

      )}

      <br />

      <input
        id="N"
        placeholder="Nitrogen (0-140 kg/ha)"
        style={inputStyle}
      />

      <input
        id="P"
        placeholder="Phosphorus (5-145 kg/ha)"
        style={inputStyle}
      />

      <input
        id="K"
        placeholder="Potassium (5-205 kg/ha)"
        style={inputStyle}
      />

      <input
        value={temperature}
        onChange={(e) =>
          setTemperature(e.target.value)
        }
        placeholder="Temperature (°C)"
        style={inputStyle}
      />

      <input
        value={humidity}
        onChange={(e) =>
          setHumidity(e.target.value)
        }
        placeholder="Humidity (%)"
        style={inputStyle}
      />

      <input
        id="ph"
        placeholder="Soil pH (3.5-10)"
        style={inputStyle}
      />

      <input
        id="rainfall"
        placeholder="Annual Rainfall (200-3000 mm/year)"
        style={inputStyle}
      />

      <button
        onClick={recommendCrop}
        style={buttonStyle}
      >
        {loading
          ? "Analyzing..."
          : "Recommend Crop"}
      </button>

      {cropResult && (

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor:
              "#dcfce7",
            borderRadius: "12px"
          }}
        >

          <h3>
            🌾 Recommended Crop:
            {" "}
            {cropResult}
          </h3>

          <p>
            <strong>
              AI Recommendation:
            </strong>
          </p>

          <p>
            {advice}
          </p>

          <p>
            This recommendation is
            generated using soil
            nutrient levels, pH,
            rainfall, humidity,
            and temperature.
          </p>

          <ul>
            <li>
              🌱 Use quality seeds
            </li>

            <li>
              💧 Follow proper
              irrigation practices
            </li>

            <li>
              🦠 Monitor crop health
            </li>

            <li>
              🚜 Follow recommended
              farming schedules
            </li>
          </ul>

          <p>
            <strong>
              Recommendation Time:
            </strong>
            {" "}
            {timestamp}
          </p>

          <button
            onClick={clearForm}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "12px",
              backgroundColor:
                "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Clear Entries & Start New Recommendation
          </button>

        </div>

      )}

    </div>

  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#166534",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default CropForm;