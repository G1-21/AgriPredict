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

  const [previousData, setPreviousData] =
  useState([]);

  const [currentData, setCurrentData] =
  useState({});

  const [futureData, setFutureData] =
  useState([]);

  const [currentGraph, setCurrentGraph] =
  useState([]);

  const [viewType, setViewType] =
  useState("previous");

  const [summary, setSummary] = useState({
  average: 0,
  highest: 0,
  lowest: 0,
  count: 0,
  most_crop: "",
  crop_count: 0
});

  useEffect(() => {

    fetch(`${API_URL}/analytics`)
      .then((response) => response.json())
      .then((data) => {

        setPreviousData(data.previous);

        setCurrentData(data.current);

        setCurrentGraph(data.current_graph);

        setFutureData(data.future);

    })

      fetch(`${API_URL}/analytics-summary`)
      .then((response) => response.json())
      .then((data) => {

        setSummary(data);

      });

  }, []);


  let chartData = [];

  if (viewType === "previous") {

      chartData = previousData;

  }
  else if (viewType === "current") {

      chartData = currentGraph;

  }
  else {

      chartData = futureData;

  }


  const data = {

  labels:

  viewType === "current"

  ? chartData.map(
  (item)=>item.day
  )

  : chartData.map(
  (item)=>item.month
  ),

  datasets:[

  {

  label:

  viewType === "previous"

  ? "Previous 6 Months"

  : viewType === "current"

  ? "Current Month"

  : "Future Forecast",

  data:

  chartData.map(
  (item)=>item.yield
  ),

  borderColor:

  viewType === "future"

  ? "#2563eb"

  : "#166534",

  backgroundColor:

  viewType==="previous"

  ? "#22c55e"

  : "#60a5fa",

  borderDash:

  viewType === "future"

  ? [5,5]

  : [],

  tension:0.4

  }

  ]

  };

  const options = {
    responsive: true,

    interaction: {
      mode: "index",
      intersect: false
    },

    plugins: {
      legend: {
        position: "top"
      },

      title: {
        display: true,

        text:
          viewType === "previous"
            ? "Previous 6 Months Yield Analysis"
            : viewType === "current"
            ? "Current Month Yield Analysis"
            : "Future 6 Months Yield Forecast"
      },

      tooltip: {
        callbacks: {

          title: function (tooltipItems) {

            const index =
              tooltipItems[0].dataIndex;

            if (viewType === "previous") {
              return previousData[index].month;
            }

            if (viewType === "current") {
              return currentGraph[index].day;
            }

            return futureData[index].month;
          },

          label: function (context) {

            const index = context.dataIndex;

            if (viewType === "previous") {

              const item = previousData[index];

              return [
                `🌾 Average Yield: ${item.yield} t/ha`,
                `🌱 Top Crop: ${item.top_crop}`,
                `📊 Total Predictions: ${item.total_predictions}`,
                `📈 Highest Yield: ${item.highest_yield} t/ha`,
                `📉 Lowest Yield: ${item.lowest_yield} t/ha`
              ];
            }

            if (viewType === "current") {

              const item = currentGraph[index];

              // First prediction has no previous value
              if (index === 0) {

                return [
                  `🌾 Predicted Yield: ${item.yield} t/ha`,
                  `🔢 Prediction No: ${index + 1}`,
                  `📊 Change: No previous prediction`,
                  `🕒 Time: ${item.time || "N/A"}`
                ];
              }

              // Get previous prediction
              const previousYield =
                currentGraph[index - 1].yield;

              // Calculate difference
              const change =
                item.yield - previousYield;

              // Decide trend
              let trend = "No Change";

              if (change > 0) {
                trend = "Increased";
              }
              else if (change < 0) {
                trend = "Decreased";
              }

              return [
                `🌾 Predicted Yield: ${item.yield} t/ha`,
                `🔢 Prediction No: ${index + 1}`,
                `📊 Change: ${change > 0 ? "+" : ""}${change.toFixed(2)} t/ha`,
                `📈 Trend: ${trend}`,
                `🕒 Time: ${item.time || "N/A"}`
              ];
            }

            const item = futureData[index];

            if (index === 0) {

              const lastHistoricalYield =
                previousData.length > 0
                  ? previousData[previousData.length - 1].yield
                  : item.yield;

              const change =
                item.yield - lastHistoricalYield;

              return [
                `🔮 Forecast Yield: ${item.yield} t/ha`,
                `📊 Expected Change: ${change > 0 ? "+" : ""}${change.toFixed(2)} t/ha`,
                `📈 Forecast Trend: ${
                  change > 0
                    ? "Expected Increase"
                    : change < 0
                    ? "Expected Decrease"
                    : "Stable"
                }`
              ];
            }

            const previousForecastYield =
              futureData[index - 1].yield;

            const change =
              item.yield - previousForecastYield;

            return [
              `🔮 Forecast Yield: ${item.yield} t/ha`,
              `📊 Expected Change: ${change > 0 ? "+" : ""}${change.toFixed(2)} t/ha`,
              `📈 Forecast Trend: ${
                change > 0
                  ? "Expected Increase"
                  : change < 0
                  ? "Expected Decrease"
                  : "Stable"
              }`
            ];
          }
        }
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "15px",
          marginBottom: "25px"
        }}
      >

        <SummaryCard
          title="Average Yield"
          value={`${summary.average}`}
        />

        <SummaryCard
          title="Highest Yield"
          value={`${summary.highest}`}
        />

        <SummaryCard
          title="Lowest Yield"
          value={`${summary.lowest}`}
        />

        <SummaryCard
          title="Predictions"
          value={`${summary.count}`}
        />

        <SummaryCard
          title="Top Crop"
          value={summary.most_crop}
        />

      </div>

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <select
          value={viewType}
          onChange={(e) =>
            setViewType(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "8px"
          }}
        >

          <option value="previous">
            Previous 6 Months
          </option>

          <option value="current">
            Current Month
          </option>

          <option value="future">
            Future 6 Months
          </option>

        </select>

      </div>

      <Line
        data={data}
        options={options}
      />

    </div>

  );
}

function SummaryCard({
  title,
  value
}) {

  return (

    <div
      style={{
        backgroundColor: "#f0fdf4",
        padding: "15px",
        borderRadius: "12px",
        textAlign: "center",
        border:
          "1px solid #bbf7d0"
      }}
    >

      <h4
        style={{
          color: "#166534"
        }}
      >
        {title}
      </h4>

      <h2>{value}</h2>

    </div>

  );

}

export default Charts;