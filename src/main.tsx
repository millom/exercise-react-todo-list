import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";

import "./css/index.css";
import "./css/TodoItem.css";
import "./css/TodoList.css";
import "./css/TodoMain.css";
import "./css/TodoMainMenu.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
