import API_URL from "../api/api";
import { useState } from "react";

function PredictionForm() {

  const [yieldResult, setYieldResult] = useState("");

  const predictYield = async () => {

    const data = {
      rainfall: Number(document.getElementById("rainfall").value),
      temperature: Number(document.getElementById("temperature").value),
      humidity: Number(document.getElementById("humidity").value),
      nitrogen: Number(document.getElementById("nitrogen").value),
      phosphorus: Number(document.getElementById("phosphorus").value),
      potassium: Number(document.getElementById("potassium").value)
    };

    try {

      const response = await fetch(
        `${API_URL}/predict-yield`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();

      setYieldResult(result.predicted_yield);

    } catch (error) {

      console.error(error);

      alert("Prediction Failed");

    }
  };

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2>📈 Crop Yield Prediction</h2>

      <br />

      <input
        id="rainfall"
        placeholder="Rainfall"
        style={inputStyle}
      />

      <input
        id="temperature"
        placeholder="Temperature"
        style={inputStyle}
      />

      <input
        id="humidity"
        placeholder="Humidity"
        style={inputStyle}
      />

      <input
        id="nitrogen"
        placeholder="Nitrogen"
        style={inputStyle}
      />

      <input
        id="phosphorus"
        placeholder="Phosphorus"
        style={inputStyle}
      />

      <input
        id="potassium"
        placeholder="Potassium"
        style={inputStyle}
      />

      <button
        onClick={predictYield}
        style={buttonStyle}
      >
        Predict Yield
      </button>

      {yieldResult && (

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#dcfce7",
            borderRadius: "10px"
          }}
        >
          <h3>
            Predicted Yield:
            {" "}
            {yieldResult}
          </h3>
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