import { ReactElement } from "react";
import { ITodoItem } from "../interfaces";
import { removeByIdFunc } from "../customTypes";

interface ITodoItemProps {
  todoItem: ITodoItem;
  RemoveItem: removeByIdFunc;
}

export function TodoItem({
  todoItem,
  RemoveItem,
}: ITodoItemProps): ReactElement {
  return (
    <div className="todo-item-container">
      <input
        key={todoItem.id}
        type="checkbox"
        className="checkbox"
        onChange={(event) => (todoItem.done = event.target.checked)}
      ></input>

      <textarea
        className="readonly-textarea not-selectable"
        readOnly
        value={todoItem.text}
      ></textarea>
      <div className="username-timestamp">
        <span className="username">{todoItem.username}: </span>
        <span>{todoItem.timestamp}</span>
      </div>
      <button className="sm-btn" onClick={() => RemoveItem(todoItem.id)}>
        Remove
      </button>
    </div>
  );
}
