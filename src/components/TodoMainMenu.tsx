import { ReactElement, RefObject } from "react";
import { addRemoveFunc } from "../customTypes";

interface ITodoMainMenuProps {
  addTodo: addRemoveFunc;
  removeTodo: addRemoveFunc;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

export function TodoMainMenu({
  addTodo,
  removeTodo,
  textareaRef,
}: ITodoMainMenuProps): ReactElement {
  return (
    <>
      <div className="main-menu-container">
        <div className="main-menu-layout">
          <div className="add-container">
            <button className="btn" onClick={addTodo}>
              Add
            </button>
            <textarea className="textarea" ref={textareaRef}></textarea>
          </div>
          <button className="btn" onClick={removeTodo}>
            Remove (done)
          </button>
        </div>
      </div>
    </>
  );
}
