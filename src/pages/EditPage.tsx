import { ReactElement, RefObject, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function EditPage(): ReactElement {
  const { state } = useLocation();

  const navigate = useNavigate();
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const editTodoLocal = () => {
    console.log("Before:", state);
    state.text = textAreaRef.current!.value;
    console.log("After:", state);
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
