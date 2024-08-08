import { ReactElement } from "react";
import { useTodosContext } from "../hooks";

export function AboutPage(): ReactElement {
  const { todoArray } = useTodosContext();

  return (
    <div>
      <div>About</div>

      <div>Total number of todos: {todoArray.length}</div>
    </div>
  );
}
