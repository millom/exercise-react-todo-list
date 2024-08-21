import { ReactElement, RefObject, useRef } from "react";
import { ITodoItem } from "../interfaces";
import { useTodosContext } from "../hooks";
import { fetchAddTodo, postJSonDataUsingFetch } from "../fetchFunctions";

export function AddTodoPage(): ReactElement {
  const { addTodoFunc, username, baseUrl } = useTodosContext();
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const addTodoListLocal = () => {
    const todoItem: ITodoItem = {
      id: -1,
      text: textAreaRef.current!.value,
      done: false,
      username: username, //usernameRef.current!.value,
      timestamp: new Date(),
      epoch: new Date(1970, 0, 1, 0, 0, 0, 0).getTime().toString(),
    };
    addTodoFunc(todoItem);
  };

  return (
    <>
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
    </>
  );
}
