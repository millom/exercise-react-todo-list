import { ReactElement, RefObject, useRef, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { SortType } from "../enums";
import { IUsername } from "../interfaces";

interface IHeaderProps {
  removeTodoFunc: () => void;
  sortListFunc: (type: SortType) => void;
  showRemoveButton: boolean;
  // updateUser: (user: IUsername) => void;
  updateUserFunc: (event: ChangeEvent<HTMLSelectElement>) => void;
  users: Array<IUsername>;
  username: string;
  // userName: string;
}

export function Header({
  removeTodoFunc,
  sortListFunc,
  showRemoveButton,
  updateUserFunc,
  users,
  username,
}: IHeaderProps): ReactElement {
  const usernameRef: RefObject<HTMLSelectElement> = useRef(null);

  return (
    <div className="header-container">
      <div className="header-header-navbar-container">
        <h1 className="header-text">My todo list</h1>

        <div className="header-navbar">
          <button
            className={showRemoveButton ? "btn" : "btn hidden"}
            type="button"
            // disabled={showRemoveButton ? undefined : true}
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
          {/* <div className="header-sort-checkbox-container">
            <input
              id="custom"
              type="radio"
              name="sort-type"
              defaultChecked={sortType === SortType.Custom}
              onChange={() => updateSortType(SortType.Custom)}
            />
            <label htmlFor="custom">Custom</label>
          </div>

          <div className="header-sort-checkbox-container">
            <input
              id="timestamp"
              type="radio"
              name="sort-type"
              defaultChecked={sortType === SortType.Timestamp}
              onChange={() => updateSortType(SortType.Timestamp)}
            />
            <label htmlFor="timestamp">Timestamp</label>
          </div>

          <div className="header-sort-checkbox-container">
            <input
              id="author"
              type="radio"
              name="sort-type"
              defaultChecked={sortType === SortType.Author}
              onChange={() => updateSortType(SortType.Author)}
            />
            <label htmlFor="author">Author</label>
          </div> */}
        </div>

        {/* <button className="sm-btn" onClick={() => sortListFunc(sortType)}>
          Sort
        </button> */}
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
              value={user.name}
              selected={user.name === username ? true : undefined}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* <button
        className={showRemoveButton ? "btn" : "btn hidden"}
        type="button"
        // disabled={showRemoveButton ? undefined : true}
        onClick={removeTodoFunc}
      >
        Remove selected
      </button> */}
    </div>
  );
}
