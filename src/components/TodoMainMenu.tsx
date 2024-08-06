import { ReactElement, RefObject } from "react";
import { addRemoveFunc } from "../customTypes";
import { IUsername } from "../interfaces";

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
  const userNames: Array<IUsername> = [
    { id: 0, name: "MFL" },
    { id: 1, name: "RFL" },
    { id: 2, name: "JFL" },
  ];

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
                {userNames.map((user: IUsername) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
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
