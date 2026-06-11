import Layout from "../components/Layout";
import Charts from "../components/Charts";

function Analytics() {

  return (
    <Layout>

      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        Analytics Dashboard
      </h1>

      <Charts />

    </Layout>
  );
}

export default Analytics;