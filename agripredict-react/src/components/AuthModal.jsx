import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function AuthModal({ onClose }) {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const result = await response.json();

      if (result.success) {

        localStorage.setItem(
          "user",
          result.name
        );

        onClose();

        navigate("/dashboard");

      } else {

        alert("Invalid Email or Password");

      }

    } catch (error) {

      console.error(error);

      alert("Login Failed");

    }

  };

  const registerUser = async () => {

    try {

      const response = await fetch(
        `${API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const result = await response.json();

      alert(result.message);

      setIsLogin(true);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.error(error);

      alert("Registration Failed");

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (isLogin) {

      await loginUser();

    } else {

      await registerUser();

    }

  };

  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >

      <div
        style={{
          width: "420px",
          padding: "35px",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.2)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.2)",
          color: "white"
        }}
      >

        <h2
          style={{
            textAlign: "center"
          }}
        >
          🌾 AgriPredict
        </h2>

        <h3
          style={{
            textAlign: "center"
          }}
        >
          {isLogin ? "Login" : "Register"}
        </h3>

        <form onSubmit={handleSubmit}>

        {!isLogin && (

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Full Name"
            style={inputStyle}
          />

        )}

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          style={inputStyle}
        />

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          {isLogin
            ? "Login"
            : "Register"}
        </button>

        </form>

        <p
          style={{
            textAlign: "center",
            cursor: "pointer",
            marginTop: "15px"
          }}
          onClick={() =>
            setIsLogin(!isLogin)
          }
        >
          {isLogin
            ? "New User? Register"
            : "Already have an account? Login"}
        </p>

        <button
          onClick={onClose}
          style={{
            ...buttonStyle,
            backgroundColor: "#dc2626"
          }}
        >
          Close
        </button>

      </div>

    </div>

  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "none",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  backgroundColor: "#166534",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};

export default AuthModal;