import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const user =
    localStorage.getItem("user") || "Guest";

  const navigate = useNavigate();

  const [showMenu, setShowMenu] =
    useState(false);

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "15px 25px",
        boxShadow:
          "0 2px 5px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <h3
        style={{
          color: "#166534",
          margin: 0
        }}
      >
        🌾 AgriPredict
      </h3>

      <div
        style={{
          position: "relative"
        }}
      >

        <div
          onClick={() =>
            setShowMenu(!showMenu)
          }
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}
        >

          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#166534",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            {user.charAt(0).toUpperCase()}
          </div>

          <span>
            {user}
          </span>

        </div>

        {showMenu && (

          <div
            style={{
              position: "absolute",
              top: "50px",
              right: 0,
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.2)",
              width: "180px",
              zIndex: 1000
            }}
          >

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              style={menuButton}
            >
              🏠 Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/history")
              }
              style={menuButton}
            >
              📋 History
            </button>

            <button
              onClick={handleLogout}
              style={{
                ...menuButton,
                color: "#dc2626"
              }}
            >
              🚪 Logout
            </button>

          </div>

        )}

      </div>

    </div>

  );
}

const menuButton = {
  width: "100%",
  padding: "12px",
  border: "none",
  backgroundColor: "white",
  textAlign: "left",
  cursor: "pointer"
};

export default Navbar;