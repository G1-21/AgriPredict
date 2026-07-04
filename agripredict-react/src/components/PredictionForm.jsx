import API_URL from "../api/api";
import { useState } from "react";

function PredictionForm() {

  const [yieldResult, setYieldResult] = useState("");
  const [advice, setAdvice] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState("");

  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainfall, setRainfall] = useState("");
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

  const predictYield = async () => {

    const nitrogen =
      document.getElementById("nitrogen").value;

    const phosphorus =
      document.getElementById("phosphorus").value;

    const potassium =
      document.getElementById("potassium").value;

    if (
      !rainfall ||
      !temperature ||
      !humidity ||
      !nitrogen ||
      !phosphorus ||
      !potassium
    ) {

      alert("Please fill all fields");
      return;

    }

    const data = {

      rainfall: Number(rainfall),
      temperature: Number(temperature),
      humidity: Number(humidity),

      nitrogen: Number(nitrogen),
      phosphorus: Number(phosphorus),
      potassium: Number(potassium)

    };

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/predict-yield`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result =
        await response.json();

      setYieldResult(
        result.predicted_yield
      );

      const predictedYield =
        result.predicted_yield;

      if (predictedYield < 30) {

        setAdvice(
          "⚠ Low yield expected. Improve irrigation, fertilizer application and soil nutrient management."
        );

      } else if (predictedYield < 50) {

        setAdvice(
          "🟡 Moderate yield expected. Minor improvements in cultivation practices can increase productivity."
        );

      } else {

        setAdvice(
          "🌱 Excellent yield expected. Current soil and weather conditions are favorable for cultivation."
        );

      }

      setTimestamp(
        new Date().toLocaleString()
      );

    } catch (error) {

      console.error(error);

      alert("Prediction Failed");

    } finally {

      setLoading(false);

    }
  };

  const clearForm = () => {

    setCity("");
    setRainfall("");
    setTemperature("");
    setHumidity("");

    document.getElementById("nitrogen").value = "";
    document.getElementById("phosphorus").value = "";
    document.getElementById("potassium").value = "";

    setYieldResult("");
    setAdvice("");
    setTimestamp("");
  };

  const getResultColor = () => {

    if (yieldResult < 30)
      return "#fee2e2";

    if (yieldResult < 50)
      return "#fef9c3";

    return "#dcfce7";
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
        📈 Crop Yield Prediction
      </h2>

      <br />

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
          color: "#166534",
          marginBottom: "10px"
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

      <input
        value={rainfall}
        onChange={(e) =>
          setRainfall(
            e.target.value
          )
        }
        placeholder="Annual Rainfall (200–3000 mm/year)"
        style={inputStyle}
      />

      <input
        value={temperature}
        onChange={(e) =>
          setTemperature(
            e.target.value
          )
        }
        placeholder="Temperature (°C)"
        style={inputStyle}
      />

      <input
        value={humidity}
        onChange={(e) =>
          setHumidity(
            e.target.value
          )
        }
        placeholder="Humidity (%)"
        style={inputStyle}
      />

      <input
        id="nitrogen"
        placeholder="Nitrogen (0–140 kg/ha)"
        style={inputStyle}
      />

      <input
        id="phosphorus"
        placeholder="Phosphorus (5–145 kg/ha)"
        style={inputStyle}
      />

      <input
        id="potassium"
        placeholder="Potassium (5–205 kg/ha)"
        style={inputStyle}
      />

      <button
        onClick={predictYield}
        style={buttonStyle}
      >
        {
          loading
            ? "Predicting..."
            : "Predict Yield"
        }
      </button>

      {yieldResult && (

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor:
              getResultColor(),
            borderRadius: "12px"
          }}
        >

          <h3>
            🌾 Predicted Yield:
            {" "}
            {yieldResult}
            {" "}
            tons/hectare
          </h3>

          <p>
            <strong>
              AI Recommendation:
            </strong>
          </p>

          <p>{advice}</p>

          <p>
            This prediction is based on
            weather conditions and
            soil nutrient values.
          </p>

          <ul>
            <li>
              🌱 Monitor soil nutrients
            </li>

            <li>
              💧 Maintain irrigation
            </li>

            <li>
              🦠 Prevent pest attacks
            </li>

            <li>
              🚜 Follow best farming practices
            </li>
          </ul>

          <p>
            <strong>
              Prediction Time:
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
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Clear Entries & Start New Prediction
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

export default PredictionForm;