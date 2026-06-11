import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#166534",
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
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            🏠 Home
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/yield"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            📈 Yield Prediction
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/crop"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            🌱 Crop Recommendation
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/analytics"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            📊 Analytics
          </Link>
        </li>

        <li style={{ marginBottom: "20px" }}>
          <Link
            to="/history"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            📋 History
          </Link>
        </li>

        <li style={{ marginTop: "40px" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;