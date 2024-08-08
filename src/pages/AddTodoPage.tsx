import { ReactElement, RefObject, useRef } from "react";
import { ITodoItem, IUsername } from "../interfaces";
import { useTodosContext } from "../hooks";

export function AddTodoPage(): ReactElement {
  const { addTodoFunc } = useTodosContext();
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const usernameRef: RefObject<HTMLSelectElement> = useRef(null);

  const addTodoListLocal = () => {
    const todoItem: ITodoItem = {
      id: -1,
      text: textAreaRef.current!.value,
      done: false,
      username: usernameRef.current!.value,
      timestamp: new Date(),
    };
    addTodoFunc(todoItem);
  };

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
            <button className="btn" onClick={addTodoListLocal}>
              Add
            </button>

            <textarea className="textarea" ref={textAreaRef}></textarea>

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
        </div>
      </div>
    </>
  );
}
