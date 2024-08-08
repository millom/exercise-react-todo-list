import { ReactElement } from "react";
import { TodoItem } from "../components";
import { useTodosContext } from "../hooks";

export function ListTodosPage(): ReactElement {
  const {
    todoArray,
    removeSelectedTodoFunc,
    selectedIdx,
    updateSelectedIdx,
    handleDragStart,
    enableDropping,
    handleDrop,
    MoveItem,
  } = useTodosContext();

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        {todoArray.map((todo) => (
          <TodoItem
            key={todo.id}
            todoItem={todo}
            RemoveItem={removeSelectedTodoFunc}
            selectedIdx={selectedIdx}
            updateSelectedIdx={updateSelectedIdx}
            handleDragStart={handleDragStart}
            enableDropping={enableDropping}
            handleDrop={handleDrop}
            MoveItem={MoveItem}
          />
        ))}
      </div>
    </div>
  );
}
