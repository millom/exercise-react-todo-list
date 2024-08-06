import { ReactElement } from "react";
import { TodoItem } from "../components";
import { ITodoItem } from "../interfaces";
import { removeByIdFunc } from "../customTypes";

interface ITodoListProps {
  todoArray: Array<ITodoItem>;
  RemoveItem: removeByIdFunc;
}

export function TodoList({
  todoArray,
  RemoveItem,
}: ITodoListProps): ReactElement {
  return (
    <div className="todo-list-container">
      <div className="todo-list">
        {todoArray.map((todo) => (
          <TodoItem key={todo.id} todoItem={todo} RemoveItem={RemoveItem} />
        ))}
      </div>
    </div>
  );
}
