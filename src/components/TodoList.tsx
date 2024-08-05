import { ReactElement } from "react";
import { TodoItem } from ".";
import { ITodoItem } from "../interfaces";

interface ITodoListProps {
  todoArray: Array<ITodoItem>;
}

export function TodoList({ todoArray }: ITodoListProps): ReactElement {
  return (
    <div className="todo-list-container">
      <div className="todo-list">
        {todoArray.map((todo) => (
          <TodoItem key={todo.id} todoItem={todo} />
        ))}
      </div>
    </div>
  );
}
