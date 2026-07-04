import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  padding: "12px 15px",
  borderRadius: "12px",
  transition: "all 0.3s ease"
};

const handleHover = (e) => {
  e.target.style.background =
    "rgba(255,255,255,0.15)";
  e.target.style.backdropFilter =
    "blur(12px)";
  e.target.style.webkitBackdropFilter =
    "blur(12px)";
  e.target.style.border =
    "1px solid rgba(255,255,255,0.2)";
  e.target.style.boxShadow =
    "0 4px 20px rgba(0,0,0,0.2)";
};

const handleLeave = (e) => {
  e.target.style.background = "transparent";
  e.target.style.border = "none";
  e.target.style.boxShadow = "none";
};

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background:"linear-gradient(180deg,#14532d,#166534,#15803d)",
        boxShadow:"4px 0 15px rgba(0,0,0,0.2)",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0
      }}
    >

      <h2 style={{ marginBottom: "20px" }}>
        🌾 AgriPredict
      </h2>

      <hr />

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: "20px"
        }}
      >

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/dashboard"
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            🏠 Home
        </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/yield"
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            📈 Crop Yield Prediction
          </Link>   
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/crop"
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            🌱 Crop Recommendation
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/analytics"
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            📊 Analytics
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/history"
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            📋 History
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;