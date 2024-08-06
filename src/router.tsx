import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { App } from "./components";
import { AboutPage, ListTodosPage, AddTodoPage, EditPage } from "./pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<ListTodosPage />} />
      <Route path="add-todo" element={<AddTodoPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="edit" element={<EditPage />} />
    </Route>
  )
);
