import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ düzeltildi
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // ✅ Toast desteği
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer /> {/* ✅ toast göstergesi */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
