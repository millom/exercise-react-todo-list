import { ReactElement, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ITodoItem } from "../interfaces";
import { removeByIdFunc } from "../customTypes";

interface ITodoItemProps {
  todoItem: ITodoItem;
  RemoveItem: removeByIdFunc;
  selectedIdx: number;
  updateSelectedIdx: (idx: number) => void;
  handleDragStart: (event: DragEvent<HTMLDivElement>) => void;
  enableDropping: (event: DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>, id: number) => void;
  MoveItem: (
    event: MouseEvent<HTMLButtonElement>,
    todoToMove: ITodoItem,
    movement: number
  ) => void;
}

export function TodoItem({
  todoItem,
  RemoveItem,
  selectedIdx,
  updateSelectedIdx,
  handleDragStart,
  enableDropping,
  handleDrop,
  MoveItem,
}: Readonly<ITodoItemProps>): ReactElement {
  const navigate = useNavigate();
  const EditItem = (todo: ITodoItem) => {
    // navigate("EditPage", { todo: ITodoItem }); // options: { todo: ITodoItem });
    navigate("/edit", {
      state: todo,
    });
  };

  return (
    <div
      id={todoItem.id.toString()}
      className={
        todoItem.id === selectedIdx
          ? "todo-item-container selected dotted-border"
          : "todo-item-container"
      }
      onClick={() => updateSelectedIdx(todoItem.id)}
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={enableDropping}
      onDrop={(event) => handleDrop(event, todoItem.id)}
    >
      <input
        key={todoItem.id}
        type="checkbox"
        className="checkbox"
        onChange={(event) => (todoItem.done = event.target.checked)}
      ></input>

      <textarea
        className={
          todoItem.id === selectedIdx
            ? "readonly-textarea not-selectable selected"
            : "readonly-textarea not-selectable"
        }
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

      {/* <div className={todoItem.id === selectedIdx ? "disabled" : ""}> */}
      {/* <div className=""> */}
      <button className="sm-btn" onClick={() => RemoveItem(todoItem.id)}>
        Remove
      </button>

      <button className="sm-btn" onClick={() => EditItem(todoItem)}>
        Edit
      </button>
      {/* </div> */}

      <div
        className={
          todoItem.id !== selectedIdx ? "up-down-btns disabled" : "up-down-btns"
        }
      >
        <button
          className="sm-btn"
          onClick={(event) => MoveItem(event, todoItem, -1)}
        >
          Up
        </button>

        <button
          className="sm-btn"
          onClick={(event) => MoveItem(event, todoItem, 1)}
        >
          Down
        </button>
      </div>
    </div>
  );
}
