import { ReactElement, RefObject, useRef, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { SortType } from "../enums";
import { IUsername } from "../interfaces";

interface IHeaderProps {
  removeTodoFunc: () => void;
  sortListFunc: (type: SortType) => void;
  showRemoveButton: boolean;
  updateUserFunc: (event: ChangeEvent<HTMLSelectElement>) => void;
  users: Array<IUsername>;
  username: string;
}

export function Header({
  removeTodoFunc,
  sortListFunc,
  showRemoveButton,
  updateUserFunc,
  users,
  username,
}: Readonly<IHeaderProps>): ReactElement {
  const usernameRef: RefObject<HTMLSelectElement> = useRef(null);

  return (
    <div className="header-container">
      <div className="header-header-navbar-container">
        <h1 className="header-text">My todo list</h1>

        <div className="header-navbar">
          <button
            className={showRemoveButton ? "btn" : "btn hidden"}
            type="button"
            onClick={removeTodoFunc}
          >
            Remove selected
          </button>

          <Link to="/" className="link">
            Home
          </Link>

          <Link to="/add-todo" className="link">
            Add todo
          </Link>

          <Link to="/about" className="link">
            About
          </Link>
        </div>
      </div>

      <div className="header-sort-container">
        <h3 className="header-sort-text">Sort order</h3>
        <div className="header-sort-btn-container">
          <button
            className="sm-btn"
            onClick={() => sortListFunc(SortType.Timestamp)}
          >
            Timestamp
          </button>
          <button
            className="sm-btn"
            onClick={() => sortListFunc(SortType.Author)}
          >
            Author
          </button>
        </div>
      </div>
      <div className="header-sort-container">
        <label htmlFor="headerSelectId">User:</label>
        <select
          id="headerSelectId"
          className=""
          defaultValue={0}
          onChange={(event) => updateUserFunc(event)}
          ref={usernameRef}
        >
          {users.map((user: IUsername) => (
            <option
              key={user.id}
              defaultValue={user.name}
              defaultChecked={user.name === username ? true : undefined}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
