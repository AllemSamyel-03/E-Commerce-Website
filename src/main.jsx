import React from "react";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
