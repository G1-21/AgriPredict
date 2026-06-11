import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import Cards from "../components/Cards";

function Dashboard() {

  return (
    <Layout>

      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >

        <Cards
          title="Total Predictions"
          value="25"
          icon="📈"
        />

        <Cards
          title="Recommended Crops"
          value="10"
          icon="🌱"
        />

        <Cards
          title="Model Accuracy"
          value="92%"
          icon="🎯"
        />

        <Cards
          title="Active Users"
          value="15"
          icon="👨‍🌾"
        />

      </div>

      {/* Information Section */}
      <div
        style={{
          backgroundColor: "white",
          marginTop: "30px",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2
          style={{
            marginBottom: "15px",
            color: "#166534"
          }}
        >
          How AgriPredict Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >

          <div>
            <h3>1️⃣ Soil Analysis</h3>
            <p>
              Enter Nitrogen, Phosphorus and Potassium values.
            </p>
          </div>

          <div>
            <h3>2️⃣ Weather Inputs</h3>
            <p>
              Provide temperature, humidity and rainfall.
            </p>
          </div>

          <div>
            <h3>3️⃣ ML Prediction</h3>
            <p>
              Random Forest model processes the data.
            </p>
          </div>

          <div>
            <h3>4️⃣ Smart Results</h3>
            <p>
              Get crop yield prediction and crop recommendation.
            </p>
          </div>

        </div>

      </div>

      {/* Model Summary */}
      <div
        style={{
          background: "#dcfce7",
          marginTop: "25px",
          padding: "20px",
          borderRadius: "15px",
          border: "1px solid #86efac"
        }}
      >

        <h3>🏆 Model Performance Summary</h3>

        <p style={{ marginTop: "10px" }}>
          Random Forest Regression Accuracy: <strong>92%</strong>
        </p>

        <p>
          Crop Recommendation Accuracy: <strong>95%</strong>
        </p>

      </div>

    </Layout>
  );
}

export default Dashboard;