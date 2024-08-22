import { ReactElement, RefObject, useRef } from "react";
import { ITodoItem, ITodoItemPostDto } from "../interfaces";
import { useTodosContext } from "../hooks";
import { fetchAddTodo, postJSonDataUsingFetch } from "../fetchFunctions";

export function AddTodoPage(): ReactElement {
  const { addTodoFunc, username, baseUrl } = useTodosContext();
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const addTodoListLocal = () => {
    const todoItem: ITodoItemPostDto = {
      text: textAreaRef.current!.value,
      username: username, //usernameRef.current!.value,
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
