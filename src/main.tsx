import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
// import { App } from "./components";

import "./css/index.css";
import "./css/Header.css";
import "./css/TodoItem.css";
import "./css/ListTodosPage.css";
import "./css/AddTodoPage.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
