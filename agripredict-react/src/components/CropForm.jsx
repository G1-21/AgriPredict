import API_URL from "../api/api";
import { useState } from "react";

function CropForm() {

  const [cropResult, setCropResult] = useState("");

  const recommendCrop = async () => {

    const data = {
      N: Number(document.getElementById("N").value),
      P: Number(document.getElementById("P").value),
      K: Number(document.getElementById("K").value),
      temperature: Number(document.getElementById("temperature").value),
      humidity: Number(document.getElementById("humidity").value),
      ph: Number(document.getElementById("ph").value),
      rainfall: Number(document.getElementById("rainfall").value)
    };

    try {

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

      setCropResult(result.recommended_crop);

    } catch (error) {

      console.error(error);

      alert("Crop Recommendation Failed");

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

      <h2>🌱 Crop Recommendation</h2>

      <br />

      <input
        id="N"
        placeholder="Nitrogen (N)"
        style={inputStyle}
      />

      <input
        id="P"
        placeholder="Phosphorus (P)"
        style={inputStyle}
      />

      <input
        id="K"
        placeholder="Potassium (K)"
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
        id="ph"
        placeholder="pH Value"
        style={inputStyle}
      />

      <input
        id="rainfall"
        placeholder="Rainfall"
        style={inputStyle}
      />

      <button
        onClick={recommendCrop}
        style={buttonStyle}
      >
        Recommend Crop
      </button>

      {cropResult && (

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#dcfce7",
            borderRadius: "10px"
          }}
        >
          <h3>
            Recommended Crop:
            {" "}
            {cropResult}
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

export default CropForm;