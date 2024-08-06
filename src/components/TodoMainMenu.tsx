import { ReactElement, RefObject } from "react";
import { addRemoveFunc } from "../customTypes";

interface ITodoMainMenuProps {
  addTodo: addRemoveFunc;
  removeTodo: addRemoveFunc;
  textareaRef: RefObject<HTMLTextAreaElement>;
  usernameRef: RefObject<HTMLSelectElement>;
}

export function TodoMainMenu({
  addTodo,
  removeTodo,
  textareaRef,
  usernameRef,
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
            <div>
              <label htmlFor="headerSelectId">User:</label>
              <select
                id="headerSelectId"
                className=""
                defaultValue={0}
                ref={usernameRef}
              >
                <option key={0} value="MFL">
                  MFL
                </option>
                <option key={1} value="RFL">
                  RFL
                </option>
                <option key={2} value="JFL">
                  JFL
                </option>
              </select>
            </div>
          </div>
          <button className="btn" onClick={removeTodo}>
            Remove (done)
          </button>
        </div>
      </div>
    </>
  );
}
