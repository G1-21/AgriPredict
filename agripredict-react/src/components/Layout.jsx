import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6"
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "30px"
          }}
        >
          {children}
        </div>

      </div>
    </>
  );
}

export default Layout;