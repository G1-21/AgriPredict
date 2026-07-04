import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection({ openLogin }) {

  const navigate = useNavigate();

  const [yieldHover, setYieldHover] = useState(false);
  const [cropHover, setCropHover] = useState(false);

  const handleProtectedNavigation = (path) => {

    const user = localStorage.getItem("user");

    if (user) {

      navigate(path);

    } else {

      openLogin();

    }
  };

  return (

    <div
      style={{
        background:
          "linear-gradient(135deg, #166534, #22c55e)",
        color: "white",
        padding: "40px",
        borderRadius: "15px",
        marginBottom: "30px",
        boxShadow:
          "0px 5px 15px rgba(0,0,0,0.2)"
      }}
    >

      <div
        style={{
          display: "inline-block",
          backgroundColor:
            "rgba(255,255,255,0.2)",
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

        {/* Predict Yield Button */}

        <button
          onMouseEnter={() => setYieldHover(true)}
          onMouseLeave={() => setYieldHover(false)}
          onClick={() =>
            handleProtectedNavigation("/yield")
          }
          style={{
            background: yieldHover
              ? "rgba(255,255,255,0.25)"
              : "white",
            backdropFilter: yieldHover
              ? "blur(12px)"
              : "none",
            color: "#166534",
            border: yieldHover
              ? "1px solid rgba(255,255,255,0.3)"
              : "none",
            padding: "12px 20px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            transform: yieldHover
              ? "translateY(-3px)"
              : "translateY(0)",
            boxShadow: yieldHover
              ? "0 8px 20px rgba(255,255,255,0.25)"
              : "none"
          }}
        >
          📈  Predict Yield
        </button>

        {/* Crop Recommendation Button */}

        <button
          onMouseEnter={() => setCropHover(true)}
          onMouseLeave={() => setCropHover(false)}
          onClick={() =>
            handleProtectedNavigation("/crop")
          }
          style={{
            background: cropHover
              ? "rgba(255,255,255,0.15)"
              : "#14532d",
            backdropFilter: cropHover
              ? "blur(12px)"
              : "none",
            color: "white",
            border: cropHover
              ? "1px solid rgba(255,255,255,0.3)"
              : "none",
            padding: "12px 20px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            transform: cropHover
              ? "translateY(-3px)"
              : "translateY(0)",
            boxShadow: cropHover
              ? "0 8px 20px rgba(255,255,255,0.15)"
              : "none"
          }}
        >
          🌱 Recommend Crop
        </button>

      </div>

    </div>

  );
}

export default HeroSection;