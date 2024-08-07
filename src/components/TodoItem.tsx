import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const EditItem = (todo: ITodoItem) => {
    // navigate("EditPage", { todo: ITodoItem }); // options: { todo: ITodoItem });
    navigate("/edit", {
      state: todo,
    });
  };

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
        <span className="username" title={todoItem.username}>
          {todoItem.username}:
        </span>
        <span title={todoItem.timestamp.toLocaleDateString()}>
          {todoItem.timestamp.toLocaleDateString()}
        </span>
        {/* <span
          data-tooltip="Custom tooltip text."
          data-tooltip-position="bottom"
        >
          {todoItem.timestamp}
        </span> */}
      </div>
      <button className="sm-btn" onClick={() => RemoveItem(todoItem.id)}>
        Remove
      </button>
      <button className="sm-btn" onClick={() => EditItem(todoItem)}>
        Edit
      </button>
    </div>
  );
}
