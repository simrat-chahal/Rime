import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
