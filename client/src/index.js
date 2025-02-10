import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import { DashboardContextProvider } from "./context/dashboardContextProvider";
import { MapsContextProvider } from "./context/MapsContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      },
      (err) => {
        console.error("Service Worker registration failed:", err);
      }
    );
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));

export const server = "https://wswe.onrender.com/";

root.render(
  <BrowserRouter>
    <UserContextProvider>
      <DashboardContextProvider>
        <MapsContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </MapsContextProvider>
      </DashboardContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
