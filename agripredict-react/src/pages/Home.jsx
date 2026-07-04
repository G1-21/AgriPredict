import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Cards from "../components/Cards";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import ProfileAvatar
from "../components/ProfileAvatar";

function Home() {

  const navigate = useNavigate();

  const [showModal, setShowModal] =
  useState(false);
  const user =
  localStorage.getItem("user");

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh"
      }}
    >

      {/* Top Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px"
        }}
      >
        <h2 style={{ color: "#166534" }}>
          🌾 AgriPredict
        </h2>

        <div>

            {!user ? (

                <>
                    <button
                        onClick={() =>
                            setShowModal(true)
                    }
                    style={{
                        marginRight: "10px",
                        padding: "10px 20px"
                    }}
                >
                Login
      </button>

      <button
        onClick={() =>
          setShowModal(true)
        }
        style={{
          padding: "10px 20px",
          backgroundColor: "#166534",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Register
      </button>
    </>

  ) : (

    <ProfileAvatar />

  )}

</div>
      </div>

      <HeroSection
        openLogin={() => setShowModal(true)}
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >
        <Cards title="AI Powered" value="24/7" icon="🤖" />
        <Cards title="Model Accuracy" value="92%" icon="🎯" />
        <Cards title="Supported Crops" value="22+" icon="🌱" />
        <Cards title="Smart Farming" value="RF ML" icon="🚜" />
      </div>

      {showModal && (

        <AuthModal
            onClose={() =>
                setShowModal(false)
            }
        />

    )}

    </div>
  );
}



export default Home;