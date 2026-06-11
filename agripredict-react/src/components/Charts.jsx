import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

import { useEffect, useState } from "react";

import API_URL from "../api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Charts() {

  const [yieldData, setYieldData] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/analytics`)
      .then((response) => response.json())
      .then((data) => {

        setYieldData(data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  const data = {

    labels: yieldData.map(
      (_, index) => `Prediction ${index + 1}`
    ),

    datasets: [
      {
        label: "Predicted Yield",
        data: yieldData,
        borderColor: "#166534",
        backgroundColor: "#22c55e",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2>📊 Yield Prediction Analytics</h2>

      <Line
        data={data}
        options={options}
      />

    </div>

  );
}

export default Charts;