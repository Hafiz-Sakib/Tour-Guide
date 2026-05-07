import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            borderRadius: "4px",
            background: "#0d2818",
            color: "#f8f3ec",
          },
          success: {
            iconTheme: {
              primary: "#5aaa78",
              secondary: "#f8f3ec",
            },
          },
          error: {
            iconTheme: {
              primary: "#e4a63a",
              secondary: "#f8f3ec",
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
