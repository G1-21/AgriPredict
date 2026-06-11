import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API_URL from "../api/api";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/history`)
      .then((response) => response.json())
      .then((data) => {
        setHistory(data);
      });

  }, []);

  return (

    <Layout>

      <h1>Prediction History</h1>

      <br />

      <table
        border="1"
        cellPadding="10"
        style={{
          backgroundColor: "white",
          width: "100%"
        }}
      >

        <thead>
            <tr>
                <th>ID</th>
                <th>Yield</th>
                <th>Crop</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>

          {history.map((item, index) => (

            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.yield}</td>
                <td>{item.crop}</td>
                <td>{item.date}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </Layout>

  );
}

export default History;