import { ReactElement, DragEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ITodoItem } from "../interfaces";
import { useTodosContext } from "../hooks";

interface ITodoItemProps {
  todoItem: ITodoItem;
  RemoveItem: (id: number) => void;
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
  updateAnyTodoSelected: () => void;
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
  updateAnyTodoSelected,
}: Readonly<ITodoItemProps>): ReactElement {
  const { updateTodoFunc, baseUrl } = useTodosContext();
  const navigate = useNavigate();

  const EditItem: (
    event: MouseEvent<HTMLButtonElement>,
    todo: ITodoItem
  ) => void = (event, todo: ITodoItem) => {
    event.stopPropagation();
    navigate("/edit", {
      state: todo,
    });
  };

  const handleTodoSelected: (
    event: any, //ChangeEvent<HTMLInputElement>,
    todo: ITodoItem
  ) => void = (event, todo) => {
    event.stopPropagation();
    todo.done = event.target.checked;
    updateTodoFunc(todo);

    updateAnyTodoSelected();
    // event.preventDefault();
    // event.preventDefault();
    // event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    // event.nativeEvent.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    console.log("SELECTED");
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
        onClick={(event) => handleTodoSelected(event, todoItem)}
        defaultChecked={todoItem.done}
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

        <span
          className="timestamp"
          title={todoItem.timestamp.toLocaleDateString()}
        >
          {todoItem.timestamp.toLocaleDateString()}
        </span>
      </div>

      <button className="sm-btn" onClick={() => RemoveItem(todoItem.id)}>
        Remove
      </button>

      <button className="sm-btn" onClick={(event) => EditItem(event, todoItem)}>
        Edit
      </button>

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
