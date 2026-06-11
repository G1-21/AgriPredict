function Cards({ title, value, icon }) {

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        width: "250px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}
    >

      <div
        style={{
          fontSize: "30px",
          marginBottom: "10px"
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h1
        style={{
          color: "#166534",
          marginTop: "10px"
        }}
      >
        {value}
      </h1>

    </div>
  );
}

export default Cards;