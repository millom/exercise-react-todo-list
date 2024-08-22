import { ReactElement, RefObject, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTodosContext } from "../hooks";

export function EditPage(): ReactElement {
  const { state } = useLocation();
  const { updateTodoFunc } = useTodosContext();

  const navigate = useNavigate();
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const editTodoLocal = () => {
    console.log("State Before:", state);
    state.text = textAreaRef.current!.value;
    updateTodoFunc(state);
    // console.log("state", state);
    console.log("State After:", state);
    navigate("/");
  };

  return (
    <>
      <div className="main-menu-container">
        <div className="main-menu-layout">
          <div className="add-container">
            <textarea
              className="textarea"
              ref={textAreaRef}
              defaultValue={state.text}
            />
          </div>

          <button className="btn" onClick={editTodoLocal}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}
