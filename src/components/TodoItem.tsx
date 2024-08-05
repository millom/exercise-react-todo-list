import { ReactElement } from "react";
import { ITodoItem } from "../interfaces";

interface ITodoItemProps {
  todoItem: ITodoItem;
}

export function TodoItem({ todoItem }: ITodoItemProps): ReactElement {
  return (
    <div className="todo-item-container">
      <input
        key={todoItem.id}
        type="checkbox"
        className="checkbox"
        // checked={todoItem.done}
        // value={todoItem.done.toString()}
        onChange={(v) => (todoItem.done = v.target.checked)}
        // ref={todoItem.ref}
      ></input>
      <textarea
        className="readonly-textarea not-selectable"
        readOnly
        value={todoItem.text}
      >
        {/* {todoItem.text} */}
      </textarea>
    </div>
  );
  // ref={todoItem.ref}
}
