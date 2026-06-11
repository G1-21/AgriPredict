function Navbar() {

  const user =
    localStorage.getItem("user");

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        boxShadow:
          "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >

      <h3>
        Welcome, {user}
      </h3>

    </div>

  );
}

export default Navbar;