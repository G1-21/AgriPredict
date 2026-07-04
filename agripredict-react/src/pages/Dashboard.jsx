import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import Cards from "../components/Cards";

import { useEffect, useState } from "react";
import API_URL from "../api/api";

function Dashboard() {

  const [stats, setStats] = useState({
    total_predictions: 0,
    total_users: 0,
    recommended_crops: 0,
    top_crop: "N/A",
    model_accuracy: 92
  });

  useEffect(() => {

    fetch(`${API_URL}/dashboard-stats`)
      .then((response) => response.json())
      .then((data) => {

        setStats(data);

      })
      .catch((error) => {

        console.error(
          "Dashboard Stats Error:",
          error
        );

      });

  }, []);

  return (

    <Layout>

      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >

        <Cards
          title="Total Predictions"
          value={stats.total_predictions}
          icon="📈"
        />

        <Cards
          title="Recommended Crops"
          value={stats.recommended_crops}
          icon="🌱"
        />

        <Cards
          title="Model Accuracy"
          value={`${stats.model_accuracy}%`}
          icon="🎯"
        />

        <Cards
          title="Registered Users"
          value={stats.total_users}
          icon="👨‍🌾"
        />

      </div>

      {/* Top Crop Highlight */}
      <div
        style={{
          marginTop: "20px",
          background:
            "linear-gradient(135deg,#166534,#22c55e)",
          color: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 8px 20px rgba(34,197,94,0.25)"
        }}
      >

        <h3>
          🌾 Most Recommended Crop
        </h3>

        <h1
          style={{
            marginTop: "10px",
            textTransform: "capitalize",
            fontSize: "40px"
          }}
        >
          {stats.top_crop}
        </h1>

      </div>

      {/* Information + Model Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(400px,1fr))",
          gap: "20px",
          marginTop: "25px"
        }}
      >

        {/* How It Works */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2
            style={{
              color: "#166534",
              marginBottom: "20px"
            }}
          >
            🚀 How AgriPredict Works
          </h2>

          <div>

            <h3>1️⃣ Soil Analysis</h3>
            <p>
              Enter Nitrogen, Phosphorus and Potassium values.
            </p>

            <h3>2️⃣ Weather Inputs</h3>
            <p>
              Provide temperature, humidity and rainfall.
            </p>

            <h3>3️⃣ ML Prediction</h3>
            <p>
              Random Forest model predicts crop yield.
            </p>

            <h3>4️⃣ Smart Recommendations</h3>
            <p>
              Get crop recommendations based on inputs.
            </p>

          </div>

        </div>

        {/* Model Summary */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#dcfce7,#bbf7d0)",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #86efac"
          }}
        >

          <h2>
            🏆 Model Performance
          </h2>

          <div
            style={{
              marginTop: "20px"
            }}
          >

            <h3>
              📈 Yield Prediction Accuracy
            </h3>

            <p>
              <strong>
                {stats.model_accuracy}%
              </strong>
            </p>

            <h3>
              🌱 Crop Recommendation Accuracy
            </h3>

            <p>
              <strong>
                95%
              </strong>
            </p>

          </div>

        </div>

      </div>

      {/* Quick Insights */}
      <div
        style={{
          marginTop: "25px",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2
          style={{
            color: "#166534"
          }}
        >
          📊 Quick Insights
        </h2>

        <ul
          style={{
            marginTop: "15px",
            lineHeight: "2"
          }}
        >

          <li>
            🌾 Most Recommended Crop:
            <strong>
              {" "}
              {stats.top_crop}
            </strong>
          </li>

          <li>
            📈 Total Predictions:
            <strong>
              {" "}
              {stats.total_predictions}
            </strong>
          </li>

          <li>
            👨‍🌾 Registered Users:
            <strong>
              {" "}
              {stats.total_users}
            </strong>
          </li>

          <li>
            🎯 Model Accuracy:
            <strong>
              {" "}
              {stats.model_accuracy}%
            </strong>
          </li>

        </ul>

      </div>

    </Layout>

  );
}

export default Dashboard;