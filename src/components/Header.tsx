import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTodosContext } from "../hooks";

interface IHeaderProps {
  removeTodoFunc: () => void;
}

export function Header({ removeTodoFunc }: IHeaderProps): ReactElement {
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
      <button className="btn" onClick={removeTodoFunc}>
        Remove selected
      </button>
    </div>
  );
}
