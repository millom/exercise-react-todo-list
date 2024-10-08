import { ReactElement, RefObject, useRef } from "react";
import { ITodoItemPostDto } from "../interfaces";
import { useTodosContext } from "../hooks";

export function AddTodoPage(): ReactElement {
  const { addTodoFunc, username } = useTodosContext();
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const addTodoListLocal = () => {
    const todoItem: ITodoItemPostDto = {
      text: textAreaRef.current!.value,
      username: username,
    };
    addTodoFunc(todoItem);
  };

  return (
    <div className="main-menu-container">
      <div className="main-menu-layout">
        <div className="add-container">
          <button className="btn" onClick={addTodoListLocal}>
            Add
          </button>

          <textarea className="textarea" ref={textAreaRef}></textarea>
        </div>
      </div>
    </div>
  );
}
