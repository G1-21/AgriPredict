import { useNavigate } from "react-router-dom";

function HeroSection() {

  const navigate = useNavigate();

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #166534, #22c55e)",
        color: "white",
        padding: "40px",
        borderRadius: "15px",
        marginBottom: "30px",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
      }}
    >

      <div
        style={{
          display: "inline-block",
          backgroundColor: "rgba(255,255,255,0.2)",
          padding: "8px 15px",
          borderRadius: "20px",
          marginBottom: "15px"
        }}
      >
        Powered by Random Forest ML
      </div>

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "15px"
        }}
      >
        Smart Farming Powered by AI
      </h1>

      <p
        style={{
          maxWidth: "600px",
          lineHeight: "1.8",
          marginBottom: "25px"
        }}
      >
        Predict crop yields and get crop recommendations
        based on soil nutrients, weather conditions,
        rainfall, temperature and humidity.
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px"
        }}
      >

        <button
          onClick={() => navigate("/yield")}
          style={{
            backgroundColor: "white",
            color: "#166534",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          📈 Predict Yield
        </button>

        <button
          onClick={() => navigate("/crop")}
          style={{
            backgroundColor: "#14532d",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🌱 Recommend Crop
        </button>

      </div>

    </div>
  );
}

export default HeroSection;