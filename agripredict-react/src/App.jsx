import YieldPrediction from "./pages/YieldPrediction";
import CropRecommendation from "./pages/CropRecommendation";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/yield"
          element={<YieldPrediction />}
        />

        <Route
          path="/crop"
          element={<CropRecommendation />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/history"
          element={<History />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;