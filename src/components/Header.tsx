import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { SortType } from "../enums";

interface IHeaderProps {
  removeTodoFunc: () => void;
  sortListFunc: (type: SortType) => void;
  sortType: SortType;
  updateSortType: (sortType: SortType) => void;
}

export function Header({
  removeTodoFunc,
  sortListFunc,
  sortType,
  updateSortType,
}: IHeaderProps): ReactElement {
  return (
    <div className="header">
      <div className="">My todo list</div>

      <div className="navbar">
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
      <div>
        <h3>Sort order</h3>

        <label htmlFor="custom">Custom</label>
        <input
          id="custom"
          type="radio"
          name="sort-type"
          defaultChecked={sortType === SortType.Custom}
          onChange={() => updateSortType(SortType.Custom)}
        />

        <label htmlFor="timestamp">Timestamp</label>
        <input
          id="timestamp"
          type="radio"
          name="sort-type"
          defaultChecked={sortType === SortType.Timestamp}
          onChange={() => updateSortType(SortType.Timestamp)}
        />

        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="radio"
          name="sort-type"
          defaultChecked={sortType === SortType.Author}
          onChange={() => updateSortType(SortType.Author)}
        />

        <button className="sm-btn" onClick={() => sortListFunc(sortType)}>
          Sort
        </button>
      </div>

      <button className="btn" onClick={removeTodoFunc}>
        Remove selected
      </button>
    </div>
  );
}
