import { ReactElement, RefObject, useRef } from "react";
// import { useTodosContext } from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
// import { ITodoItem, IUsername } from "../interfaces";

export function EditPage(): ReactElement {
  // const { editTodoFunc } = useTodosContext();
  const { state } = useLocation();

  const navigate = useNavigate();
  // const { addTodoFunc, removeTodoFunc } = useTodosContext();
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);
  // const usernameRef: RefObject<HTMLSelectElement> = useRef(null);

  const editTodoLocal = () => {
    console.log("Before:", state);
    state.text = textAreaRef.current!.value;
    console.log("After:", state);
    // todoItem.done = false,
    // username: usernameRef.current!.value,
    // timestamp: new Date().toLocaleDateString("sv-SW"),
    // editTodoFunc(state);
    navigate("/");
  };

  // const userNames: Array<IUsername> = [
  //   { id: 0, name: "MFL" },
  //   { id: 1, name: "RFL" },
  //   { id: 2, name: "JFL" },
  // ];

  return (
    <>
      <div className="main-menu-container">
        <div className="main-menu-layout">
          <div className="add-container">
            {/* <button className="btn" onClick={editTodoLocal}>
              Add
            </button> */}
            <textarea
              className="textarea"
              ref={textAreaRef}
              defaultValue={state.text}
            />
            {/* <div>
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
            </div> */}
          </div>
          <button className="btn" onClick={editTodoLocal}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}
