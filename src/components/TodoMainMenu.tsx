import { ReactElement } from "react";

export function TodoMainMenu(): ReactElement {
  return (
    <>
      <h1>Main menu</h1>
      <div className="main-menu">
        <div className="add-container">
          <button className="btn">Add</button>
          <textarea className="textarea"></textarea>
        </div>
        <button className="btn">Rmove</button>
      </div>
    </>
  );
}
