import { ReactElement } from "react";
import { ITodoItem } from "../interfaces";
import { addRemoveFunc, removeByIdFunc } from "../customTypes";

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
      <div className="username-timestamp">
        <span className="username">{todoItem.username}: </span>
        <span>{todoItem.timestamp}</span>
        {/* <div className="todo-item-label-p">
          <label>Username:</label>
          <span>{todoItem.username}</span>
        </div>
        <div className="todo-item-label-p">
          <label>Timestamp:</label>
          <p>{todoItem.timestamp}</p>
        </div> */}
      </div>
      <button className="sm-btn" onClick={() => RemoveItem(todoItem.id)}>
        Remove
      </button>
    </div>
  );
  // ref={todoItem.ref}
}
