import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
