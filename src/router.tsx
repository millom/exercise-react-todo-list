import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { App, TodoList, TodoMainMenu } from "./components";
import { AboutPage } from "./pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route index element={<TodoList />} /> */}
      {/* <Route path="add-todo" element={<TodoMainMenu />} /> */}
      <Route index element={<AboutPage />} />
    </Route>
  )
);
