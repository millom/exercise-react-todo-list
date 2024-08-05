import { ReactElement, RefObject } from "react";
import { addRemoveFunc } from "../customTypes";

interface ITodoMainMenuProps {
  addTodo: addRemoveFunc;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

export function TodoMainMenu({
  addTodo,
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
          <button className="btn">Rmove</button>
        </div>
      </div>
    </>
  );
}
