import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileAvatar() {

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  const user =
    localStorage.getItem("user");

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    navigate("/");

    window.location.reload();
  };

  return (

    <div
      style={{
        position: "relative"
      }}
    >

      <div
        onClick={() =>
          setOpen(!open)
        }
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          backgroundColor: "#166534",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        {user?.charAt(0)}
      </div>

      {open && (

        <div
          style={{
            position: "absolute",
            right: 0,
            top: "55px",
            width: "180px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.2)"
          }}
        >

          <div
            style={{
              padding: "12px",
              borderBottom:
                "1px solid #eee"
            }}
          >
            {user}
          </div>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            style={menuBtn}
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/history")
            }
            style={menuBtn}
          >
            History
          </button>

          <button
            onClick={logout}
            style={menuBtn}
          >
            Logout
          </button>

        </div>

      )}

    </div>

  );
}

const menuBtn = {
  width: "100%",
  padding: "12px",
  border: "none",
  backgroundColor: "white",
  cursor: "pointer",
  textAlign: "left"
};

export default ProfileAvatar;