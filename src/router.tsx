import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { App, About, TodoList, TodoMainMenu } from "./components";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route index element={<TodoList />} /> */}
      {/* <Route path="add-todo" element={<TodoMainMenu />} /> */}
      <Route index element={<About />} />
    </Route>
  )
);
