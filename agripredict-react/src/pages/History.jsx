import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API_URL from "../api/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function History() {

  const [history, setHistory] = useState([]);

  const loadHistory = () => {

    fetch(`${API_URL}/history`)
      .then((response) => response.json())
      .then((data) => {

        setHistory(data);

      });

  };

  useEffect(() => {

    loadHistory();

  }, []);

  const deleteRecord = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this record?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${API_URL}/delete-history/${id}`,
        {
          method: "DELETE"
        }
      );

      loadHistory();

    } catch (error) {

      console.error(error);

      alert("Delete Failed");

    }
  };

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "AgriPredict Prediction History",
      14,
      20
    );

    const tableData = history.map(
      (item) => [
        item.id,
        item.yield,
        item.crop,
        item.date
      ]
    );

    autoTable(doc, {
      head: [
        [
          "ID",
          "Yield",
          "Crop",
          "Date"
        ]
      ],
      body: tableData,
      startY: 30
    });

    doc.save(
      "AgriPredict_History.pdf"
    );
  };

  return (

    <Layout>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >

        <h1>
          📋 Prediction History
        </h1>

        <button
          onClick={exportPDF}
          style={{
            backgroundColor:
              "#166534",
            color: "white",
            border: "none",
            padding:
              "10px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          📄 Export PDF
        </button>

      </div>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
          backgroundColor:
            "white",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <thead>

          <tr
            style={{
              backgroundColor:
                "#166534",
              color: "white"
            }}
          >

            <th style={thStyle}>
              ID
            </th>

            <th style={thStyle}>
              Yield
            </th>

            <th style={thStyle}>
              Crop
            </th>

            <th style={thStyle}>
              Date
            </th>

            <th style={thStyle}>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {history.map((item, index) => (

              <tr
                key={item.id}
              >

                <td style={tdStyle}>
                  {index + 1}
                </td>

                <td style={tdStyle}>
                  {item.yield}
                </td>

                <td style={tdStyle}>
                  {item.crop}
                </td>

                <td style={tdStyle}>
                  {item.date}
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      deleteRecord(
                        item.id
                      )
                    }
                    style={{
                      backgroundColor:
                        "#dc2626",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "8px 12px",
                      borderRadius:
                        "6px",
                      cursor:
                        "pointer"
                    }}
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </Layout>

  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left"
};

const tdStyle = {
  padding: "12px",
  borderBottom:
    "1px solid #ddd"
};

export default History;