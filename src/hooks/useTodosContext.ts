import { useOutletContext } from "react-router-dom";
import { ITodosContext } from "../interfaces";

export function useTodosContext(): ITodosContext {
  return useOutletContext<ITodosContext>();
}
