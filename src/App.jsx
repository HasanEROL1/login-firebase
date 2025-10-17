// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home"; // ✅ Giriş sonrası sayfa
import UpdateProfile from "./components/UpdateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
          <Route
            path="/update"
            element={
              <ProtectedRoute>
                <UpdateProfile /> {/* UpdateProfile bileşeni buraya yerleştirildi */}
              </ProtectedRoute>
            }
          />
      </Routes>

      {/* Toast bildirimleri */}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
