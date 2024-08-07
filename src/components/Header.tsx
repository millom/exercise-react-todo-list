import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { SortType } from "../enums";
// import { useTodosContext } from "../hooks";

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
  // let sortType: SortType = SortType.Custom;
  console.log("New Header");
  // const updateSortType = (type: SortType) => {
  //   sortType = type;
  // };

  return (
    <div className="header">
      <div className="">My todo list</div>
      <div className="navbar">
        {/* <a href="/">Home</a>
        <a href="/add-todo">Add</a>
        <a href="/about">About</a> */}
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
          // defaultChecked={(sortType === SortType.Timestamp ? true : undefined)}
          // checked={sortType === SortType.Timestamp}
          defaultChecked={sortType === SortType.Timestamp}
          onChange={() => updateSortType(SortType.Timestamp)}
        />
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="radio"
          name="sort-type"
          // defaultChecked={sortType === SortType.Author}
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
